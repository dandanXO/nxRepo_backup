import {API} from "../../../api";
import {ChannelTagDTO} from "./dto/ChannelTagDTO";

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
        createTag: builder.mutation<null, ChannelTagDTO>({
            query: (arg: ChannelTagDTO) => ({
                url: `/app-manage/publish`,
                method: "post",
                params: {},
                data: arg,
            })
        }),
        getTag: builder.query<ChannelTagDTO,
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
            ChannelTagDTO
            >({
            query: (arg: ChannelTagDTO) => ({
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
