import { useTranslation } from 'react-i18next';

import AdminPage from '../../../shared/components/common/AdminPage';

export const OverDueCollectionReport = (): JSX.Element => {
    const { t } = useTranslation();

    return (
        <AdminPage
            navigator={{
                ancestor: {
                    path: '/',
                    breadcrumbName: t('common:menu.homePage'),
                },
                parent: {
                    path: null,
                    breadcrumbName: t('common:menu.overdueCollection'),
                },
                self: {
                    path: null,
                    breadcrumbName: t('common:menu.overdueCollectionReport'),
                },
            }}
        >
            <div>RRR</div>
        </AdminPage>
    );
};
