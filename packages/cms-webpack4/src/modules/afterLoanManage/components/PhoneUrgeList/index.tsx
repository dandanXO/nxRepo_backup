import { useTranslation } from 'react-i18next';

import AdminPage from '../../../shared/components/common/AdminPage';
import { OverDuePhoneUrgeListTable } from './OverDuePhoneUrgeListTable';

const PhoneUrgeList = (): JSX.Element => {
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
                    breadcrumbName: t('menu.overdueCollection'),
                },
                self: {
                    path: null,
                    breadcrumbName: t('menu.overdueCallList'),
                },
            }}
        >
            <OverDuePhoneUrgeListTable />
        </AdminPage>
    );
};

export default PhoneUrgeList;
