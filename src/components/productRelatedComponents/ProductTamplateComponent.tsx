import React, { FC, memo, useState } from "react";
import { IProduct } from "../../@types/product";
import {
  Box,
  Card,
  CardMedia,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { ISelected } from "../../pages/businessRelatedPages/BusinessPage";
import { AxiosError } from "axios";
import { useAppSelector } from "../../REDUX/bigPie";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ROUTER } from "../../Router/ROUTER";
import sendData from "../../hooks/useSendData";
import notify from "../../services/toastService";
import { useNavigate } from "react-router-dom";
interface Props {
  product: IProduct;
  setSelectedProduct: React.Dispatch<
    React.SetStateAction<ISelected | null>
  > | null;
  category: string | null;
}
const ProductTamplateComponent: FC<Props> = ({
  product,
  setSelectedProduct,
  category,
}) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [like, setLike] = useState(product.likes.includes(user.user?._id));
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  const handleProductLike = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    try {
      const res = await sendData({
        url: `/product/${product._id}`,
        method: "patch",
      });
      setLike(!like);
      setProductLike(!like, product._id);
      notify.success(res.message);
    } catch (e) {
      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
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
        url: `https://razi2809.github.io/raziStore${ROUTER.BUSINESS}/${product.businessId}?item=${product._id}&category=${category}`,
      });
    } else {
      notify.error("Web Share API is not supported in your browser");
    }
  };
  const handleEdit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`${ROUTER.PRODUCT}/${product._id}`);
  };
  const isProductAvailable = product.productQuantity !== 0;
  const handleProductSelection = () => {
    if (isProductAvailable && setSelectedProduct) {
      setSelectedProduct({ productId: product._id, category });
    }
  };
  return (
    <Card
      sx={{
        p: 2,
        width: "100%",
        height: "11em",
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
      onClick={handleProductSelection}
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
          <>
            <Tooltip title="like">
              <Checkbox
                inputProps={{
                  "aria-label": "like",
                }}
                checked={like}
                onClick={(e) => handleProductLike(e)}
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            </Tooltip>
            {user.user?.isBusiness && (
              <Tooltip title="edit">
                <IconButton onClick={(e) => handleEdit(e)}>
                  <EditIcon />{" "}
                </IconButton>
              </Tooltip>
            )}
          </>
        )}
        <Tooltip title="share">
          <IconButton onClick={(e) => handleShare(e)}>
            <ShareOutlinedIcon />{" "}
          </IconButton>
        </Tooltip>
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
