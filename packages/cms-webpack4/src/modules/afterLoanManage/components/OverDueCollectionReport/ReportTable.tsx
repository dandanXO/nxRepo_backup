import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
};

const ReportTable = (): JSX.Element => {
    const initSearchList = {
        merchantId: '',
        followUpDateStart: moment().format('YYYY-MM_DD'),
        followUpDateEnd: moment().format('YYYY-MM_DD'),
        collectorTame: '',
        stage: '',
        collectorId: '',
    };

    const { searchList, searchParams, setSelectedList, handleToDetailPage } = usePageSearchParams({
        searchListParams: initSearchList,
    });
    const [initialSearchParams, setInitialSearchParams] = useState(searchParams);

    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();

    const handleShowLoginLogs = (recordId: string) => {
        console.log(recordId);
    };

    const { t } = useTranslation();

    const mockData = [
        {
            id: '001',
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
            render: (_, record) => (
                <a onClick={() => handleShowLoginLogs(record.id)}>{t('urgeCollection:loginLogs')}</a>
            ),
        },
        { title: t('urgeCollection:merchantName'), dataIndex: 'merchantName' },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'collectionDate',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: [t('common:startDate'), t('common:endDate')],
            },
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

    return (
        <ProTable
            columns={columns}
            rowKey="id"
            dataSource={mockData}
            search={{
                span: searchSpan,
                labelWidth: 'auto',
                optionRender: ({ resetText }, { form }) => [
                    <Space>
                        <Button
                            onClick={() => {
                                // form.setFieldsValue({ ...initSearchList });
                                // setSearchList(initSearchList);
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
    );
};

export default ReportTable;
