import {GetDataPageRequestQuerystring} from "../../../shared/api/commonRequest";
import {GetPageableResponse} from "../../../shared/api/commonReponse";


export interface GetCollectTodaySMSLogsQueryString extends GetDataPageRequestQuerystring {
    userId: string
}

export interface GetCollectTodaySMSLogsResponse extends GetPageableResponse {
    records: CollectTodaySMSLogsItem[];
}

export interface CollectTodaySMSLogsItem {

}
