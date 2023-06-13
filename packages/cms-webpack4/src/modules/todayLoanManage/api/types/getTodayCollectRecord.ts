import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";

export interface GetTodayCollectRecordQueryObject {
    body: {
        overdueId: string
    },
    string: GetDataPageRequestQuerystring
}

export interface GetTodayCollectRecordResponse extends GetPageableResponse {
    records: TodayCollectRecordItem[];
}

export interface TodayCollectRecordItem {

}

