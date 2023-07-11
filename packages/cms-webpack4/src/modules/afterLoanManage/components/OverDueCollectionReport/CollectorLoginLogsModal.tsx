import { ProColumns } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { TableCard } from '../../../shared/components/withQueryHook/Cards';
import { useLazyGetLoginAccountListQuery } from '../../../system/api/LoginAccountManageApi';

interface LoginLogsModalProps {
    open: boolean;
    collector: string;
    onCancel: () => void;
}

const CollectorLoginLogsModal = ({ open, collector, onCancel }: LoginLogsModalProps): JSX.Element => {
    const { t } = useTranslation();

    const columns: ProColumns[] = [
        {
            title: t('common:table.loginTime'),
            dataIndex: 'lastLoginTime',
        },
        {
            title: t('common:table.loginIP'),
            dataIndex: 'ip',
        },
    ];

    return (
        <Modal
            open={open}
            title={t('urgeCollection:collectorLoginIPRecord')}
            footer={null}
            width="50%"
            onCancel={onCancel}
            bodyStyle={{ paddingTop: 0 }}
        >
            <TableCard
                columns={columns}
                hook={useLazyGetLoginAccountListQuery}
                queryBody={{ accountNumber: collector }}
                dataSourcePath="0.operators"
                totalRecordsPath=""
                rowKey="lastLoginTime"
                hasTotalRecords={false}
            />
        </Modal>
    );
};

export default CollectorLoginLogsModal;
