import React from "react";
import App from "./App";
import { Provider } from "react-redux";
import { StoreReducer } from "./reducers/reducer";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import ReactDOM from "react-dom/client";
const store = createStore(StoreReducer, applyMiddleware(thunk, logger));
const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(  
  <Provider store={store}>
    <App />
  </Provider>
)