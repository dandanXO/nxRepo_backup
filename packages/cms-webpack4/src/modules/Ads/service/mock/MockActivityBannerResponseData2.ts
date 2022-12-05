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
            // NOTICE: REFACTOR
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                // NOTICE: REFACTOR
                action: "POP_URL",
                actionName: "立即查看",
                title1: "最快3分鐘",
                title2: "放款率最高",
                priceUnit: "PKR",
                price: "5,000",
            },
        },
        {
            // NOTICE: REFACTOR
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                // NOTICE: REFACTOR
                action: "POP_URL",
                title: "信用500以上 秒下款",
                actionName: "立即申請",
            },
        },
        {
            // NOTICE: REFACTOR
            action: "POP_URL",
            actionUrl: "http://google.com",
            payload: {
                // NOTICE: REFACTOR
                action: "POP_URL",
                title: "憑信用卡秒下50000元",
                actionName: "立即申請",
            },
        },
    ],
}