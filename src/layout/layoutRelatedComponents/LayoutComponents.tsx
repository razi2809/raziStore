import React, { FC, useEffect, useState } from "react";
import LoaderComponent from "./LoaderComponent";
import { PaletteMode, ThemeProvider, createTheme } from "@mui/material";
import {
  amber,
  blue,
  deepOrange,
  grey,
  lime,
  purple,
} from "@mui/material/colors";
import MainComponent from "./MainComponent";
type Props = {
  children: React.ReactNode;
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: blue[400],
          },
          userChat: {
            active: "#dce1f9",
            noActive: "white",
            hover: "#434343",
          },
          message: {
            iDidntSend: "#e8e8e8",
            iSendIt: "#cfd6f7",
          },

          divider: amber[200],
          text: {
            primary: grey[900],
            secondary: grey[800],
          },
        }
      : {
          primary: {
            main: blue[900],
          },
          divider: "#212123",
          userChat: {
            active: "#20284d",
            noActive: grey[200],
            hover: "#434343",
          },
          message: {
            iDidntSend: "#434343",

            iSendIt: "#20284d",
          },
          background: {
            default: deepOrange[900],
            paper: deepOrange[900],
          },
          text: {
            primary: "#nnnnnn",
            secondary: grey[500],
            hover: "white",
          },
        }),
  },
});
const darkModeTheme = createTheme(getDesignTokens("dark"));
const lightModeTheme = createTheme(getDesignTokens("light"));

const LayoutComponents: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider
      theme={lightModeTheme}
      // theme={theme.theme == "light" ? lightModeTheme : darkModeTheme}
    >
      {/* <Header done={isDone} /> */}
      <MainComponent>{children}</MainComponent>
    </ThemeProvider>
  );
  //   } else return <LoaderComponent />;
};

export default LayoutComponents;
