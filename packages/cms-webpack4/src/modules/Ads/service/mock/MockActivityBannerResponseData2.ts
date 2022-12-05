import {ActivityBannerResponse} from "../types";
import {
    AdTemplate2,
    AdTemplate2BrandCard,
    AdTemplate2Card
} from "../../import/ActivityAdListPage/components/AdTemplate2";

export const MockActivityBannerResponseData2: ActivityBannerResponse<AdTemplate2BrandCard, AdTemplate2Card> = {
    name: "新年廣告",
    templateType: 2,
    contents: [
        {
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                actionName: "立即查看",
                actionUrl: "",
                title1: "最快3分鐘",
                title2: "放款率最高",
                priceUnit: "PKR",
                price: "5,000",
                action: "POP_URL",
            },
        },
        {
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                title: "信用500以上 秒下款",
                actionName: "立即申請",
                action: "POP_URL",
            },
        },
        {
            action: "POP_URL",
            actionUrl: "http://google.com",
            payload: {
                title: "憑信用卡秒下50000元",
                actionName: "立即申請",
                action: "POP_URL",
            },
        },
    ],
}
