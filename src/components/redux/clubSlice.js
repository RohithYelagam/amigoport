import { createSlice } from '@reduxjs/toolkit';

export const clubSlice = createSlice({
  name: 'club',

  initialState: {
   clubs: null,
  },

  reducers: {
    setClubs: (state,action) => {
      state.clubs = action.payload;
    },
    closeClubs:(state)=>{
      state.clubs = null;
    }
  },

});

//actions
export const { setClubs,closeClubs } = clubSlice.actions;

//setting states
export const selectClubs = state => state.club.clubs;

//exporting reducer
export default clubSlice.reducer;
