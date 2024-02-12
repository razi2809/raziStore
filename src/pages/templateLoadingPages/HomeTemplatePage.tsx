import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Pagination,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const sectionOptions: Section[] = [
  "all businesses",
  "open businesses",
  "favorite businesses",
];
type Section = "all businesses" | "open businesses" | "favorite businesses";

const HomeTemplatePage = () => {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 2,
          mb: 4,
          flexWrap: "wrap",
        }}
      >
        {sectionOptions.map((section) => {
          return (
            <Box key={section} sx={{ display: "flex" }}>
              <Link to={`#${section}`} style={{ textDecoration: "none" }}>
                <Box
                  sx={{
                    mr: 2,
                    borderRadius: 20,
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    cursor: "pointer",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.primary",
                      p: 1,
                    }}
                  >
                    {section}
                  </Typography>
                </Box>
              </Link>
            </Box>
          );
        })}
      </Box>
      <Grid>
        <>
          <Box>
            <Grid
              container
              item
              xs={12}
              sx={{ mt: 1, justifyContent: "space-around", mb: 4 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                <Typography variant="h3" sx={{ color: "text.primary" }}>
                  all businesses{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: 350,
                  zIndex: 3,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  {/* <SelectFilterBusiness data={businesses} /> */}
                </Box>
              </Box>
            </Grid>
          </Box>
          <Grid container spacing={2} sx={{ pl: 4, pr: 4, pb: 3 }}>
            {Array.from({ length: 6 }, (_, index) => (
              <Grid item md={4} sm={6} xs={12} key={index}>
                <Card sx={{ bgcolor: "divider" }}>
                  <CardMedia sx={{ height: "200px" }}>
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      sx={{ height: "100%", mb: 1 }}
                    />
                  </CardMedia>
                  <CardContent sx={{ p: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Typography variant="h5" width={"10em"}>
                        <Skeleton />
                      </Typography>
                      <Typography variant="h6" width={"7.5em"}>
                        {" "}
                        <Skeleton />
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Pagination
            sx={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              mt: 1,
            }}
            count={3}
            page={1}
            // onChange={handlePageChange}
          />
        </>
      </Grid>
    </Box>
  );
};

export default HomeTemplatePage;
