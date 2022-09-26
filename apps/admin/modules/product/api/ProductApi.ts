import {API} from "../../../api";
import {GetAvailableMerchantResponse} from "../../../types/getAvailbaleMerchant";
import {GetProductListResponse} from "../../../types/getProductList";
import {PostProductCreateRequestBody} from "../../../types/postProductCreate";
import {PostUploadProductIcon} from "../../../types/postUploadProductIcon";
import {GetProductQueryResponse, GetProductRequestQuery} from "../../../types/getProduct";
import {PutProductProps} from "../../../types/putProduct";

const ProductApi = API.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    // NOTE: GET /hs/admin/product-manage/merchant/available 可用商户
    getAvailableMerchantList: builder.query<GetAvailableMerchantResponse,null>({
      query: () => ({
        url: `/product-manage/merchant/available`,
        // params: {},
        method: "get",
      }),
    }),
    // NOTE: GET /hs/admin/product-manage/list 产品管理列表
    getProductManageList: builder.query<
      GetProductListResponse,
      null
      >({
      query: () => ({
        url: `/product-manage/list`,
        params: {
        },
        method: "get",
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
          "Content-Type":
            "multipart/form-data;boundary=" + new Date().getTime(),
        },
        data: requestBody,
        // data: {
        //     file: query.file,
        //     orderNo: query.orderNo,
        //     receipt: query.receipt,
        // }
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
  usePutProductEditMutation
} = ProductApi;
