import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "animate.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import ToastProvider from './providers/ToastProvider/ToastProvider'
import ConfirmProvider from './providers/ConfirmProvider/ConfirmProvider'

ReactDOM.render(
  <GoogleOAuthProvider clientId="837481215975-2aduj9ohb364gnblajir2h9o86dvdaps.apps.googleusercontent.com">
    <BrowserRouter>
      <ConfirmProvider>
        <ToastProvider>
          <App />
        </ToastProvider>
      </ConfirmProvider>
    </BrowserRouter>
  </GoogleOAuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
