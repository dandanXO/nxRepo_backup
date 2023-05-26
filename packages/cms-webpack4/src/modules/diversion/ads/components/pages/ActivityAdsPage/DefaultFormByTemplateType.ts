import { IActivityAdsPageFormStore } from "../../../export/types/IAdsFormStore";
import { DeepPartial } from "../../../../../shared/types/custom";

export const DefaultFormByTemplateType = {
    "1": {
        templateType: 1,
        enabled: true,
        scenario: "DEFAULT",
        sort: 0,
        contents: [
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    title: "新人福利",
                    priceUnit: "PKR",
                    price: "5,000",
                    description: "新人大禮包",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "APPLY_LOAN",
                    actionUrl: "",
                    actionName: "點我借款 >",
                    title: "利息優惠1",
                    description1: "- 1.0%",
                    description2: "原利息15%",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "POP_URL",
                actionUrl: "http://google.com",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "",
                    actionName: "點我借款 >",
                    title: "利息優惠2",
                    description1: "- 2.0%",
                    description2: "原利息25%",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>,
    "2": {
        templateType: 2,
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
                    action: "POP_URL",
                    actionName: "立即查看",
                    actionUrl: "",
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
                    actionUrl: "http://google.com",
                    actionName: "立即申請",
                    title: "信用500以上 秒下款",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "POP_URL",
                actionUrl: "http://google.com",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "http://google.com",
                    actionName: "立即申請",
                    title: "憑信用卡秒下50000元",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>,
    "3": {
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
                    actionUrl: "",
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
                    actionUrl: "",
                    actionName: "立即申請",
                    title: "利息優惠",
                    description1: "-3.5%",
                    description2: "原利息35%",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>
};
