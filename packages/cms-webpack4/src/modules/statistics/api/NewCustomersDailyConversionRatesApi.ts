import { API } from "../../shared/api";
import { GetNewCustomersDailyConversionRatesRequestQuerystring, GetNewCustomersDailyConversionRatesProps } from "./types/NewCustomersDailyConversionRatesTypes/getNewCustomersDailyConversionRates";
import { PostNewCustomersDailyConversionRatesDownloadRequestBody } from './types/NewCustomersDailyConversionRatesTypes/postNewCustomersDailyConversionRatesDownload';
const NewCustomersDailyConversionRatesApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET ​/hs/admin/statistics/day-register-page 新客日统计转化率
        getNewCustomersDailyConversionRates: builder.query<GetNewCustomersDailyConversionRatesProps, GetNewCustomersDailyConversionRatesRequestQuerystring>({
            query: (requestBody: GetNewCustomersDailyConversionRatesRequestQuerystring) => ({
                url: `/statistics/day-register-page`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/statistics/dayRegisterStatisticDownLoad 新客日统计转化率导出
        postNewCustomersDailyConversionRatesDownload: builder.mutation<Blob, PostNewCustomersDailyConversionRatesDownloadRequestBody>({
            query: (requestBody: PostNewCustomersDailyConversionRatesDownloadRequestBody) => ({
                url: `/statistics/dayRegisterStatisticDownLoad`,
                method: "post",
                data: requestBody,
                responseHandler: ((response) => response.blob())
                // responseType: 'blob',
            }),
        }),
    })
});
export const {
    useLazyGetNewCustomersDailyConversionRatesQuery,
    usePostNewCustomersDailyConversionRatesDownloadMutation
} = NewCustomersDailyConversionRatesApi;
