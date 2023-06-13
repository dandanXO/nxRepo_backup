import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetTodayCollectRecordQueryString extends GetDataPageRequestQuerystring {
    collectId: string
}

export interface GetTodayCollectRecordResponse extends GetPageableResponse {
    records: TodayCollectRecordItem[];
}

export interface TodayCollectRecordItem {

}

