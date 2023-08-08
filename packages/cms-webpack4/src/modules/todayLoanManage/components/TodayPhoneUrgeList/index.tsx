import { useTranslation } from 'react-i18next';

import AdminPage from '../../../shared/components/common/AdminPage';
import { TodayPhoneUrgeListTable } from './TodayPhoneUrgeListTable';

const TodayPhoneUrgeList = (): JSX.Element => {
    const { t } = useTranslation();
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
            <TodayPhoneUrgeListTable />
        </AdminPage>
    );
};

export default TodayPhoneUrgeList;
