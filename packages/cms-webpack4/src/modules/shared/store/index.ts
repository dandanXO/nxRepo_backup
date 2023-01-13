import {configureStore, createAction, createListenerMiddleware} from "@reduxjs/toolkit";
import { API } from "../../../api";
import searchParamsSlice from "../utils/searchParamsSlice";
// import {GetChannelListResponse} from "../api/types/getChannelList";
// import {FallbackAddListenerOptions} from "@reduxjs/toolkit/dist/listenerMiddleware/types";
//
// const orderDistributeTodaySearch = createAction("OrderDistributeToday/search");
//
// const listenerMiddleware = createListenerMiddleware();
//
// const OrderDistributeTodayAPI = API.injectEndpoints({
//     overrideExisting: false,
//     endpoints: (builder) => ({
//         // NOTE: GET /hs/admin/channel/drop-menu 渠道列表下拉選單
//         getChannelList: builder.query<CollectDistributionSummaryResponseCollectDistributionSummaryResponse, null>({
//             query: () => ({
//                 url: `/collect-today/distribution/summary`,
//                 // url: `/channel/drop-menu`,
//                 params: {},
//                 method: "get",
//             }),
//         }),
//     })
// })


// getTodayOrderDistributeSummaryListener
// listenerMiddleware.startListening({
//     actionCreator: orderDistributeTodaySearch,
//     effect: async (action, api) => {
//         // Can cancel other running instances
//         api.cancelActiveListeners()
//         // const {data} = await api.dispatch(OrderDistributeTodayAPI.endpoints.getChannelList.initiate(null));
//         const {data} = await api.dispatch(OrderDistributeTodayAPI.endpoints.getChannelList.initiate(null));
//         console.log("data", data);
//     }
// });


export const appStore = configureStore({
    reducer: {
        [API.reducerPath]: API.reducer,
        searchParams: searchParamsSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware()
            .concat(API.middleware)
            // .prepend(listenerMiddleware.middleware),
});
export type RootState = ReturnType<typeof appStore.getState>;

// appStore.dispatch(orderDistributeTodaySearch);
