import { configureStore } from '@reduxjs/toolkit'
import pasteReducer from './pasteslice.js'

export const store = configureStore({
  reducer: {
    paste:pasteReducer,
  },
});