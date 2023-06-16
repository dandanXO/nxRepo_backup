import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetCollectOverDueUrgeRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string
}

export interface GetCollectOverDueUrgeRecordResponse extends GetPageableResponse {
    records: CollectOverDueUrgeRecordItem[];
}

export interface CollectOverDueUrgeRecordItem {

}

