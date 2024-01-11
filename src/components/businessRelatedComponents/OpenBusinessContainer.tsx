import React, { FC, useCallback, useEffect, useState } from "react";
import { Day, IBusiness } from "../../@types/business";
import { Box, Grid, Pagination, Typography } from "@mui/material";
import BusinessTamplateComponent from "./BusinessTamplateComponent";
import usePagination from "../../hooks/usePagination";
import { useNavigate } from "react-router-dom";
import SelectFilterBusiness from "../searchFilters/businessRelatedSelect/SelectFilterBusiness";
interface Props {
  businesses: IBusiness[];
  setBusinessLike: (like: boolean, businesses: IBusiness) => void;
}

const OpenBusinessContainer: FC<Props> = ({ businesses, setBusinessLike }) => {
  const [openBusinesses, SetOpenBusinesses] = useState<IBusiness[]>([]);
  const {
    currentData: pageBusinessData,
    currentPage,
    numPages,
    goToPage,
  } = usePagination(openBusinesses);
  const navigate = useNavigate();

  const isBusinessOpen = (business: IBusiness): boolean => {
    //get what day is
    const currentDay = new Date().getDay();
    //get what hour is
    const currentHour = new Date().getHours();
    // Map getDay() to IOpeningHours keys
    const days: Day[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today: Day = days[currentDay];
    const openingHoursToday = business.OpeningHours[today];
    // If the business is closed all day
    if (openingHoursToday.close) {
      return false;
    }
    // Convert opening and closing hours to 24-hour format (0 - 23)

    if (!openingHoursToday.opening || !openingHoursToday.closing) return false;
    const openingHour = parseInt(openingHoursToday.opening.split(":")[0]);
    const closingHour = parseInt(openingHoursToday.closing.split(":")[0]);
    // Check if the current time is within the business hours

    if (currentHour >= openingHour && currentHour < closingHour) {
      return true;
    }

    return false;
  };
  useEffect(() => {
    let OpenBusinesses: IBusiness[] = [];
    //  filter open businesses whenever the 'businesses' prop changes

    businesses.forEach((business) => {
      if (isBusinessOpen(business)) OpenBusinesses.push(business);
    });
    // Redirect if no businesses are open after filtering

    if (OpenBusinesses.length === 0) {
      navigate(`/home#${encodeURIComponent("all businesses")}`);
    }

    SetOpenBusinesses(OpenBusinesses);
  }, [businesses]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, newPage: number) => {
    //when he clicks to move a page then navigate to a new one
    //the page state will upate automaticly
    goToPage(newPage);
    window.scrollTo({ top: 0, left: 0 });
    navigate(`/home?page=${newPage}#${encodeURIComponent("open businesses")}`);
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
                open businesses{" "}
              </Typography>
            </Box>
            <Box sx={{ width: 350, zIndex: 3 }}>
              <SelectFilterBusiness data={openBusinesses} />
            </Box>
          </>
        </Grid>
      </Box>
      <Grid container spacing={2} sx={{ pl: 4, pr: 4, pb: 3 }}>
        {pageBusinessData?.length > 0 &&
          pageBusinessData.map((business) => {
            return (
              <Grid item md={4} sm={6} xs={12} key={business._id}>
                <BusinessTamplateComponent
                  setBusinessLike={setBusinessLike}
                  business={business}
                />
              </Grid>
            );
          })}
      </Grid>{" "}
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

export default OpenBusinessContainer;
