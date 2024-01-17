import React, { FC, useEffect, useState } from "react";
import { IBusiness } from "../../@types/business";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import BusinessTamplateComponent from "./BusinessTemplateComponent";
import { useAppSelector } from "../../REDUX/bigPie";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import SelectFilterBusiness from "../searchFilters/businessRelatedSelect/SelectFilterBusiness";
import notify from "../../services/toastService";
import { ROUTER } from "../../Router/ROUTER";
interface Props {
  businesses: IBusiness[];
  setBusinessLike: (like: boolean, businessId: string) => void;
}

const FavoriteBusinessContainer: FC<Props> = ({
  businesses,
  setBusinessLike,
}) => {
  const user = useAppSelector((bigpie) => bigpie.authReducer);
  const navigate = useNavigate();
  const [likedBusinesses, setLikedBusinesses] = useState<IBusiness[]>([]);
  const {
    currentData: pageBusinessData,
    currentPage,
    numPages,
    goToPage,
  } = usePagination(likedBusinesses);

  useEffect(() => {
    // filter liked businesses whenever the 'businesses' prop changes

    if (businesses.length === 0) return;
    const LikedBusiness = businesses.filter((business) =>
      business.likes.includes(user.user?._id)
    );
    // Redirect if no businesses are liked after filtering

    if (LikedBusiness.length === 0) {
      navigate(`${ROUTER.HOME}#${encodeURIComponent("all businesses")}`);
      notify.warning("you have no favorite places");
    }
    setLikedBusinesses(LikedBusiness);
  }, [businesses, navigate, user.user?._id]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    // setPage(newPage);
    goToPage(newPage);
    window.scrollTo({ top: 0, left: 0 });
    navigate(
      `${ROUTER.HOME}?page=${newPage}#${encodeURIComponent(
        "favorite businesses"
      )}`
    );
  };

  return (
    <>
      <Box>
        <Grid
          container
          item
          xs={12}
          sx={{ mt: 1, justifyContent: "space-around", mb: 4 }}
        >
          <>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography variant="h3" sx={{ ml: 4, color: "text.primary" }}>
                favorite businesses{" "}
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
                <SelectFilterBusiness data={likedBusinesses} />
              </Box>
            </Box>
          </>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ pl: 4, pr: 4, pb: 3 }}>
        {pageBusinessData?.length > 0 &&
          pageBusinessData.map((business) => (
            <Grid
              item
              md={4}
              sm={6}
              xs={12}
              key={business._id}
              // sx={{ height: "100%" }}
            >
              <BusinessTamplateComponent
                setBusinessLike={setBusinessLike}
                business={business}
              />
            </Grid>
          ))}
      </Grid>
      {numPages > 1 && (
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            mt: 1,
          }}
          count={numPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </>
  );
};

export default FavoriteBusinessContainer;
