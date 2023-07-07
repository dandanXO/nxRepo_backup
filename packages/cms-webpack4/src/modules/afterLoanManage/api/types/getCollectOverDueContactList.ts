import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetCollectOverDueContactListQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetCollectOverDueContactListResponse extends GetPageableResponse {
    records: CollectOverDueContactListItem[];
}

export interface CollectOverDueContactListItem {

}
