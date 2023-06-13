import { i18nCommon } from "./common";
import { i18nDescriptionsCard } from "../modules/shared/components/withQueryHook/DescriptionsCard/i18n/translations";
import {i18nUrgeCollection} from "./urgeCollection/translations";

export default {
    "zh-CN": {
        [i18nCommon.namespace]: i18nCommon.translation["zh-CN"],
        [i18nDescriptionsCard.namespace]: i18nDescriptionsCard.translation["zh-CN"],
        [i18nUrgeCollection.namespace]: i18nUrgeCollection.translation["zh-CN"]
    },
    "en-US": {
        [i18nCommon.namespace]: i18nCommon.translation["en-US"],
        [i18nDescriptionsCard.namespace]: i18nDescriptionsCard.translation["en-US"],
        [i18nUrgeCollection.namespace]: i18nUrgeCollection.translation["en-US"]
    }
}
