import { API } from "../../shared/api";
import { GetPayReceiptListRequestQuerystring,GetPayReceiptListProps } from "./types/PayReceiptTypes/getPayReceiptList";
import { PostPayRecieptConfirmRequest } from "./types/PayReceiptTypes/postPayReceiptConfirm";

const PayReceiptApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs​/admin​/pay-receipt​/list 查詢還款憑證列表
        getPayReceiptList: builder.query<GetPayReceiptListProps, GetPayReceiptListRequestQuerystring>({
            query: (requestBody: GetPayReceiptListRequestQuerystring) => ({
                url: `/pay-receipt/list`,
                params: requestBody,
                method: "get",
            }),
        }),
        // NOTE: POST /hs/admin/pay-receipt/confirm 确认还款明细
        postPayReceiptConfirm: builder.mutation<null, PostPayRecieptConfirmRequest>({
            query: (requestBody: PostPayRecieptConfirmRequest) => ({
                url: `/pay-receipt/confirm`,
                method: "post",
                data: requestBody,
            }),
        }),
    })
});
export const {
    useLazyGetPayReceiptListQuery,
    usePostPayReceiptConfirmMutation
} = PayReceiptApi;
