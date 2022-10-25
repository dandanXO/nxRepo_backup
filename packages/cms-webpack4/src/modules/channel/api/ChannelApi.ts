import {API} from "../../../api";
import {ChannelTagDTO} from "./dto/ChannelTagDTO";
import {
    CreateChannelRequest,
    CreateChannelResponse,
    GetAllChannelQuery,
    MssChannelListResponse, TagDropMenu
} from "./dto/ChannelDTO";

export type GetAllTagResponse = ChannelTagDTO[];

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
        createTag: builder.mutation<null, ChannelTagDTO>({
            query: (arg: ChannelTagDTO) => ({
                url: `/app-manage/publish`,
                method: "post",
                params: {},
                data: arg,
            })
        }),
        getTag: builder.query<ChannelTagDTO, GetTagRequest>({
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
        putTag: builder.mutation<null, ChannelTagDTO>({
            query: (arg: ChannelTagDTO) => ({
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
        getAllChannel: builder.query<MssChannelListResponse, GetAllChannelQuery>({
            query: (query: GetAllChannelQuery) => ({
                url: `/channel/all?appName=${query.appName||""}&enabled=${query.enabled||""}&id=${query.id||""}&modelName=${query.modelName||""}&name=${query.name||""}&publishId=${query.publishId||""}`,
                method: "get",
                params: {},
            }),
        }),
        // 取得風控列表
        // 取得風控配置標籤
        getAllChannelSettingTagDropMenu: builder.query<TagDropMenu[], {}>({
            query: () => ({
                url: `/app-manage/publish/drop-menu`,
                method: "get",
                params: {},
            }),
        }),
        // 新增渠道
        createChannel: builder.mutation<CreateChannelResponse, CreateChannelRequest>({
            query: (arg: CreateChannelRequest) => ({
                url: `/channel`,
                method: "post",
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
} = ChannelApi;
