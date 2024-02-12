import { Box, Skeleton, Typography } from "@mui/material";
import { motion } from "framer-motion";

const CategoryDispalyForUserTemplate = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        bgcolor: "secondary.main",
        p: 2,
        position: "sticky",
        top: "4em",
        zIndex: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {Array.from({ length: 3 }, (_, index) => (
          <Box key={index} sx={{ display: "flex" }}>
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
                width={"6em"}
                sx={{
                  p: 1,
                }}
              >
                {<Skeleton sx={{ bgcolor: "divider" }} />}
              </Typography>
              {index === 0 && (
                <motion.span
                  style={{
                    position: "absolute",
                    top: 50,
                    height: "2px",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                  layoutId="activeSectionProfilPage"
                  transition={{
                    type: "spring",
                    stiffness: 380,
                    damping: 30,
                  }}
                >
                  {" "}
                </motion.span>
              )}
            </Box>
          </Box>
        ))}
      </Box>{" "}
    </Box>
  );
};

export default CategoryDispalyForUserTemplate;
