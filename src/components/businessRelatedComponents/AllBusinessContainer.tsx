import React, { FC } from "react";
import { IBusiness } from "../../@types/business";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import BusinessTamplateComponent from "./BusinessTamplateComponent";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
import SelectFilterBusiness from "../searchFilters/businessRelatedSelect/SelectFilterBusiness";
interface Props {
  businesses: IBusiness[];
  setBusinessLike: (like: boolean, businesses: IBusiness) => void;
}
const AllBusinessContainer: FC<Props> = ({ businesses, setBusinessLike }) => {
  const navigate = useNavigate();
  const {
    currentData: pageBusinessData,
    currentPage,
    numPages,
    goToPage,
  } = usePagination(businesses);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    // setPage(newPage);
    goToPage(newPage);
    window.scrollTo({ top: 0, left: 0 });
    navigate(`/home?page=${newPage}#${encodeURIComponent("all businesses")}`);
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
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Typography variant="h3" sx={{ ml: 4, color: "text.primary" }}>
              all businesses{" "}
            </Typography>
          </Box>
          <Box sx={{ width: 350, zIndex: 3 }}>
            <SelectFilterBusiness data={businesses} />
          </Box>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ pl: 4, pr: 4, pb: 3 }}>
        {pageBusinessData?.length > 0 &&
          pageBusinessData.map((business) => (
            <Grid item md={4} sm={6} xs={12} key={business._id}>
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

export default AllBusinessContainer;
