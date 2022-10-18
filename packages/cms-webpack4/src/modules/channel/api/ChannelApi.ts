import {API} from "../../../api";
export interface ChannelTag {
    auditAcc	:string;
    // google audit acc

    auditAccOtpCode	:string;
    // google audit 登入验证码

    auditLoanAmount	:string;
    // 审核的借款金额

    auditQuota	:string;
    // 审核的订单额度

    auditServiceFee	:string;
    // 审核的服务费

    auditTaxFee	:string;
    // 审核的利息

    auditTerm	:string;
    // 审核的天数

    id?: number;
    // ID

    name:	string;
    // APP設定名称

    showPermission	:boolean;
    // 显示受权页面 0: 关闭 1: 开启

    showTermAndCondition	:boolean;
    // 显示条款页面 0: 关闭 1: 开启
}

export type GetAllTagResponse = ChannelTag[];

export interface GetTagRequest {
    id: number;
}

export interface DeleteTagRequest {
    id: number;
}


const ChannelApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        createTag: builder.mutation<null, ChannelTag>({
            query: (arg: ChannelTag) => ({
                url: `/app-manage/publish`,
                method: "post",
                params: {},
                data: arg,
            })
        }),
        getTag: builder.query<ChannelTag,
            GetTagRequest
            >({
            query: (arg: GetTagRequest) => ({
                url: `/app-manage/publish?id=${arg.id}`,
                method: "get",
            }),
        }),
        getAllTag: builder.query<GetAllTagResponse,
            null
            >({
            query: () => ({
                url: `/app-manage/publish/all`,
                method: "get",
                params: {},
            }),
        }),
        putTag: builder.mutation<null,
            ChannelTag
            >({
            query: (arg: ChannelTag) => ({
                url: `/app-manage/publish`,
                method: "put",
                params: {},
                data: arg,

            }),
        }),
        deleteTag: builder.mutation<null,
            DeleteTagRequest
            >({
            query: (arg: DeleteTagRequest) => ({
                url: `/app-manage/publish`,
                method: "delete",
                params: {},
                data: arg,
            }),
        }),

    }),
})

export const {
    useCreateTagMutation,
    useLazyGetTagQuery,
    useLazyGetAllTagQuery,
    usePutTagMutation,
    useDeleteTagMutation,
} = ChannelApi;
