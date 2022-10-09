import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/userSlice'
import pollsReducer from './features/pollsSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    polls: pollsReducer,
  },
});

export default store