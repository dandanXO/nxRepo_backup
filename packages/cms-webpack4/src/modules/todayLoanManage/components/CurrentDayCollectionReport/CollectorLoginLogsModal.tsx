import { ProColumns } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { SinglePageTableCard } from '../../../shared/components/withQueryHook/Cards';
import { useGetLoginAccountListQuery } from '../../../system/api/LoginAccountManageApi';

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
            maskClosable={false}
            bodyStyle={{ paddingTop: 0 }}
        >
            <SinglePageTableCard
                columns={columns}
                hook={useGetLoginAccountListQuery}
                params={{ accountNumber: collector }}
                dataSourcePath="0.operators"
                rowKey="lastLoginTime"
            />
        </Modal>
    );
};

export default CollectorLoginLogsModal;
