import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import LayoutComponents from "./layout/layoutRelatedComponents/LayoutComponents";
import { getToken } from "./services/tokenService";
import { Provider } from "react-redux";
import { store } from "./REDUX/bigPie";
axios.defaults.baseURL = "https://razistoreapp.site/";
// axios.defaults.baseURL = "http://localhost:8080/";
axios.interceptors.request.use((config) => {
  const tokenoOBj = getToken();
  if (tokenoOBj.token) {
    config.headers["Authorization"] = `Bearer ${tokenoOBj.token}`;
  }
  return config;
});
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter basename="/raziStore">
      <LayoutComponents>
        <App />
      </LayoutComponents>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
