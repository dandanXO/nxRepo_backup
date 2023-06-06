import { useTranslation } from "react-i18next";
import { i18nCurrentDayPhoneUrgeListPage } from "./i18n/translations";

export const CurrentDayPhoneUrgeListPage = () => {
    const { t } = useTranslation(i18nCurrentDayPhoneUrgeListPage.namespace)
    return (
        <div>
            {t('addUrgeRecord')}
        </div>
    )
}
