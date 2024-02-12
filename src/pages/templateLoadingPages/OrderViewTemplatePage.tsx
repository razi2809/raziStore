import { Box, Grid, Skeleton, Typography } from "@mui/material";
import ProductOrderTamplate from "../../components/productRelatedComponents/ProductOrderTamplate";

const OrderViewTemplatePage = () => {
  return (
    <Grid>
      <Box
        sx={{
          height: "40vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          position: "relative",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            height: "80%",
            ml: 10,
            display: "flex",
            alignItems: "flex-end",
          }}
        >
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            order from: {<Skeleton />}
          </Typography>
        </Box>{" "}
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
              {Array.from({ length: 3 }, (_, index) => (
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  key={index}
                  sx={{ height: "4em", mb: 1 }}
                />
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Box>
            <Box>
              <Typography
                variant="h5"
                sx={{ color: "text.primary", textAlign: "center" }}
              >
                address of the order: {<Skeleton />}
              </Typography>
              <Box sx={{ p: 1 }}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  sx={{ width: "100%", height: "12em" }}
                ></Skeleton>
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
                product: {<Skeleton />}
              </Typography>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                venue: {<Skeleton />}
              </Typography>
              <Typography variant="h5" sx={{ color: "text.primary" }}>
                price: {<Skeleton />}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderViewTemplatePage;
