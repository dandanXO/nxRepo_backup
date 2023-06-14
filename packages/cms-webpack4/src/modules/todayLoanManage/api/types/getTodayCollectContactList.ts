import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetTodayCollectContactListQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetTodayCollectContactListResponse extends GetPageableResponse {
    records: TodayCollectContactListItem[];
}

export interface TodayCollectContactListItem {

}
