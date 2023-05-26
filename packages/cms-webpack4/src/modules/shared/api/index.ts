import axiosBaseQuery from './axiosBaseQuery';
import { createApi } from '@reduxjs/toolkit/query/react';

// const baseUrl = "/api/v2";
const baseUrl = '/hs/admin';

export const API = createApi({
    reducerPath: 'api',
    baseQuery: axiosBaseQuery({ baseUrl }),
    endpoints: () => ({}),
});
