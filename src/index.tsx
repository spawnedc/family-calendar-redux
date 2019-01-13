import { locale as setMomentLocale } from "moment";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";
import App from "./containers/app/App";
import { allReducers } from "./reducers";
import "./styles/index.css";

const store = createStore(allReducers, applyMiddleware(thunk, promise, logger));

const initialise = async () => {
  const locale = window.navigator.language.toLowerCase();
  await import(/* webpackMode: "eager" */ `moment/locale/${locale}`);
  setMomentLocale(locale);

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root"),
  );
};

initialise();
