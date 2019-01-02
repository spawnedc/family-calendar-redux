import { locale as setMomentLocale } from "moment";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

const initialise = async () => {
  const locale = window.navigator.language.toLowerCase();
  await import(/* webpackMode: "eager" */ `moment/locale/${locale}`);
  setMomentLocale(locale);

  ReactDOM.render(<App />, document.getElementById("root"));
};

initialise();
