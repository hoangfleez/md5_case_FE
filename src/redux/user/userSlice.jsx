import {createSlice} from "@reduxjs/toolkit";
import { login } from "../../sevives/useService";


const initialState = {
  curreentUser: JSON.parse(localStorage.getItem('user'))
}

const userSlice = createSlice({
  name:'user',
  initialState,
  extraReducers : builder =>{
    builder.addCase(login.fulfilled, (state, action)=>{
      state.curreentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload))
    })
  }
})

export default userSlice.reducer;