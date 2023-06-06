import { useTranslation } from "react-i18next";
import { i18nTodayPhoneUrgeList } from "./i18n/translations";

export const TodayPhoneUrgeList = () => {
    const { t } = useTranslation(i18nTodayPhoneUrgeList.namespace)
    return (
        <div>
            {t('addUrgeRecord')}
        </div>
    )
}
