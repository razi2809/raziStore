import React, { FC } from "react";
import { IBusiness } from "../../@types/business";
import { Grid, Pagination } from "@mui/material";
import BusinessTamplateComponent from "./BusinessTamplateComponent";
import { useNavigate } from "react-router-dom";
import usePagination from "../../hooks/usePagination";
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
      <Grid container spacing={2} sx={{ pl: 8, pr: 8, pb: 3 }}>
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
