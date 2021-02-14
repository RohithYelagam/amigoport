import { createSlice } from '@reduxjs/toolkit';

export const allclubSlice = createSlice({
  name: 'allclubs',

  initialState: {
   allclubs: null,
  },

  reducers: {
    setallclubs: (state,action) => {
      state.allclubs = action.payload;
    },
    closeallclubs:(state)=>{
      state.allclubs = null;
    }
  },

});

//actions
export const { setallclubs,closeallclubs } = allclubSlice.actions;

//setting states
export const selectallclubs = state => state.allClubs.allclubs;

//exporting reducer
export default allclubSlice.reducer;
