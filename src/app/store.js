import { configureStore,applyMiddleware } from '@reduxjs/toolkit';
import userReducer from '../components/redux/userSlice';
import clubReducer from '../components/redux/clubSlice';
import allclubReducer from "../components/redux/allclubSlice"


export default configureStore({
  reducer: {
    user: userReducer,
    club: clubReducer,
    allClubs: allclubReducer,
  },
  applyMiddleware
});
