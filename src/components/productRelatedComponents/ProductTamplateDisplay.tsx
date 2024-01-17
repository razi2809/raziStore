import React, { FC, useState } from "react";
import { IProduct } from "../../@types/product";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { ROUTER } from "../../Router/ROUTER";
import ClearIcon from "@mui/icons-material/Clear";
import { AxiosError } from "axios";
import CountStateComponents from "../../layout/layoutRelatedComponents/CountStateComponents";
import { orderActions } from "../../REDUX/orderSlice";
import sendData from "../../hooks/useSendData";
import notify from "../../services/toastService";
interface Props {
  product: IProduct;
  category: string | null;
  updateOrder: (product: IProduct, count: number) => void;
  canOrder: boolean;
}

const ProductTamplateDisplay: FC<Props> = ({
  product,
  category,
  updateOrder,
  canOrder,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const [like, setLike] = useState(product.likes.includes(user.user?._id));
  const orderIndex = orders.findIndex(
    (o) => o.business?._id === product.businessId
  );
  const productInOrder = orders[orderIndex]?.products.find(
    (p) => p.product._id === product._id
  );

  const quantity = productInOrder ? productInOrder.quantity : 1;
  const [count, setCount] = useState(quantity);
  const productExists = productInOrder ? true : false;
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
  const handleClick = (e: React.MouseEvent) => {
    if (e.currentTarget === e.target) {
      e.stopPropagation();
    }
  };
  const deleteFromOrder = () => {
    if (product.businessId)
      dispatch(
        orderActions.deleteProduct({ product, businessId: product.businessId })
      );
  };

  return (
    <Card
      sx={{
        height: "65vh",
        width: "30em",
        display: "flex",
        flexDirection: "column",
      }}
      onClick={handleClick}
    >
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          onClick={handleClick}
          sx={{ width: "100%", height: "20em", borderRadius: 1 }}
          component="img"
          image={product.productImage.url}
          alt={product.productImage.alt}
        ></CardMedia>
        <div style={{ position: "absolute", top: 0, right: 0, zIndex: 2 }}>
          {user && user.isLoggedIn && (
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
          )}
          <Tooltip title="share">
            <IconButton onClick={(e) => handleShare(e)}>
              <ShareOutlinedIcon />{" "}
            </IconButton>
          </Tooltip>
        </div>
        <div style={{ position: "absolute", top: 0, left: 0, zIndex: 2 }}>
          <Checkbox
            inputProps={{
              "aria-label": "exit",
            }}
            icon={<ClearIcon />}
            checkedIcon={<ClearIcon />}
          />{" "}
        </div>
      </Box>
      <CardContent
        sx={{
          bgcolor: "secondary.main",
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
        onClick={handleClick}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4" sx={{ textAlign: "start", mb: 1 }}>
            {product.productName}
          </Typography>
          {product.productQuantity <= 4 && (
            <Typography variant="h6" sx={{ textAlign: "start", mb: 3 }}>
              hurry we have in stock: {product.productQuantity}
            </Typography>
          )}
          <Typography variant="h5" sx={{ textAlign: "start", b: 3 }}>
            {product.description}
          </Typography>
        </Box>{" "}
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            mt: 3,
          }}
        >
          {!productExists && user.isLoggedIn && canOrder && (
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                textTransform: "none",
                fontSize: 16,
                flexGrow: 1,
                mr: 2,
                display: "flex",
              }}
              onClick={() => updateOrder(product, count)}
            >
              <Box sx={{ flexGrow: 1 }}>Add to Cart</Box>
            </Button>
          )}
          {productExists && user.isLoggedIn && canOrder && (
            <Box sx={{ display: "flex" }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textTransform: "none",
                  fontSize: 16,
                  mr: 2,
                  flexGrow: 1,
                  display: "flex",
                }}
                onClick={() => updateOrder(product, count)}
              >
                <Box sx={{ flexGrow: 1 }}>update Cart</Box>
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  textTransform: "none",
                  fontSize: 16,
                  mr: 2,
                  display: "flex",
                }}
                onClick={() => deleteFromOrder()}
              >
                <Box>delete item from Cart</Box>
              </Button>
            </Box>
          )}
          {user.isLoggedIn && canOrder && (
            <Box
              sx={{
                boxShadow:
                  " 0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                bgcolor: "primary.main",
                borderRadius: 1,
                display: "flex",
                alignItems: "center",
              }}
            >
              <CountStateComponents
                count={count}
                setCount={setCount}
                quantity={product.productQuantity}
              />
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductTamplateDisplay;
