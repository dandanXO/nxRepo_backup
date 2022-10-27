import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../core/store";

interface searchParamsState {
    searchParams: any;
    previousPathname?: string;
    pathname?: string;
}

const initialState: searchParamsState = {
    searchParams: {},
    previousPathname: "",
    pathname: "",
}

const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState,
    reducers: {
        setSearchParams(state, action) {
            state.searchParams = action.payload;
        },
        setPathname(state, action) {
            state.pathname = action.payload.pathname;
            state.previousPathname = action.payload.previousPathname;
        }
    }
})

export const { setSearchParams ,setPathname} = searchParamsSlice.actions;
export const selectSearchParams = (state: RootState) => state.searchParams;
export default searchParamsSlice.reducer
