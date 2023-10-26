import { API } from '../../shared/api';
import { GetOrderListProps, GetOrderListRequestQuerystring } from './types/getOrderList';
import { PutOrderExpiryRequestBody } from './types/putOrderExpiryRequestBody';

const OrderApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/order/list 訂單列表查詢
        getOrderList: builder.query<GetOrderListProps, GetOrderListRequestQuerystring>({
            query: (requestBody: GetOrderListRequestQuerystring) => ({
                url: `/order/list`,
                params: requestBody,
                method: 'get',
            }),
        }),
        // NOTE PUT /hs/admin/order/expiry 订单到期时间变更
        putOrderExpiry: builder.mutation<null, PutOrderExpiryRequestBody>({
            query: (data: PutOrderExpiryRequestBody) => ({
                url: '/order/expiry',
                method: 'put',
                data,
            }),
        }),
    }),
});
export const { useLazyGetOrderListQuery, usePutOrderExpiryMutation } = OrderApi;
