import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetCollectTodayContactListQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetCollectTodayContactListResponse extends GetPageableResponse {
    records: CollectTodayContactListItem[];
}

export interface CollectTodayContactListItem {

}
