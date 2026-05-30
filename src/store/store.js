import { configureStore } from '@reduxjs/toolkit';
import policiesReducer from '../features/itemsSlice';

const store = configureStore({
  reducer: {
    app: policiesReducer,
  },
});

export default store;