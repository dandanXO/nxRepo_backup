import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {GetInitServiceResponse} from "../../services/appService/getInitService";


type InitailState = {
  init?: GetInitServiceResponse;
};

const initialState: InitailState = {

}

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateInit: (state: InitailState, action: PayloadAction<GetInitServiceResponse>) => {
      state.init = action.payload;
    }
  }
})