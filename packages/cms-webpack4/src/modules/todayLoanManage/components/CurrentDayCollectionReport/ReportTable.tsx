import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import CollectorLoginLogsModal from './CollectorLoginLogsModal';

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
};

const searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const ReportTable = (): JSX.Element => {
    const [loginLogsModal, setLoginLogsdModal] = useState<{ open: boolean; collectorId: string }>({
        open: false,
        collectorId: '',
    });

    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const isSuperAdmin = getIsSuperAdmin();

    const initDate = moment();
    const initSearchList = {
        merchantId: '',
        collectionDate: [initDate, initDate],
        collectorTame: '',
        stage: '',
        collectorId: '',
    };

    const handleShowLoginLogs = (collectorId: string) => {
        setLoginLogsdModal({ open: true, collectorId: collectorId });
    };

    const { t } = useTranslation();

    const mockData = [
        {
            collectorId: '001',
            merchantName: 'BB商戶',
            collectionDate: '2022-08-19',
            collectionTeam: '催收机构名A',
            overDueStage: 'S1',
            collector: 'Json',
            loginTime: '08:03:12',
            followCount: 20,
            coverageRage: '25%',
            repaidCount: 2,
            extensionCount: 10,
            extensionRate: '1%',
            receivedCount: 2,
            paymentRate: '50%',
            receiptAmount: 6800,
            followUpAmount: 25800,
            paymentAmountRate: '26.36%',
        },
    ];
    const columns: ProColumns[] = [
        {
            title: t('common:function'),
            key: 'function',
            hideInSearch: true,
            render: (_, { collectorId }) => (
                <a onClick={() => handleShowLoginLogs(collectorId)}>{t('urgeCollection:loginLogs')}</a>
            ),
        },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'collectionDate',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: [t('common:startDate'), t('common:endDate')],
            },
            initialValue: [initDate, initDate],
            render: (_, { collectionDate }) => collectionDate,
        },
        {
            title: t('urgeCollection:collectionTeam'),
            dataIndex: 'collectionTeam',
        },
        {
            title: t('urgeCollection:stage'),
            dataIndex: 'overDueStage',
        },
        {
            title: t('urgeCollection:collector'),
            dataIndex: 'collector',
        },
        {
            title: t('urgeCollection:initialLoginTime'),
            dataIndex: 'loginTime',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:numberOfFollowUps'),
            dataIndex: 'followCount',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:coverageRateTooltips'),
            title: t('urgeCollection:coverageRate'),
            dataIndex: 'coverageRage',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:fullRepaymentOrders'),
            dataIndex: 'repaidCount',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:extensionCount'),
            dataIndex: 'extensionCount',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:extensionRateTooltips'),
            title: t('urgeCollection:extensionRate'),
            dataIndex: 'extensionRate',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:totalReceivedCountTooltips'),
            title: t('urgeCollection:totalReceivedCount'),
            dataIndex: 'receivedCount',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:orderPaymentRateTooltips'),
            title: t('urgeCollection:orderPaymentRate'),
            dataIndex: 'paymentRate',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:receiptAmount'),
            dataIndex: 'receiptAmount',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:followUpAmount'),
            dataIndex: 'followUpAmount',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:paymentAmountRateTooltips'),
            title: t('urgeCollection:paymentAmountRate'),
            dataIndex: 'paymentAmountRate',
            hideInSearch: true,
        },
    ];
    if (isSuperAdmin) {
        columns.splice(1, 0, { title: t('urgeCollection:merchantName'), dataIndex: 'merchantName' });
    }

    return (
        <>
            <ProTable
                columns={columns}
                rowKey="collectorId"
                dataSource={mockData}
                form={{ ...searchFormLayout }}
                search={{
                    span: searchSpan,
                    labelWidth: 'auto',
                    optionRender: ({ resetText }, { form }) => [
                        <Space>
                            <Button
                                onClick={() => {
                                    form.setFieldsValue({ ...initSearchList });
                                }}
                            >
                                {resetText}
                            </Button>
                            <Button type="primary" onClick={() => form.submit()}>
                                {t('common:search')}
                            </Button>
                        </Space>,
                    ],
                }}
                onSubmit={(params) => {
                    console.log('TTT');
                    console.log(params);
                }}
            />
            <CollectorLoginLogsModal
                open={loginLogsModal.open}
                collectorId={loginLogsModal.collectorId}
                onCancel={() =>
                    setLoginLogsdModal({
                        open: false,
                        collectorId: '',
                    })
                }
            />
        </>
    );
};

export default ReportTable;
