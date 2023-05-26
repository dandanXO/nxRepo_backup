import { API } from '../../shared/api';
import { RiskManageModel } from '../domain/vo/RiskManageModel';
import { GetRiskManageRequest } from './request/GetRiskManageRequest';
import { PostRiskManageCreateRequest } from './request/PostRiskManageCreateRequest';
import { PutRiskManageCreateRequest } from './request/PutRiskManageCreateRequest';
import { GetRiskManageListResponse } from './response/GetRiskManageListResponse';
import { RiskModelMenuResponse } from './response/RiskModelMenuResponse';

const ProductApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/risk-manage/list 风控配置列表
        getRiskManageList: builder.query<GetRiskManageListResponse, null>({
            query: () => ({
                url: `/risk-manage/list`,
                params: {},
                method: 'get',
            }),
        }),

        // NOTE: GET /hs/admin/risk-manage/risk-model-menu 风控模组下拉选单
        getRiskModelMenu: builder.query<RiskModelMenuResponse, {}>({
            query: () => ({
                url: `/risk-manage/risk-model-menu`,
                method: 'get',
            }),
        }),

        // NOTE: POST /hs/admin/risk-manage/model 创建风控模组详情
        postRiskManageCreate: builder.mutation<{}, PostRiskManageCreateRequest>({
            query: (requestBody: PostRiskManageCreateRequest) => ({
                url: `/risk-manage/model`,
                method: 'post',
                data: requestBody,
            }),
        }),

        // NOTE: PUT /hs/admin/product-manage/product/{productId} 异动风控模组详情
        putRiskManageCreate: builder.mutation<{}, PutRiskManageCreateRequest>({
            query: (requestBody: PutRiskManageCreateRequest) => ({
                url: `/risk-manage/model`,
                method: 'put',
                data: requestBody,
            }),
        }),

        // NOTE: GET /hs/admin/risk-manage/model 查询风控模组详情
        getRiskManage: builder.query<RiskManageModel, GetRiskManageRequest>({
            query: (arg: GetRiskManageRequest) => ({
                url: `/risk-manage/model?modelId=${arg.modelId}`,
                method: 'get',
            }),
        }),
    }),
});

export const {
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery,
    usePostRiskManageCreateMutation,
    usePutRiskManageCreateMutation,
} = ProductApi;
