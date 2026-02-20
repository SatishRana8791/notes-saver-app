// src/features/counter/counterSlice.js

import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

let storedPastes = [];
try {
  const raw = localStorage.getItem("pastes");
  storedPastes = raw ? JSON.parse(raw) : [];
} catch (e) {
  console.warn("Failed to parse pastes from localStorage — resetting.", e);
  localStorage.removeItem("pastes");
  storedPastes = [];
}

const initialState = {
  pastes: storedPastes
};

// const initialState = {
//   pastes: localStorage.getItem("pastes")
//     ? JSON.parse(localStorage.getItem("pastes"))
//     : []
// }

const pasteSlice = createSlice({
  name: "paste",      // slice name (used for action types)
  initialState,         // default state
  reducers: {
    addToPastes: (state,action) => {
      const paste=action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("paste created successfully");
    },

    updateToPastes: (state,action) => {
      const paste=action.payload;
      const index=state.pastes.findIndex((item)=>
        item._id===paste._id )

        if(index>=0){
          state.pastes[index]=paste;
          localStorage.setItem("pastes",JSON.stringify(state.pastes));
          toast.success("paste updated");
        }
    },
    resetAllPastes: (state, action) => {
      state.pastes=[];

      localStorage.removeItem("pastes");
    },
    removefromPastes: (state,action)=>{
      const pasteId=action.payload;

      console.log(pasteId);
      const index=state.pastes.findIndex((item)=>
      item._id===pasteId );
      
      if(index>=0){
        state.pastes.splice(index,1);

        localStorage.setItem("pastes",JSON.stringify(state.pastes));
        toast.success("Paste Successfully deleted");
      }

    },
  },
});

// Export action creators
export const { addToPastes, removefromPastes, resetAllPastes, updateToPastes } = pasteSlice.actions;

// Export reducer (to add to the store)
export default pasteSlice.reducer;
