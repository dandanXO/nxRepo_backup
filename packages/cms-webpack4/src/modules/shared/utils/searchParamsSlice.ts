import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

interface searchParamsState {
    searchParams: any;
    nextPathname?: string;
    pathname?: string;
}

const initialState: searchParamsState = {
    searchParams: {},
    nextPathname: '',
    pathname: '',
};

const searchParamsSlice = createSlice({
    name: 'searchParams',
    initialState,
    reducers: {
        setSearchParams(state, action) {
            state.searchParams = action.payload;
        },
        setPathname(state, action) {
            state.pathname = action.payload.pathname;
            state.nextPathname = action.payload.nextPathname;
        },
    },
});

export const { setSearchParams, setPathname } = searchParamsSlice.actions;
export const selectSearchParams = (state: RootState): any => state.searchParams;
export default searchParamsSlice.reducer;
