import {IAdsTemplate} from "../types/IAdsTemplate";
import {IAdsScenario} from "../types/IAdsScenario";

export const AdsTemplateData: IAdsTemplate[] = [
    {id: 1, name: "左右滑动版型(数量可条整)"},
    {id: 2, name: "固定版型1(数量固定)"},
    {id: 3, name: "固定版型2(数量固定)"},
]

export const getDefaultActivityBannerContent = (index: number) => ({
    action: "APPLY_LOAN",
    actionUrl: "",
    payload: {
        // isBrand: false,
        title: "優惠名稱" + index,
        description1: "- 3.5%",
        description2: "原利息35%",
        actionName: "點我借款 >",
    },
})

export const AdsScenarioData: IAdsScenario[] = [
    {id: 1, name: "預設", value: "DEFAULT"},
    {id: 2, name: "新客", value: "NEW_USER"},
    {id: 3, name: "老客", value: "OLD_USER"},
    {id: 4, name: "付款兩次", value: "REPAYMENT_2TH_TIMES"},
    {id: 5, name: "付款超過兩次", value: "REPAYMENT_ABOVE_2TH_TIMES"},
]
