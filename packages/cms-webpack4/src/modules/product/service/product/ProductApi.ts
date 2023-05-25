import { API } from "../../../shared/api";
import { GetAvailableMerchantResponse } from "./response/getAvailableMerchantResponse";
import { PostUploadProductIcon } from "./response/postUploadProductIcon";
import { GetProductListRequestQuery } from './request/getProductListRequestQuery';
import { PatchProductRequestBody } from "./domain/patchProduct";
import { ProductTypes } from "./domain/productTypes";
import { extraProductTypes } from "./domain/extraProductTypes";

export interface ProductRequestParams {
    productId: number
}

export type Product = ProductTypes & extraProductTypes
export type GetProductListResponse = Product[];
export type GetProductDetailResponse = Product;
export type PostProductRequest = ProductTypes;
export type PutProductProps = ProductRequestParams & ProductTypes;
export type PatchProductProps = ProductRequestParams & PatchProductRequestBody;

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
                params: requestBody
                // data: requestBody
            }),
        }),
        // NOTE: POST /hs/admin/product-manage/product 创建产品
        postProductCreate: builder.mutation<{}, PostProductRequest>({
            query: (requestBody: PostProductRequest) => ({
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
        getProduct: builder.query<GetProductDetailResponse, ProductRequestParams>({
            query: (arg: ProductRequestParams) => ({
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
        // NOTE: PUT /hs/admin/product-manage/product/{productId} 异动产品
        patchProductEdit: builder.mutation<{}, PatchProductProps>({
            query: (requestBody: PatchProductProps) => ({
                url: `/product-manage/product/${requestBody.productId}`,
                method: "patch",
                data: requestBody,
            }),
        }),
    })
});

export const {
    useGetAvailableMerchantListQuery,
    useLazyGetProductManageListQuery,
    useLazyGetProductQuery,
    usePostProductCreateMutation,
    usePutProductEditMutation,
    usePatchProductEditMutation
} = ProductApi;
