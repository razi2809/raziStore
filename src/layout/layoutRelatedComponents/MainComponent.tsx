import { Box } from "@mui/material";
import { FC, ReactNode } from "react";
import { useAppSelector } from "../../REDUX/bigPie";
import { useLocation } from "react-router-dom";
import OrderBottomComponent from "../../components/orderRelatedComponents/OrderBottomComponent";
interface Prop {
  children: ReactNode;
}
const MainComponent: FC<Prop> = ({ children }) => {
  const orders = useAppSelector((bigPie) => bigPie.orderReducer);
  const { pathname } = useLocation();

  return (
    <Box>
      {children}{" "}
      {orders[1]?.products.length > 0 &&
        !pathname.includes("/order/neworder") && (
          <Box
            sx={{
              position: "sticky",
              justifyContent: "center",
              zIndex: 90,
              display: { xs: "none", sm: "flex", md: "flex", xl: "none" },
              width: "100%",
              bottom: 20,
            }}
          >
            <OrderBottomComponent />{" "}
          </Box>
        )}
    </Box>
  );
};

export default MainComponent;
