import {API} from "../../../../api";
import {GetAvailableMerchantResponse} from "./types/getAvailbaleMerchant";
import {GetProductListResponse} from "./types/getProductList";
import {PostProductCreateRequestBody} from "./types/postProductCreate";
import {PostUploadProductIcon} from "./types/postUploadProductIcon";
import {GetProductQueryResponse, GetProductRequestQuery} from "./types/getProduct";
import {PutProductProps} from "./types/putProduct";
import {GetAllAppConfigurationResponse} from "../appManage/request/GetAllAppConfigurationResponse";
import {CreateAppConfigurationRequest} from "../appManage/request/CreateAppConfigurationRequest";
import {GetAppConfigurationResponse} from "../appManage/response/GetAppConfigurationResponse";
import {GetAppConfigurationRequest} from "../appManage/request/GetAppConfigurationRequest";
import {UpdateAppConfigurationRequest} from "../appManage/request/UpdateAppConfigurationRequest";
import {DeleteAppConfigurationRequest} from "../appManage/request/DeleteAppConfigurationRequest";

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

    // NOTE: APP 參數配置
    // 查詢 APP 参数配置
    getAllAppConfiguration: builder.query<GetAllAppConfigurationResponse, {}>({
        query: () => ({
            url: `/app-manage/all`,
            method: "get",
            params: {},
        }),
    }),
    // 取得 APP 配置
    getAppConfiguration: builder.query<GetAppConfigurationResponse, {}>({
      query: (arg: GetAppConfigurationRequest) => ({
          url: `/app-manage/${arg.id}`,
          method: "get",
      }),
    }),
    // 新增 APP 配置
    createAppConfiguration: builder.mutation<{}, CreateAppConfigurationRequest>({
        query: (arg: CreateAppConfigurationRequest) => ({
            url: `/app-manage`,
            method: "post",
            data: arg,
        })
    }),
    // 更新 APP 配置
    updateAppConfiguration: builder.mutation<{}, UpdateAppConfigurationRequest>({
        query: (arg: UpdateAppConfigurationRequest) => ({
            url: `/app-manage`,
            method: "put",
            data: arg,
        })
    }),
    // 刪除 APP 配置
    deleteAppConfiguration: builder.mutation<null, DeleteAppConfigurationRequest>({
        query: (arg: DeleteAppConfigurationRequest) => ({
            url: `/app-manage`,
            method: "delete",
            params: {},
            data: arg,
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
    useLazyGetAllAppConfigurationQuery,
    useLazyGetAppConfigurationQuery,
    useCreateAppConfigurationMutation,
    useUpdateAppConfigurationMutation,
    useDeleteAppConfigurationMutation,
} = ProductApi;
