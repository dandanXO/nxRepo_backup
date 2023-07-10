import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetCollectTodayCollectRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string
}

export interface GetCollectTodayCollectRecordResponse extends GetPageableResponse {
    records: CollectTodayCollectRecordItem[];
}

export interface CollectTodayCollectRecordItem {

}

