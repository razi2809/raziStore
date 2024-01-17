import React, { FC, useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  PaletteMode,
  ScopedCssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import MainComponent from "./MainComponent";
import useAutoLogin from "../../hooks/useAutoLogin";
import { useAppSelector } from "../../REDUX/bigPie";
import LoaderComponent from "./LoaderComponent";
import Header from "../headerRelatedComponent/Header";
import notify from "../../services/toastService";
type Props = {
  children: React.ReactNode;
};

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#ffffff", // white
          },
          secondary: {
            main: "#add8e6", // light blue
          },
          background: {
            default: grey[200],
            paper: "#ffffff", // white
          },
          divider: grey[200],
          text: {
            primary: "#000000",
            secondary: grey[800],
            active: grey[400],
          },
        }
      : {
          primary: {
            main: "#000000", // black
          },
          secondary: {
            main: "#d8bfd8", // light purple
          },
          background: {
            default: "#212123", // black
            paper: "#000000", // black
          },
          divider: "#212123",
          text: {
            primary: "#ffffff",
            secondary: grey[500],
            hover: "white",
          },
        }),
  },
});
const darkModeTheme = createTheme(getDesignTokens("dark"));
const lightModeTheme = createTheme(getDesignTokens("light"));

const LayoutComponents: FC<Props> = ({ children }) => {
  const user = useAppSelector((bigPie) => bigPie.authReducer);
  const [done, setDone] = useState(false);
  const login = useAutoLogin();

  useEffect(() => {
    const userLogin = async () => {
      try {
        const userdata = await login();
        if (!userdata) {
          //when user data is null means there are no token find in login function so dont show the user nothing
          return;
        }
        if ("err" in userdata) {
          if (userdata.err !== undefined) notify.error(userdata.err);
          return;
        }
        // Success case
        const welcomeMessage = userdata.local
          ? `welcome back ${userdata.user.name.firstName}`
          : `welcome ${userdata.user.name.firstName}`;
        notify.success(welcomeMessage);
      } catch (err) {
        notify.error("an error has occurred");
      } finally {
        setDone(true);
        //set done to true which means that he done checking regardless of the result
      }
    };
    userLogin();
  }, []);
  if (done) {
    return (
      <ThemeProvider
        theme={
          user
            ? user.user?.theme
              ? user.user.theme === "light"
                ? lightModeTheme
                : darkModeTheme
              : lightModeTheme
            : lightModeTheme
        }
      >
        {" "}
        <CssBaseline enableColorScheme />
        <ScopedCssBaseline enableColorScheme>
          <Box
            sx={{
              position: "relative",
              bgcolor: "divider",
            }}
          >
            <Box sx={{ zIndex: 99, position: "absolute" }}>
              <Header />
            </Box>
            <Box sx={{ mt: "4em" }}>
              <MainComponent>{children}</MainComponent>
            </Box>
          </Box>
        </ScopedCssBaseline>
      </ThemeProvider>
    );
  } else return <LoaderComponent />;
};

export default LayoutComponents;
