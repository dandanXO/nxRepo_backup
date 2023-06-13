import { i18nCommon } from "./common";
import {i18nUrgeCollection} from "./urgeCollection/translations";
import {i18nCards} from "../modules/shared/components/i18n/cards/translations";

export default {
    "zh-CN": {
        [i18nCommon.namespace]: i18nCommon.translation["zh-CN"],
        [i18nCards.namespace]: i18nCards.translation["zh-CN"],
        [i18nUrgeCollection.namespace]: i18nUrgeCollection.translation["zh-CN"]
    },
    "en-US": {
        [i18nCommon.namespace]: i18nCommon.translation["en-US"],
        [i18nCards.namespace]: i18nCards.translation["en-US"],
        [i18nUrgeCollection.namespace]: i18nUrgeCollection.translation["en-US"]
    }
}
