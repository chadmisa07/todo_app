import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "./store";
import Todos from "./container/Todos";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
    {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todo/:id" element={<Form />} />
          <Route path="/todo/new" element={<Form />} />
        </Routes>
      </BrowserRouter> */}
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
