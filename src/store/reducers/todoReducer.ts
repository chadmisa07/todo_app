import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk("fetch", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = response.json();
  return data;
});

export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface TodoState {
  data: Todo[];
}

const initialState: TodoState = {
  data: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    create: (state, action) => {
      state.data.push({
        ...action.payload,
        completed: false,
        id: state.data.length + 1,
      });
    },
    update: (state, action) => {
      const data = state.data.find((todo) => todo.id === action.payload.id);
      const index = state.data.findIndex(
        (todo) => todo.id === action.payload.id
      );
      state.data[index] = { ...data, ...action.payload };
    },
    remove: (state, action) => {
      const data = [...state.data];
      const index = data.findIndex((todo) => todo.id === action.payload);
      data.splice(index, 1);
      state.data = data;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.data = action.payload;
    });
  },
});

export const { create, update, remove } = todoSlice.actions;

export default todoSlice.reducer;
