import React, { Dispatch, FC, SetStateAction, memo, useState } from "react";
import { IProduct } from "../../@types/product";
import { Box, Card, CardMedia, Checkbox, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { ISelected } from "../../pages/businessRelatedPages/BusinessPage";
import axios from "axios";
import { useAppSelector } from "../../REDUX/bigPie";
import ShareIcon from "@mui/icons-material/Share";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ROUTER } from "../../Router/ROUTER";
import sendData from "../../hooks/useSendData";
interface Props {
  product: IProduct;
  setSelectedProduct: React.Dispatch<React.SetStateAction<ISelected | null>>;
  category: string;
  // setProductLike: (like: boolean, productId: string) => void;
}
const ProductTamplateComponent: FC<Props> = ({
  product,
  setSelectedProduct,
  category,
}) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [like, setLike] = useState(product.likes.includes(user.user?._id));
  const [hover, setHover] = useState(false);

  const handleProductLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      setLike(!like);
      await sendData({ url: `/product/${product._id}`, method: "patch" });
      setProductLike(!like, product._id);
    } catch (e) {
      console.log(e);
    }
  };
  const setProductLike = (like: boolean, productId: string) => {
    if (!user.isLoggedIn) {
      return;
    }
    if (!productId) {
      return;
    }

    if (!like) {
      product.likes = product.likes.filter((id) => id !== user.user?._id);
      return;
    }
    product.likes.push(user.user?._id);
  };
  const handleShare = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();

    if (navigator.share) {
      navigator.share({
        title: `${product.productName}`,
        text: "Check out my awesome business",
        url: ` https://raziStore${ROUTER.BUSINESS}/${product.businessId}?item=${product._id}&category=${category}.com`,
      });
    } else {
      console.log("Web Share API is not supported in your browser");
    }
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <Card
      sx={{
        p: 2,
        width: "100%",
        height: "10em",
        position: "relative",
        cursor: "pointer",
        transition: "transform 0.5s ease",
        boxShadow:
          " rgba(0, 0, 0, 0.06) 0px 0px 0.125rem 0px, rgba(0, 0, 0, 0.12) 0px 0.125rem 0.125rem 0px",
        transform: hover ? "scale(1.02)" : "",
        bgcolor: "secondary.main",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() =>
        product.productQuantity !== 0
          ? setSelectedProduct({ productId: product._id, category: category })
          : null
      }
    >
      <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            flexGrow: 1,
            justifyContent: "space-between",
            mt: 2,
            width: "100%",
          }}
        >
          <Typography variant="body1" sx={{ fontWeight: 900 }}>
            {product.productName}
          </Typography>
          <Typography variant="body1" sx={{ width: "100%" }}>
            {product.description}
          </Typography>
          {!product.onSale && (
            <Typography variant="body1">{product.price}</Typography>
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
          }}
        >
          <CardMedia
            sx={{ borderRadius: 1 }}
            component="img"
            image={product.productImage.url}
            alt={product.productImage.alt}
          ></CardMedia>{" "}
        </Box>
      </Box>
      <div style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
        {user && user.isLoggedIn && (
          <Checkbox
            {...label}
            checked={like}
            onClick={(e) => handleProductLike(e)}
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite />}
          />
        )}
        <Checkbox
          {...label}
          onClick={(e) => handleShare(e)}
          icon={<ShareIcon />}
          checkedIcon={<ShareIcon />}
        />{" "}
      </div>
      {product.productQuantity === 0 && (
        <span
          style={{
            backgroundColor: "rgba(128, 128, 128, 0.5)",
            position: "absolute",
            display: "flex",
            inset: 0,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ color: "#D3D3D3", textAlign: "center" }}
          >
            out of stock
          </Typography>
        </span>
      )}
    </Card>
  );
};

export default memo(ProductTamplateComponent);
