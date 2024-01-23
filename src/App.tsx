import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Todos from "./container/Todos";
import Form from "./container/Form";
import { fetchTodos } from "./store/reducers/todoReducer";
import { AppDispatch } from "./store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Todos />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todo/:id" element={<Form />} />
          <Route path="/todo/new" element={<Form />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
