import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.js";
import { ProjectContextsProvider } from "./utils/ProjectContexts.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProjectContextsProvider>
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>

      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode></ProjectContextsProvider>
);
