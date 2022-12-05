import {ActivityBannerResponse} from "../types";
import {
    AdTemplate2,
    AdTemplate2BrandCard,
    AdTemplate2Card
} from "../../import/ActivityAdListPage/components/AdTemplate2";
import {AdTemplate3Card} from "../../import/ActivityAdListPage/components/AdTemplate3";

export const MockActivityBannerResponseData3: ActivityBannerResponse<AdTemplate3Card, AdTemplate3Card> = {
    name: "Ads Name",
    templateType: 3,
    enabled: true,
    scenario: "DEFAULT",
    sort: 0,
    contents: [
        {
            // NOTICE: REFACTOR
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionName: "立即查看",
                title: "新人福利",
                description1: "99%",
                description2: "成功放款率",
            },
        },
        {
            // NOTICE: REFACTOR
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                // NOTICE: REFACTOR
                action: "POP_URL",
                title: "利息優惠",
                description1: "-3.5%%",
                description2: "原利息35%",
                actionName: "立即申請",
            },
        },
    ],
}
