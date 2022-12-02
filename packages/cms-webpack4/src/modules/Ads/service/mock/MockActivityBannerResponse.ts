// const MockTemplateData = {
//     brandCard: {
//         title: "新人福利",
//         priceUnit: "PKR",
//         price: "5,000",
//         description: "新人大禮包",
//         action: "",
//         actionName: ""
//     },
//     cards: [
//         {
//             title: "利息優惠1",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠2",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠3",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠4",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠5",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠6",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠7",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠8",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         },
//         {
//             title: "利息優惠9",
//             description1: "- 3.5%",
//             description2: "原利息35%",
//             action: "",
//             actionUrl: "",
//             actionName: "點我借款 >"
//         }
//     ]
// }
// MockAdsFormStoreData

import {ActivityBannerResponse} from "../types";

export const MockActivityBannerResponse: ActivityBannerResponse = {
    name: "新年廣告",
    templateType: 1,
    contents: [
        {
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                isBrand: true,
                title: "新人福利",
                priceUnit: "PKR",
                price: "5,000",
                description: "新人大禮包",
            },
        },
        {
            action: "APPLY_LOAN",
            actionUrl: "",
            payload: {
                isBrand: false,
                title: "利息優惠1",
                description1: "- 1.0%",
                description2: "原利息15%",
                actionName: "點我借款 >"
            },
        },
        {
            action: "POP_URL",
            actionUrl: "http://google.com",
            payload: {
                isBrand: false,
                title: "利息優惠2",
                description1: "- 2.0%",
                description2: "原利息25%",
                actionName: "點我借款 >"
            },
        },
    ],
}
