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
import { Iuser } from "../../@types/user";
import LoaderComponent from "./LoaderComponent";
import Header from "../headerRelatedComponent/Header";
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
  // const [user, setUser] = useState<Iuser | null>(null);
  const [done, setDone] = useState(false);
  const login = useAutoLogin();

  useEffect(() => {
    (async () => {
      try {
        const userdata = await login();
        if (userdata != null) {
          if (!userdata.authorized) {
            // ErrorMessage(userdata.err);
            console.log(userdata);
          } else {
            // setUserData(userdata);
            // if ("user" in userdata) setUser(userdata.user);
          }
        }
        //when user data is null means there are no token find in login function so dont show the user nothing
        //when user data is unauthorized toast the error(server error)
        //when user data is neither that means that login was success so dont show the user nothing
      } catch (err) {
        console.log(err);

        // ErrorMessage(err);
        // code to run when the useEffect failed
        //send a tost with the error message
      } finally {
        setDone(true);
        //set done to true which means that he done checking regardless of the result
      }
    })();
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
            <Box sx={{ mt: "7vh" }}>
              <MainComponent>{children}</MainComponent>
            </Box>
          </Box>
        </ScopedCssBaseline>
      </ThemeProvider>
    );
  } else return <LoaderComponent />;
};

export default LayoutComponents;
