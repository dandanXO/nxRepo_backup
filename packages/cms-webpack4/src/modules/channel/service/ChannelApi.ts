import {API} from "../../../api";
import {ChannelTag} from "../domain/vo/ChannelTag";
import {RiskDropMenu} from "../domain/vo/RiskDropMenu";
import {ChannelTagDropMenu} from "../domain/vo/ChannelTagDropMenu";
import {GetAllChannelRequest} from "./request/GetAllChannelRequest";
import {Channel} from "../domain/vo/Channel";
import {GetChannelRequest} from "./request/GetChannelRequest";
import {CreateChannelRequest} from "./request/CreateChannelRequest";
import {UpdateChannelRequest} from "./request/UpdateChannelRequest";

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
        // NOTE: 渠道標籤管理
        createTag: builder.mutation<null, ChannelTag>({
            query: (arg: ChannelTag) => ({
                url: `/app-manage/publish`,
                method: "post",
                params: {},
                data: arg,
            })
        }),
        getTag: builder.query<ChannelTag, GetTagRequest>({
            query: (arg: GetTagRequest) => ({
                url: `/app-manage/publish?id=${arg.id}`,
                method: "get",
            }),
        }),
        getAllTag: builder.query<GetAllTagResponse, null>({
            query: () => ({
                url: `/app-manage/publish/all`,
                method: "get",
                params: {},
            }),
        }),
        putTag: builder.mutation<null, ChannelTag>({
            query: (arg: ChannelTag) => ({
                url: `/app-manage/publish`,
                method: "put",
                params: {},
                data: arg,

            }),
        }),
        deleteTag: builder.mutation<null, DeleteTagRequest>({
            query: (arg: DeleteTagRequest) => ({
                url: `/app-manage/publish`,
                method: "delete",
                params: {},
                data: arg,
            }),
        }),
        // NOTE: 渠道管理
        // 取得所有渠道
        getAllChannel: builder.query<Channel[], GetAllChannelRequest>({
            query: (query: GetAllChannelRequest) => ({
                url: `/channel/all?appName=${query.appName||""}&enabled=${query.enabled||""}&id=${query.id||""}&modelName=${query.modelName||""}&name=${query.name||""}&publishId=${query.publishId||""}`,
                method: "get",
                params: {},
            }),
        }),
        // 取得風控方案列表
        getAllRiskDropMenu: builder.query<RiskDropMenu[], {}>({
            query: () => ({
                url: `/risk-manage/drop-menu`,
                method: "get",
            }),
        }),
        // 取得風控配置標籤列表
        getAllChannelSettingTagDropMenu: builder.query<ChannelTagDropMenu[], {}>({
            query: () => ({
                url: `/app-manage/publish/drop-menu`,
                method: "get",
            }),
        }),
        // 新增渠道
        createChannel: builder.mutation<{}, CreateChannelRequest>({
            query: (arg: CreateChannelRequest) => ({
                url: `/channel`,
                method: "post",
                data: arg,
            })
        }),
        // 取得渠道資訊
        getChannel: builder.query<Channel, {}>({
            query: (arg: GetChannelRequest) => ({
                url: `/channel/${arg.id}`,
                method: "get",
            }),
        }),
        updateChannel: builder.mutation<{}, UpdateChannelRequest>({
            query: (arg: UpdateChannelRequest) => ({
                url: `/channel`,
                method: "put",
                data: arg,
            })
        }),
    }),
})

export const {
    useCreateTagMutation,
    useLazyGetTagQuery,
    useLazyGetAllTagQuery,
    usePutTagMutation,
    useDeleteTagMutation,

    useLazyGetAllChannelQuery,
    useLazyGetAllRiskDropMenuQuery,
    useLazyGetAllChannelSettingTagDropMenuQuery,
    useCreateChannelMutation,
    useLazyGetChannelQuery,
    useUpdateChannelMutation,
} = ChannelApi;
