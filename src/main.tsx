import React from "react";

import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./redux/store";
import "./styles/globle.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
