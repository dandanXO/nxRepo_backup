import { useTranslation } from "react-i18next";
import { i18nTodayPhoneUrgeList } from "./i18n/translations";
import AdminPage from "../../../shared/components/common/AdminPage";
import { TodayPhoneUrgeListTable } from "./TodayPhoneUrgeListTable";
import { i18nCommon } from "../../../../i18n/common";


export const TodayPhoneUrgeList = () => {
    const { t } = useTranslation()
    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '/',
                    breadcrumbName: t('menu.homePage'),
                },
                parent: {
                    path: null,
                    breadcrumbName: t('menu.currentDayOverdueCall'),
                },
                self: {
                    path: null,
                    breadcrumbName: t('menu.currentDayOverdueCallList'),
                },
            }}
        >
            <TodayPhoneUrgeListTable
            />
        </AdminPage>
    )
}
