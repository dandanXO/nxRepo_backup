import {API} from "../../../api";
import {number} from "zod";
import {NEVER} from "@reduxjs/toolkit/dist/query/fakeBaseQuery";

// NOTE: GET ALL
export interface RiskManageList {
    createTime: string;
    // 创建时间

    enabled: boolean;
    // 状态

    modelName: string;
    // 风控名称

    updateTime: string;
    // 更新时间

    id: number;
}
export type GetRiskManageListResponse = RiskManageList[];

// NOTE: GET
export interface GetRiskManageRequest {
    modelId: string;
}

// 首贷级距
export interface MssRiskRankVo {
    balance: number;
    // 可借额度

    id: number;
    // 风控评分等级流水号

    max:	number;
    // 终始阀值(exclude)

    min:	number;
    // 起始阀值(include)

    modelId: number;
    // 风控模组流水号

    rank:	"EXCELLENT" | "GOOD" | "NORMAL" | "ORDINARY" | "REJECT";
    // 风控评分等级

    sort:	number;
    // 排序

    type:   0 | 1
    // 级距类型 0: 首贷, 1: 复借
}

export interface RiskManageModel {
    enabled: boolean;
    // 状态

    firstLoan: MssRiskRankVo;
    modelName:	string;
    // 风控名称

    remark:	string;
    // 备注

    repeatLoan: MssRiskRankVo;
    riskModelName: string;
    // 风控模型名称

    useRcQuota: boolean;
    // 借款额度使用风控返回结果
}

export type GetRiskManageResponse = RiskManageModel;

// NOTE: Post
export type PostRiskManageCreateRequest = RiskManageModel;

// NOTE: Put
export type PutRiskManageCreateRequest = RiskManageModel;

export interface RiskModelMenu {
    id: number;
    riskModelName: string;
}

type RiskModelMenuResponse = Array<RiskModelMenu>;

const ProductApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/risk-manage/list 风控配置列表
        getRiskManageList: builder.query<
            GetRiskManageListResponse,
            null
            >({
            query: () => ({
                url: `/risk-manage/list`,
                params: {
                },
                method: "get",
            }),
        }),

        // NOTE: GET /hs/admin/risk-manage/risk-model-menu 风控模组下拉选单
        getRiskModelMenu: builder.query<RiskModelMenuResponse, {}>({
            query: (arg: GetRiskManageRequest) => ({
                url: `/risk-manage/risk-model-menu`,
                method: 'get',
            })
        }),


        // NOTE: POST /hs/admin/risk-manage/model 创建风控模组详情
        postRiskManageCreate: builder.mutation<{}, PostRiskManageCreateRequest>({
            query: (requestBody: RiskManageModel) => ({
                url: `/risk-manage/model`,
                method: "post",
                data: requestBody,
            }),
        }),

        // NOTE: PUT /hs/admin/product-manage/product/{productId} 异动风控模组详情
        putRiskManageCreate: builder.mutation<{}, PutRiskManageCreateRequest>({
            query: (requestBody: RiskManageModel) => ({
                url: `/risk-manage/model`,
                method: "put",
                data: requestBody,
            }),
        }),

        // NOTE: GET /hs/admin/risk-manage/model 查询风控模组详情
        getRiskManage: builder.query<RiskManageModel, GetRiskManageRequest>({
            query: (arg: GetRiskManageRequest) => ({
                url: `/risk-manage/model?modelId=${arg.modelId}`,
                method: 'get',
            })
        }),



    })
})

export const {
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery,
    usePostRiskManageCreateMutation,
    usePutRiskManageCreateMutation,
} = ProductApi;
