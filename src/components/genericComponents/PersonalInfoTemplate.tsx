import { Box, Button, Grid, Skeleton, Typography } from "@mui/material";

const PersonalInfoTemplate = () => {
  return (
    <Grid>
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: {
              md: "flex",
              sm: "flex",
              xs: "block",
            },
            p: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mr: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <Skeleton
                animation="wave"
                variant="circular"
                sx={{ bgcolor: "divider", zIndex: 1 }}
                width={75}
                height={75}
              />

              <Box
                sx={{
                  position: "absolute",
                  width: "115%",
                  height: "115%",
                  borderRadius: 50,
                  bgcolor: "white",
                  zIndex: 0,
                }}
              ></Box>
            </Box>{" "}
            <Button variant="contained" sx={{ mt: 2 }} component="span">
              edit
            </Button>
          </Box>
          <Box
            sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{ color: "text.primary", textAlign: "start" }}
              >
                <Skeleton />
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <Box sx={{ mr: 2 }}>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  mail
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  <Skeleton />
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  phone
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: "text.primary", textAlign: "start" }}
                >
                  <Skeleton />
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};

export default PersonalInfoTemplate;
