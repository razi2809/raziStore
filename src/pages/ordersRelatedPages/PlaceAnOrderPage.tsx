import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../REDUX/bigPie";
import { useNavigate, useParams } from "react-router-dom";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import ReactSelect, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
  OptionProps,
  SingleValue,
} from "react-select";
import { motion } from "framer-motion";
import GoogleMaps2markers from "../../layout/layoutRelatedComponents/maps/GoogleMaps2markers";
import ProductOrderTamplate from "../../components/productRelatedComponents/ProductOrderTamplate";
import { ILocation } from "../../@types/generic";
import GoogleMapToView from "../../layout/layoutRelatedComponents/maps/GoogleMapToView";
import { orderActions } from "../../REDUX/orderSlice";
import { ROUTER } from "../../Router/ROUTER";
import { orderNormalized } from "../../normalizedData/userTypesData/createOrderNormalized";
import sendData from "../../hooks/useSendData";
import { IAddress } from "../../@types/user";
import AddAnAddress from "../../components/addressRelatedComponents/AddAnAddress";
import { AxiosError } from "axios";
import notify from "../../services/toastService";
const PlaceAnOrdePage = () => {
  const pageTheme = useTheme();

  const selectStyles: StylesConfig<{ value: IAddress; label: string }, false> =
    {
      control: (
        base: CSSObjectWithLabel,
        props: ControlProps<{ value: IAddress; label: string }, false>
      ) => ({
        ...base,
        backgroundColor: pageTheme.palette.background.paper,
        color: pageTheme.palette.text.primary,
        borderColor: pageTheme.palette.divider,
        // Add other custom styles or overrides
      }),
      menu: (base: CSSObjectWithLabel) => ({
        ...base,
        backgroundColor: pageTheme.palette.background.paper,
        // Add other custom styles or overrides
      }),
      option: (
        base: CSSObjectWithLabel,
        props: OptionProps<{ value: IAddress; label: string }, false>
      ) => ({
        ...base,
        backgroundColor: props.isFocused
          ? pageTheme.palette.action.hover
          : base.backgroundColor,
        color: props.isFocused ? pageTheme.palette.text.primary : base.color,
        // Add other custom styles or overrides for options
      }),
      // Define other style overrides as needed
    };
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const user = useAppSelector((bigPie) => bigPie.authReducer.user);
  const { BusinessId } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const order = orders.find((o) => o.business?._id === BusinessId);
  const [clientLocation, setClientLocation] = useState<ILocation>(
    user?.address![0]!
  );
  const [addAddress, setAddAddress] = useState(false);
  const options = user?.address.map((address) => ({
    value: address,
    label: address.addressName,
  }));

  const placeAnOrder = async () => {
    if (!order) return;
    const orderToSend = orderNormalized(order);
    try {
      const res = await sendData({
        url: `/order/newOrder/${BusinessId}`,
        data: orderToSend,
        method: "post",
      });
      handleRemoveOrder();
      navigate(`${ROUTER.ORDER}/${res.orderId}`);
      notify.success(res.message);
    } catch (e) {
      console.log(e);

      if (e instanceof AxiosError) {
        notify.error(e.response?.data.message);
      } else {
        notify.error("An unknown error occurred");
      }
    }
  };

  const handleRemoveOrder = () => {
    if (!BusinessId) return;
    dispatch(orderActions.deleteOrder({ BusinessId }));
    navigate(ROUTER.HOME);
  };
  const handleOptionChange = (
    selectedAddress: SingleValue<{
      value: IAddress;
      label: string;
    }>
  ) => {
    if (!selectedAddress?.label) return;
    setClientLocation(selectedAddress?.value);
  };
  if (order) {
    return (
      <Grid
        container
        sx={{
          bgcolor: "divider",
        }}
      >
        <Box sx={{ height: "40vh", width: "100%" }}>
          <Box sx={{ height: "100%", width: "100%", position: "relative" }}>
            <GoogleMaps2markers
              theme={user?.theme!}
              clientLocation={clientLocation}
              businessLocation={order.business?.address}
            />
            <Box
              sx={{
                position: "absolute",
                bgcolor: "divider",
                inset: "0px 0px 33.46%  ",
                // top: 0,
                height: "50%",
                width: "100%",
                // p: 1,
                borderRadius: 3,
                zIndex: 1,
                background: user?.theme
                  ? user.theme === "dark"
                    ? "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))"
                    : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)"
                  : "linear-gradient(rgb(246, 246, 246) 0%, rgba(246, 246, 246, 0) 100%)",
                //
              }}
            ></Box>
          </Box>
        </Box>
        <Grid container sx={{ width: "100%", mt: 2, ml: 0, p: 1 }} spacing={2}>
          <Box sx={{ width: "100%" }}>
            <Typography variant="h3" sx={{ color: "text.primary" }}>
              order summery
            </Typography>
          </Box>{" "}
          <Grid item md={4} sm={6} xs={12}>
            <Box>
              <Box>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  products:
                </Typography>
              </Box>
              <Box sx={{ p: 1 }}>
                {order.products.map((product) => (
                  <ProductOrderTamplate
                    key={product.product._id}
                    productInOrder={product}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
          <Grid item md={4} sm={6} xs={12}>
            <Box>
              <Box>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  where to:{" "}
                </Typography>
                <Box sx={{ p: 1 }}>
                  <GoogleMapToView
                    theme={user?.theme ? user.theme : "light"}
                    address={clientLocation}
                  />
                </Box>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ flexGrow: 1, pr: 1 }}>
                    {options && (
                      <ReactSelect
                        styles={selectStyles}
                        options={options}
                        closeMenuOnSelect={true}
                        onChange={(selectedOption) =>
                          handleOptionChange(selectedOption)
                        }
                      />
                    )}
                  </Box>
                  <Button
                    variant="contained"
                    onClick={() => setAddAddress(true)}
                  >
                    add an address
                  </Button>
                </Box>
              </Box>
            </Box>
          </Grid>{" "}
          <Grid
            item
            md={4}
            sm={6}
            xs={12}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Box>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                order summary:
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
              }}
            >
              <Box sx={{ p: 1 }}>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  product: {order.products.length}
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  venue: {order.business?.businessName}
                </Typography>
                <Typography variant="h5" sx={{ color: "text.primary" }}>
                  price: {order.price}
                </Typography>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Button variant="contained" onClick={placeAnOrder}>
                  place an order
                </Button>
                <Button variant="contained" onClick={handleRemoveOrder}>
                  remove the order
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {addAddress && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            }}
            onClick={() => setAddAddress(false)}
          >
            <AddAnAddress />
          </motion.div>
        )}
      </Grid>
    );
  } else return <LoaderComponent />;
};

export default PlaceAnOrdePage;
