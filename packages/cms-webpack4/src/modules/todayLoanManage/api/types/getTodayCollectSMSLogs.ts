import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";


export interface GetTodayCollectSMSLogsQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetTodayCollectSMSLogsResponse extends GetPageableResponse {
    records: TodayCollectSMSLogsItem[];
}

export interface TodayCollectSMSLogsItem {

}
