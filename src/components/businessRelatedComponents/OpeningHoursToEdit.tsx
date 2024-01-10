import {
  Box,
  Button,
  Checkbox,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useState } from "react";
import { IOpeningHours } from "../../@types/business";
import ReactSelect, {
  StylesConfig,
  ControlProps,
  CSSObjectWithLabel,
  OptionProps,
} from "react-select";
// Predefined options for time selection

const options = [
  { value: "00:00", label: "00:00" },
  { value: "01:00", label: "01:00" },
  { value: "02:00", label: "02:00" },
  { value: "03:00", label: "03:00" },
  { value: "04:00", label: "04:00" },
  { value: "05:00", label: "05:00" },
  { value: "06:00", label: "06:00" },
  { value: "07:00", label: "07:00" },
  { value: "08:00", label: "08:00" },
  { value: "10:00", label: "10:00" },
  { value: "11:00", label: "11:00" },
  { value: "12:00", label: "12:00" },
  { value: "13:00", label: "13:00" },
  { value: "14:00", label: "14:00" },
  { value: "15:00", label: "15:00" },
  { value: "16:00", label: "16:00" },
  { value: "17:00", label: "17:00" },
  { value: "18:00", label: "18:00" },
  { value: "19:00", label: "19:00" },
  { value: "20:00", label: "20:00" },
  { value: "21:00", label: "21:00" },
  { value: "22:00", label: "22:00" },
  { value: "23:00", label: "23:00" },
]; // Type definition for dropdown option

type OptionType = { label: string; value: string } | null;
// Array representing days of the week

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
interface Props {
  getTimes: (openingHours: IOpeningHours) => void;
}
const OpeningHoursToEdit: FC<Props> = ({ getTimes }) => {
  const theme = useTheme();
  const selectStyles: StylesConfig<{ value: string; label: string }, false> = {
    control: (
      base: CSSObjectWithLabel,
      props: ControlProps<{ value: string; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: theme.palette.background.paper,
      color: theme.palette.text.primary,
      borderColor: theme.palette.divider,
      // Add other custom styles or overrides
    }),
    menu: (base: CSSObjectWithLabel) => ({
      ...base,
      backgroundColor: theme.palette.background.paper,
      // Add other custom styles or overrides
    }),
    option: (
      base: CSSObjectWithLabel,
      props: OptionProps<{ value: string; label: string }, false>
    ) => ({
      ...base,
      backgroundColor: props.isFocused
        ? theme.palette.action.hover
        : base.backgroundColor,
      color: props.isFocused ? theme.palette.text.primary : base.color,
      // Add other custom styles or overrides for options
    }),
    // Define other style overrides as needed
  };
  const [openingHours, SetOpeningHours] = useState<IOpeningHours>({
    Sunday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Monday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Tuesday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Wednesday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Thursday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Friday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
    Saturday: {
      opening: "00:00",
      closing: "00:00",
      close: false,
    },
  });

  const setTimes = () => {
    // pass the openingHours state back to the parent component

    getTimes(openingHours);
  };
  const handleOptionChange = (selectedOption: OptionType, id: string) => {
    // handle time selection change

    if (selectedOption) {
      const [day, field] = id.split(".");
      SetOpeningHours((currentState) => ({
        ...currentState,
        [day as keyof typeof currentState]: {
          ...currentState[day as keyof typeof currentState],
          [field]: selectedOption.value,
        },
      }));
    }
  };
  const handleCloseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // handle change in 'close' checkbox

    SetOpeningHours((currentState) => ({
      ...currentState,
      [e.target.id]: { close: e.target.checked },
    }));
  };

  return (
    <Grid sx={{ bgcolor: "divider", maxHeight: "700px", overflowY: "auto" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Box onClick={(e) => e.stopPropagation()}>
          <Typography variant="h6" color="secondary.main">
            opening hours
          </Typography>
        </Box>
        {days.map((day) => (
          <Box
            onClick={(e) => e.stopPropagation()}
            key={day}
            sx={{
              display: {
                md: "flex",
                sm: "flex",
                xs: "block",
              },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              color="text.primary"
              sx={{
                height: "100%",
                width: 100,
                display: "flex",
                alignItems: "center",
              }}
            >
              {day}:
            </Typography>
            <Box sx={{ display: "flex", p: 1, pb: 0, pt: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  mr: 1,
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  close?
                </Typography>

                <Checkbox
                  // sx={{ p: 0 }}
                  id={`${day}-close`}
                  onChange={(e) => handleCloseChange(e)}
                />
              </Box>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ display: "flex", justifyContent: "center" }}
                >
                  opening?
                </Typography>
                <ReactSelect
                  id={`${day}.opening`}
                  options={options}
                  aria-label={`Opening time for ${day}`}
                  maxMenuHeight={200}
                  styles={{
                    ...selectStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                  isDisabled={openingHours[day as keyof IOpeningHours].close}
                  onChange={(selectedOption) =>
                    handleOptionChange(selectedOption, `${day}.opening`)
                  }
                />
              </Box>
              <Box
                sx={{
                  ml: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body2"
                  color="text.primary"
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  closeing?
                </Typography>

                <ReactSelect
                  id={`${day}.closing`}
                  options={options}
                  maxMenuHeight={200}
                  aria-label={`closing time for ${day}`}
                  styles={{
                    ...selectStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  }}
                  menuPortalTarget={document.body}
                  isDisabled={openingHours[day as keyof IOpeningHours].close}
                  onChange={(selectedOption) =>
                    handleOptionChange(selectedOption, `${day}.closing`)
                  }
                />
              </Box>
            </Box>
          </Box>
        ))}
        <Button variant="contained" onClick={setTimes}>
          add times to business
        </Button>
      </Box>
    </Grid>
  );
};

export default OpeningHoursToEdit;
