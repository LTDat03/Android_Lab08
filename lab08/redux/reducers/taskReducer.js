import { createSlice } from '@reduxjs/toolkit';

const initialState  = [
    { id: '1', title: 'To check email' },
    { id: '2', title: 'UI task web page' },
    { id: '3', title: 'Learn JavaScript basic' },
    { id: '4', title: 'Learn HTML Advance' },
    { id: '5', title: 'Medical App UI' },
    { id: '6', title: 'Learn Java' },
  ];  

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers:{
    addTask: (state, action) => {
      state.push(action.payload);
    },
    removeTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    editTask: (state, action) => {
      const {id, title} = action.payload;
      const task = state.find((task) => task.id === id);
      if(task){
        task.title = title;
      }
    }
  },
});

export const { addTask, removeTask, editTask} = taskSlice.actions;

export default taskSlice.reducer;