import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetCollectOverDueCollectRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string
}

export interface GetCollectOverDueCollectRecordResponse extends GetPageableResponse {
    records: CollectOverDueCollectRecordItem[];
}

export interface CollectOverDueCollectRecordItem {

}

