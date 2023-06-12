import { i18nCommon } from "./common";
import { i18nTodayPhoneUrgeList } from "../modules/todayLoanManage/components/TodayPhoneUrgeList/i18n/translations";
import { i18nOverDuePhoneUrgeList } from "../modules/afterLoanManage/components/PhoneUrgeList/i18n/translations";
import { i18nDescriptions } from "../modules/shared/components/withQueryHook/Descriptions/i18n/translations";

export default {
    "zh-CN": {
        [i18nCommon.namespace]: i18nCommon.translation["zh-CN"],
        [i18nDescriptions.namespace]: i18nDescriptions.translation["zh-CN"],
        [i18nTodayPhoneUrgeList.namespace]: i18nTodayPhoneUrgeList.translation["zh-CN"],
        [i18nOverDuePhoneUrgeList.namespace]: i18nOverDuePhoneUrgeList.translation["zh-CN"]
    },
    "en-US": {
        [i18nCommon.namespace]: i18nCommon.translation["en-US"],
        [i18nDescriptions.namespace]: i18nDescriptions.translation["en-US"],
        [i18nTodayPhoneUrgeList.namespace]: i18nTodayPhoneUrgeList.translation["en-US"],
        [i18nOverDuePhoneUrgeList.namespace]: i18nOverDuePhoneUrgeList.translation["en-US"]

    }
}
