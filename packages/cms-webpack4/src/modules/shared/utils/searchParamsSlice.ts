import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface searchParamsState {
    searchParams: any;
    previousPathname?: string;
    pathname?: string;
    selectedRow?: []
}

const initialState: searchParamsState = {
    searchParams: {},
    previousPathname: "",
    pathname: "",
    selectedRow: []
};

const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState,
    reducers: {
        setSearchParams(state, action) {
            state.searchParams = action.payload;
        },
        setSelectedRow(state, action) {
            state.selectedRow = action.payload;
        },
        setPathname(state, action) {
            state.pathname = action.payload.pathname;
            state.previousPathname = action.payload.previousPathname;
        }
    }
});

export const { setSearchParams ,setPathname,setSelectedRow } = searchParamsSlice.actions;
export const selectSearchParams = (state: RootState): any => state.searchParams;
export default searchParamsSlice.reducer;
