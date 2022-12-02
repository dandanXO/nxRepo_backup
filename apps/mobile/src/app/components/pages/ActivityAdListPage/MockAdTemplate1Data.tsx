import {AdTemplate1} from "./components/AdTemplate1";
import {AdTemplate2} from "./components/AdTemplate2";

export const MockAdTemplate1Data: AdTemplate1 = {
  brandCard: {
    title: "新人福利",
    priceUnit: "PKR",
    price: "5,000",
    description: "新人大禮包",
  },
  cards: [
    {
      title: "利息優惠1",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠2",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠3",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠4",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠5",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠6",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠7",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠8",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    },
    {
      title: "利息優惠9",
      description1: "- 3.5%",
      description2: "原利息35%",
      action: "APPLY_LOAN",
      actionName: "點我借款 >"
    }
  ]
}

export const MockAdTemplate2Data: AdTemplate2 = {
    brandCard: {
        title1: "最快3分鐘",
        title2: "放款率最高",
        priceUnit: "PKR",
        price: "5,000",
        action: "POP_URL",
        actionName: "立即查看",
        actionUrl: "",
    },
    topCard: {
        title: "信用500以上 秒下款",
        action: "APPLY_LOAN",
        actionName: "立即申請"
    },
    bottomCard: {
        title: "憑信用卡秒下50000元",
        action: "APPLY_LOAN",
        actionName: "立即申請"
    },
}
