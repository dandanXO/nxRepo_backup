import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableCard } from '../../../shared/components/withQueryHook/Cards';
import { useLazyGetLoginAccountListQuery } from '../../../system/api/LoginAccountManageApi';
import { operatorsList } from '../../../system/api/types/LoginAccountManageTypes/getLoginAccountList';

interface LoginLogsModalProps {
    open: boolean;
    collector: string;
    onCancel: () => void;
}

const CollectorLoginLogsModal = ({ open, collector, onCancel }: LoginLogsModalProps): JSX.Element => {
    const initSearchList = {
        accountNumber: collector,
        pageNum: 1,
        pageSize: 10,
    };
    const [searchList, setSearchList] = useState(initSearchList);
    const { t } = useTranslation();

    const [triggerGetList, { currentData, isFetching }] = useLazyGetLoginAccountListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const mockData = [
        { loginTime: '2022-08-21 10:03:12', ip: '121.198.4.111' },
        { loginTime: '2022-08-21 09:03:12', ip: '157.100.188.100' },
    ];

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

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList]);

    return (
        <Modal
            open={open}
            title={t('urgeCollection:collectorLoginIPRecord')}
            footer={null}
            width="50%"
            onCancel={onCancel}
            maskClosable={false}
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
