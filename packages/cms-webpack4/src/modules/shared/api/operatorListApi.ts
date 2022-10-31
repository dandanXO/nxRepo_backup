import {API} from "../../../api";
import { GetOperatorListResponse } from "./types/getOperatorList";

const OperatorListApi = API.injectEndpoints({
    overrideExisting: false,
    endpoints: (builder) => ({
        // NOTE: GET ​/hs​/admin​/whitelist​/operatorOptionList 取得操作人選項列表
        getOperatorList: builder.query<GetOperatorListResponse, null>({
            query: () => ({
                url: `/whitelist/operatorOptionList`,
                params: {},
                method: "get",
            }),
        }),
    })
})
export const {
    useGetOperatorListQuery
} = OperatorListApi;
