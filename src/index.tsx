import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import LayoutComponents from "./layout/layoutRelatedComponents/LayoutComponents";
axios.defaults.baseURL = "http://localhost:8080/";
/* axios.interceptors.request.use((config) => {
  const tokenoOBj = getToken();
  if (tokenoOBj) {
    config.headers["Authorization"] = `Bearer ${tokenoOBj.token}`;
  }
  return config;
}); */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="/raziStore">
    <LayoutComponents>
      <App />
    </LayoutComponents>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
