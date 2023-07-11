import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEnum } from '../../../shared/constants/useEnum';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import {
    useGetCollectOverDueCollectorListQuery,
    useGetCollectOverdueCollectDepartmentListQuery,
} from '../../api/CollectOverDueApi';
import { useLazyGetCollectOverdueCollectDetailQuery } from '../../api/CollectOverdueCollectDetailApi';
import { GetCollectOverdueCollectDetail } from '../../api/types/getCollectOverdueCollectDetail';
import CollectorLoginLogsModal from './CollectorLoginLogsModal';

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 8,
    xxl: 8,
};

const searchFormLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};

const ReportTable = (): JSX.Element => {
    const initDate = moment();
    const initSearchList = {
        merchantId: undefined,
        collectionDate: [initDate.format('YYYY-MM-DD'), initDate.format('YYYY-MM-DD')],
        collectTeamId: undefined,
        collectStage: undefined,
        collectId: undefined,
        pageNum: 1,
        pageSize: 10,
    };
    const [loginLogsModal, setLoginLogsModal] = useState<{ open: boolean; collector: string }>({
        open: false,
        collector: '',
    });
    const [searchList, setSearchList] = useState(initSearchList);

    const [triggerGetList, { currentData, isFetching }] = useLazyGetCollectOverdueCollectDetailQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const { data: collectorData } = useGetCollectOverDueCollectorListQuery(null);
    const { data: collectDepartments } = useGetCollectOverdueCollectDepartmentListQuery(null);
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const isSuperAdmin = getIsSuperAdmin();

    const handleShowLoginLogs = (collector: string) => {
        setLoginLogsModal({ open: true, collector: collector });
    };

    const { t } = useTranslation();
    const { OverDueStageEnum } = useEnum();

    const collectorListEnum = collectorData?.reduce((acc, current) => {
        acc.set(current.collectorId, { text: current.collectorName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const collectDepartmentsEnum = collectDepartments?.reduce((acc, current) => {
        acc.set(current.departmentId, { text: current.departmentName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const columns: ProColumns[] = [
        {
            title: t('common:function'),
            dataIndex: 'function',
            hideInSearch: true,
            render: (_, { collector }) => (
                <a onClick={() => handleShowLoginLogs(collector)}>{t('urgeCollection:loginLogs')}</a>
            ),
        },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'followUpDate',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'collectionDate',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: [t('common:startDate'), t('common:endDate')],
            },
            hideInTable: true,
            initialValue: [initDate, initDate],
        },
        {
            title: t('urgeCollection:collectionTeam'),
            dataIndex: 'collectTeam',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:collectionTeam'),
            dataIndex: 'collectTeamId',
            hideInTable: true,
            valueType: 'select',
            valueEnum: collectDepartmentsEnum,
            fieldProps: { showSearch: true, allowClear: false },
        },
        {
            title: t('urgeCollection:stage'),
            dataIndex: 'collectStage',
            valueType: 'select',
            valueEnum: { '': { text: t('common:noRestriction') }, ...OverDueStageEnum },
            fieldProps: {
                showSearch: true,
                allowClear: false,
            },
        },
        {
            title: t('urgeCollection:collector'),
            dataIndex: 'collector',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:collector'),
            dataIndex: 'collectId',
            hideInTable: true,
            valueType: 'select',
            valueEnum: collectorListEnum,
            fieldProps: { showSearch: true, allowClear: false },
        },
        {
            title: t('urgeCollection:initialLoginTime'),
            dataIndex: 'initialLoginTime',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:numberOfFollowUps'),
            dataIndex: 'followUpTimes',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:coverageRateTooltips'),
            title: t('urgeCollection:coverageRate'),
            dataIndex: 'coverageRate',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:fullRepaymentOrders'),
            dataIndex: 'fullRepaymentOrders',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:extensionCount'),
            dataIndex: 'numberOfExtensionOrders',
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
            dataIndex: 'totalNumberOfRepaymentsReceived',
            hideInSearch: true,
        },
        {
            tooltip: t('urgeCollection:orderPaymentRateTooltips'),
            title: t('urgeCollection:orderPaymentRate'),
            dataIndex: 'orderPaymentRate',
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
            dataIndex: 'paymentAmountRatio',
            hideInSearch: true,
        },
    ];
    if (isSuperAdmin) {
        columns.splice(1, 0, {
            title: t('urgeCollection:merchantName'),
            dataIndex: 'merchantName',
            hideInSearch: true,
        });
        columns.splice(2, 0, {
            title: t('urgeCollection:merchantName'),
            dataIndex: 'merchantId',
            hideInTable: true,
            valueType: 'select',
            valueEnum: merchantListEnum,
            fieldProps: { showSearch: true, allowClear: false },
        });
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    useEffect(() => {
        const queryParameters = {
            collectId: searchList.collectId,
            collectStage: searchList.collectStage,
            collectTeamId: searchList.collectTeamId,
            merchantId: searchList.merchantId,
            pageNum: searchList.pageNum,
            pageSize: searchList.pageSize,
            startTime: searchList.collectionDate[0],
            endTime: searchList.collectionDate[1],
        };
        triggerGetList(queryParameters);
    }, [searchList]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [isSuperAdmin]);

    return (
        <>
            <ProTable<GetCollectOverdueCollectDetail>
                loading={isFetching}
                columns={columns}
                rowKey={(record) => record.collector + record.collectStage}
                dataSource={currentData?.records?.records || []}
                form={{ ...searchFormLayout }}
                search={{
                    span: searchSpan,
                    labelWidth: 'auto',
                    optionRender: ({ resetText }, { form }) => [
                        <Space>
                            <Button
                                onClick={() => {
                                    form.setFieldsValue({ ...initSearchList });
                                    setSearchList(initSearchList);
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
                    setSearchList({
                        ...searchList,
                        ...params,
                    });
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10,
                    onChange: pageOnChange,
                    total: currentData?.records?.totalRecords,
                    current: currentData?.records?.records?.length === 0 ? 1 : currentData?.records?.currentPage,
                }}
            />
            <CollectorLoginLogsModal
                open={loginLogsModal.open}
                collector={loginLogsModal.collector}
                onCancel={() =>
                    setLoginLogsModal({
                        open: false,
                        collector: '',
                    })
                }
            />
        </>
    );
};

export default ReportTable;
