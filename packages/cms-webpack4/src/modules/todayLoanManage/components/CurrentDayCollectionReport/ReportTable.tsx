import { ColumnsState, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space, Table } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEnum } from '../../../shared/constants/useEnum';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { useGetCollectTodayCollectDepartmentListQuery, useGetTodayCollectorListQuery } from '../../api/CollectTodayApi';
import { useLazyGetCollectTodayCollectDetailQuery } from '../../api/CollectTodayCollectDetailApi';
import { GetCollectTodayCollectDetail } from '../../api/types/getCollectTodayCollectDetail';
import CollectorLoginLogsModal from './CollectorLoginLogsModal';

const { Summary } = Table;
const { Row, Cell } = Summary;

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
    wrapperCol: { span: 1824 },
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

    const [triggerGetList, { currentData, isFetching }] = useLazyGetCollectTodayCollectDetailQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const { data: collectorData } = useGetTodayCollectorListQuery(null);
    const { data: collectDepartments } = useGetCollectTodayCollectDepartmentListQuery(null);
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const isSuperAdmin = getIsSuperAdmin();

    const handleShowLoginLogs = (collector: string) => {
        setLoginLogsModal({ open: true, collector: collector });
    };

    const { t } = useTranslation();
    const { CurrentDayOverDueStageEnum } = useEnum();

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
            valueEnum: { '': { text: t('common:noRestriction') }, ...CurrentDayOverDueStageEnum },
            render: (_, { collectStage }) => CurrentDayOverDueStageEnum[collectStage]?.text,
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

    const initColumnStateMap = columns.reduce(
        (acc, current) => ({
            ...acc,
            [`${current.dataIndex}`]: { show: !current.hideInTable },
        }),
        {},
    ) as Record<string, ColumnsState>;

    const [columnStateMap, setColumnStateMap] = useState(initColumnStateMap);

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
            <ProTable<GetCollectTodayCollectDetail>
                loading={isFetching}
                columns={columns}
                rowKey={(record) => record.collector + record.collectStage}
                dataSource={currentData?.records?.records || []}
                form={{ ...searchFormLayout }}
                options={{
                    setting: { listsHeight: 400, draggable: false },
                    reload: () => triggerGetList(searchList),
                }}
                search={{
                    span: searchSpan,
                    labelWidth: 'auto',
                    optionRender: ({ resetText }, { form }) => [
                        <Space>
                            <Button
                                onClick={() => {
                                    form.setFieldsValue(initSearchList);
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
                columnsState={{
                    onChange: (columnStateMap) => setColumnStateMap(columnStateMap),
                }}
                summary={() => (
                    <Summary>
                        <Row style={{ fontWeight: 'bold', background: '#fafafa' }}>
                            {columnStateMap.function.show && <Cell index={0}>{t('common:currentPageTotal')}</Cell>}
                            {columnStateMap.followUpDate.show && <Cell index={1} />}
                            {columnStateMap.collectTeam.show && <Cell index={2} />}
                            {columnStateMap.collectStage.show && <Cell index={3} />}
                            {columnStateMap.collector.show && (
                                <Cell index={4}>{currentData?.statistics?.collector}</Cell>
                            )}
                            {columnStateMap.initialLoginTime.show && <Cell index={5} />}
                            {columnStateMap.followUpTimes.show && <Cell index={6} />}
                            {columnStateMap.coverageRate.show && <Cell index={7} />}
                            {columnStateMap.fullRepaymentOrders.show && (
                                <Cell index={8}>{currentData?.statistics?.fullRepaymentOrders}</Cell>
                            )}
                            {columnStateMap.numberOfExtensionOrders.show && (
                                <Cell index={9}>{currentData?.statistics?.numberOfExtensionOrders}</Cell>
                            )}
                            {columnStateMap.extensionRate.show && (
                                <Cell index={10}>{currentData?.statistics?.extensionRate}</Cell>
                            )}
                            {columnStateMap.totalNumberOfRepaymentsReceived.show && (
                                <Cell index={11}>{currentData?.statistics?.totalNumberOfRepaymentsReceived}</Cell>
                            )}
                            {columnStateMap.orderPaymentRate.show && (
                                <Cell index={12}>{currentData?.statistics?.orderPaymentRate}</Cell>
                            )}
                            {columnStateMap.receiptAmount.show && (
                                <Cell index={13}>{currentData?.statistics?.receiptAmount}</Cell>
                            )}
                            {columnStateMap.followUpAmount.show && (
                                <Cell index={14}>{currentData?.statistics?.followUpAmount}</Cell>
                            )}
                            {columnStateMap.paymentAmountRatio.show && (
                                <Cell index={15}>{currentData?.statistics?.paymentAmountRatio}</Cell>
                            )}
                        </Row>
                    </Summary>
                )}
            />
            {loginLogsModal.open && (
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
            )}
        </>
    );
};

export default ReportTable;
