import { API } from "./index";
import { ChannelSelect } from "./commonSelectTypes/getChannelSelect";

const ChannelListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET /hs/admin/channel/drop-menu 渠道列表下拉選單
        getChannelList: builder.query<ChannelSelect, null>({
            query: () => ({
                url: `/channel/drop-menu`,
                params: {},
                method: "get",
            }),
        }),
    })
});
export const {
    useGetChannelListQuery,
    useLazyGetChannelListQuery
} = ChannelListApi;
