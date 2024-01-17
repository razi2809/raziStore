import { useEffect, useState } from "react";
import { IBusiness } from "../../@types/business";
import { motion } from "framer-motion";
import { Box, Grid, Typography } from "@mui/material";
import LoaderComponent from "../../layout/layoutRelatedComponents/LoaderComponent";
import useFetch from "../../hooks/useFetch";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useAppSelector } from "../../REDUX/bigPie";
import AllBusinessContainer from "../../components/businessRelatedComponents/AllBusinessContainer";
import OpenBusinessContainer from "../../components/businessRelatedComponents/OpenBusinessContainer";
import FavoriteBusinessContainer from "../../components/businessRelatedComponents/FavoriteBusinessContainer";
import notify from "../../services/toastService";
// Define the sections that can be displayed on the home page.

const sectionOptions: Section[] = [
  "all businesses",
  "open businesses",
  "favorite businesses",
];
type Section = "all businesses" | "open businesses" | "favorite businesses";

const HomePage = () => {
  const user = useAppSelector((bigpie) => bigpie.authReducer);
  const { data, error, loading } = useFetch("/business");
  const [businesses, setBusinesses] = useState<IBusiness[]>([]);
  const theme = useTheme();
  const location = useLocation();
  const hashValue = decodeURIComponent(location.hash.replace("#", ""));
  const [activeSection, setActiveSection] = useState<Section>(
    sectionOptions.includes(hashValue as Section)
      ? (hashValue as Section)
      : "all businesses"
  );
  useEffect(() => {
    // Check if there's an error after fetching data.
    if (error) {
      //  showing a toast notification to the user.
      notify.error(error.message);
    } else if (data && data.businesses) {
      // If there's no error and data is present, update the businesses state.
      setBusinesses(data.businesses);
    }
  }, [data, error]);
  useEffect(() => {
    // update the active section when the URL hash changes.

    setActiveSection(
      sectionOptions.includes(hashValue as Section)
        ? (hashValue as Section)
        : "all businesses"
    );
  }, [hashValue]);

  const handleTemporarlyBusinessLike = (like: boolean, businessId: string) => {
    // handle temporary likes on businesses, updating the state on the whole data.
    // Check if the user is logged in and if the business object is valid
    if (!user.isLoggedIn || !businessId) {
      return;
    }

    // Create a new array of businesses with the updated likes
    const updatedBusinesses = businesses.map((b) => {
      // Check if the current business is the one being updated
      if (b._id === businessId) {
        // Return a new business object with the updated likes array
        return {
          ...b,
          likes: like
            ? [...b.likes, user.user?._id] // If liking, add the user's ID to the likes array
            : b.likes.filter((id) => id !== user.user?._id), // If unliking, remove the user's ID from the likes array
        };
      }
      // For businesses that are not being updated, return them as they are
      return b;
    });
    // Update the state with the new array of businesses
    setBusinesses(updatedBusinesses);
  };

  if (data) {
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
            const isLoggedIn =
              section === "favorite businesses"
                ? user.isLoggedIn
                  ? true
                  : false
                : true;
            return (
              isLoggedIn && (
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
                      onClick={() => setActiveSection(section)}
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
                      {activeSection === section && (
                        <motion.span
                          style={{
                            position: "absolute",
                            top: 50,
                            height: "2px",
                            width: "100%",
                            backgroundColor:
                              theme.palette.mode === "light"
                                ? "black"
                                : "white",
                          }}
                          layoutId="activeSectionHomePage"
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
                  </Link>
                </Box>
              )
            );
          })}
        </Box>
        <Grid>
          {activeSection === "all businesses" && (
            <AllBusinessContainer
              setBusinessLike={handleTemporarlyBusinessLike}
              businesses={businesses}
            />
          )}
          {activeSection === "open businesses" && (
            <OpenBusinessContainer
              setBusinessLike={handleTemporarlyBusinessLike}
              businesses={businesses}
            />
          )}
          {user.isLoggedIn && activeSection === "favorite businesses" && (
            <FavoriteBusinessContainer
              setBusinessLike={handleTemporarlyBusinessLike}
              businesses={businesses}
            />
          )}
        </Grid>
      </Box>
    );
  }
  if (loading) return <LoaderComponent />;
  if (error) return <div>Error fetching businesses: {error.message}</div>;
  else return null;
};

export default HomePage;
