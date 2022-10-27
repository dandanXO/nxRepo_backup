import {API} from "../../../api";

const AppApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: 渠道管理
        // 取得所有渠道
        // getAllChannel: builder.query<Channel[], GetAllChannelRequest>({
        //     query: (query: GetAllChannelRequest) => ({
        //         url: `/channel/all?appName=${query.appName||""}&enabled=${query.enabled||""}&id=${query.id||""}&modelName=${query.modelName||""}&name=${query.name||""}&publishId=${query.publishId||""}`,
        //         method: "get",
        //         params: {},
        //     }),
        // }),
        // // 新增渠道
        // createChannel: builder.mutation<{}, CreateChannelRequest>({
        //     query: (arg: CreateChannelRequest) => ({
        //         url: `/channel`,
        //         method: "post",
        //         data: arg,
        //     })
        // }),
        // // 取得渠道資訊
        // getChannel: builder.query<Channel, {}>({
        //     query: (arg: GetChannelRequest) => ({
        //         url: `/channel/${arg.id}`,
        //         method: "get",
        //     }),
        // }),
        // updateChannel: builder.mutation<{}, UpdateChannelRequest>({
        //     query: (arg: UpdateChannelRequest) => ({
        //         url: `/channel`,
        //         method: "put",
        //         data: arg,
        //     })
        // }),
        // deleteTag: builder.mutation<null, DeleteTagRequest>({
        //     query: (arg: DeleteTagRequest) => ({
        //         url: `/app-manage/publish`,
        //         method: "delete",
        //         params: {},
        //         data: arg,
        //     }),
        // }),
    }),
})

export const {

} = AppApi;
