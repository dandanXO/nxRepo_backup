import { API } from "../../../../api";
import { PostProductCreateRequestBody } from "./request/postProductCreateRequestBody";
import { GetProductRequestQuery } from "./request/getProductRequestQuery";
import { GetAvailableMerchantResponse } from "./response/getAvailableMerchantResponse";
import { GetProductQueryResponse } from "./response/getProductQueryResponse";
import { PostUploadProductIcon } from "./response/postUploadProductIcon";
import { GetProductListResponse } from "./response/getProductListResponse";
import { PutProductProps } from "./request/putProductProps";
import { GetProductListRequestQuery } from './request/getProductListRequestQuery';

const ProductApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/product-manage/merchant/available 可用商户
        getAvailableMerchantList: builder.query<GetAvailableMerchantResponse[], null>({
            query: () => ({
                url: `/product-manage/merchant/available`,
                // params: {},
                method: "get",
            }),
        }),
        // NOTE: GET /hs/admin/product-manage/list 产品管理列表
        getProductManageList: builder.query<GetProductListResponse, GetProductListRequestQuery>({
            query: (requestBody: GetProductListRequestQuery) => ({
                url: `/product-manage/list`,
                method: "get",
                params:requestBody
                // data: requestBody
            }),
        }),
        // NOTE: POST /hs/admin/product-manage/product 创建产品
        postProductCreate: builder.mutation<{}, PostProductCreateRequestBody>({
            query: (requestBody: PostProductCreateRequestBody) => ({
                url: `/product-manage/product`,
                method: "post",
                data: requestBody,
            }),
        }),
        // NOTE: POST /hs/admin/product-manage/icon/upload ICON图标上传
        postUploadProductICON: builder.mutation<PostUploadProductIcon, FormData>({
            query: (requestBody: FormData) => ({
                url: `/product-manage/icon/upload`,
                method: "post",
                headers: {
                    // "Content-Type": "multipart/form-data",
                    // https://www.it145.com/9/182527.html
                    "Content-Type": "multipart/form-data;boundary=" + new Date().getTime(),
                },
                data: requestBody,
            }),
        }),
        // NOTE: GET /hs/admin/product-manage/product 產品詳情
        getProduct: builder.query<GetProductQueryResponse, GetProductRequestQuery>({
            query: (arg: GetProductRequestQuery) => ({
                url: `/product-manage/product?productId=${arg.productId}`,
                method: 'get',
            })
        }),
        // NOTE: PUT /hs/admin/product-manage/product/{productId} 异动产品
        putProductEdit: builder.mutation<{}, PutProductProps>({
            query: (requestBody: PutProductProps) => ({
                url: `/product-manage/product/${requestBody.productId}`,
                method: "put",
                data: requestBody,
            }),
        }),
    })
})

export const {
    useGetAvailableMerchantListQuery,
    useLazyGetProductManageListQuery,
    useLazyGetProductQuery,
    usePostProductCreateMutation,
    usePutProductEditMutation,
} = ProductApi;
