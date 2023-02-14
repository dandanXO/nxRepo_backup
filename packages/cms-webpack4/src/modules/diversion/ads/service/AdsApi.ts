import {API} from "../../../shared/api";
import {AdsScenarioType} from "../export/types/IAdsScenario";

export interface ActivityBannerVoRes {
    action:string;
    // 按钮事件

    actionUrl: string;
    // 事件URL

    id: number;
    // 流水號

    payload: any;
    sort: number;
    // 排序
}

export interface ActivityModel {
    contents: ActivityBannerVoRes[];
    enabled: boolean;
    // 是否啟用

    id: number;
    // 流水號

    name: string;
    // 活動名稱

    scenario: AdsScenarioType;
    sort: number;
    // 排序

    templateType: number;
    // 模板類型
}

export type GetActivityRequest = {
    id: number;
}
export type GetActivityResponse = ActivityModel;
export type GetActivitiesResponse = ActivityModel[];
export type PostActivityRequest = ActivityModel;
export type PutActivityRequest = ActivityModel;

interface DeleteActivityRequest {
    id: number
}

const AdsApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        getActivity: builder.query<GetActivityResponse, GetActivityRequest>({
            query: (arg: GetActivityRequest) => ({
                url: `/activity?id=${arg.id}`,
                method: 'get',
            })
        }),
        getActivities: builder.query<GetActivitiesResponse, null>({
            query: () => ({
                url: `/activity/list`,
                method: 'get',
            })
        }),
        postActivity: builder.mutation<null, PostActivityRequest>({
            query: (arg: PostActivityRequest) => ({
                url: `/activity`,
                method: "post",
                data: arg
            })
        }),
        putActivity: builder.mutation<null, PutActivityRequest>({
            query: (arg: PutActivityRequest) => ({
                url: `/activity`,
                method: "put",
                data: arg
            })
        }),
        deleteActivity: builder.mutation<null, DeleteActivityRequest>({
            query: (arg: DeleteActivityRequest) => ({
                url: `/activity/${arg.id}`,
                method: "delete",
            })
        }),
    })
})

export const {
    useLazyGetActivityQuery,
    useLazyGetActivitiesQuery,
    usePostActivityMutation,
    usePutActivityMutation,
    useDeleteActivityMutation,
} = AdsApi;
