import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const TodoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action) => {
      state.todos.push({
        id: new Date().toISOString(), // Using ISO string as ID
        completed: false,
        text: action.payload
      });
    },
    remove: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id != action.payload)
    },
    edit: (state, action) => {
      const {id, text} = action.payload;
      const todoIndex = state.todos.findIndex((todo) => todo.id === id);
      if(todoIndex != -1){
        // state.todos[todoIndex].text = text;
        /// to push edit todo to top of the list
        const [updateTodo] = state.todos.splice(todoIndex, 1);  //Purpose: Remove the todo from the array and store it in updatedTodo.
        updateTodo.text = text;
        state.todos.unshift(updateTodo);
      }
    },
    toggleCompleted : (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if(todo){
        todo.completed = !todo.completed;
      }
    }
  }
});

export const { add , remove, edit, toggleCompleted} = TodoSlice.actions;
export default TodoSlice.reducer;
