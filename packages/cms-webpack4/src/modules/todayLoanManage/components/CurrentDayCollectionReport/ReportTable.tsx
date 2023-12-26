import { ColumnsState, ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import { Button, Space, Table } from 'antd';
import i18next from 'i18next';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEnum } from '../../../shared/constants/useEnum';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { useGetCollectTodayCollectTeamListQuery, useGetTodayCollectorListQuery } from '../../api/CollectTodayApi';
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

    const [triggerGetList, { currentData, isFetching }] = useLazyGetCollectTodayCollectDetailQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const { data: collectorData } = useGetTodayCollectorListQuery(null);
    const { data: collectTeams } = useGetCollectTodayCollectTeamListQuery(null);
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const isSuperAdmin = getIsSuperAdmin();

    const formRef = useRef<ProFormInstance>();

    const handleShowLoginLogs = (collector: string) => {
        setLoginLogsModal({ open: true, collector: collector });
    };

    const { t } = useTranslation();
    const { CurrentDayOverDueStageEnum, TotalOverdueStageEnum } = useEnum();

    const collectorListEnum = collectorData?.reduce((acc, current) => {
        acc.set(current.collectorId, { text: current.collectorName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const collectTeamsEnum = collectTeams?.reduce((acc, current) => {
        acc.set(current.collectId, { text: current.collectTeamName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const columns: ProColumns[] = [
        {
            title: t('common:function'),
            dataIndex: 'function',
            hideInSearch: true,
            width: 100,
            render: (_, { collector }) => (
                <a onClick={() => handleShowLoginLogs(collector)}>{t('urgeCollection:loginLogs')}</a>
            ),
            fixed: 'left',
        },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'followUpDate',
            hideInSearch: true,
            width: 100,
        },
        {
            title: t('urgeCollection:followUpDate'),
            dataIndex: 'collectionDate',
            valueType: 'dateRange',
            fieldProps: {
                placeholder: [t('common:startDate'), t('common:endDate')],
                allowClear: false,
            },
            hideInTable: true,
            initialValue: [initDate, initDate],
        },
        {
            title: t('urgeCollection:collectionTeam'),
            dataIndex: 'collectTeam',
            hideInSearch: true,
            width: 100,
        },
        {
            title: t('urgeCollection:collectionTeam'),
            dataIndex: 'collectTeamId',
            hideInTable: true,
            valueType: 'select',
            valueEnum: collectTeamsEnum,
            fieldProps: { showSearch: true, allowClear: false },
        },
        {
            title: t('urgeCollection:stage'),
            dataIndex: 'collectStage',
            width: 100,
            valueType: 'select',
            valueEnum: { '': { text: t('common:noRestriction') }, ...CurrentDayOverDueStageEnum },
            render: (_, { collectStage }) => TotalOverdueStageEnum[collectStage]?.text,
            fieldProps: {
                showSearch: true,
                allowClear: false,
            },
        },
        {
            title: t('urgeCollection:collector'),
            dataIndex: 'collector',
            hideInSearch: true,
            width: 100,
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
            width: 100,
        },
        {
            title: t('urgeCollection:numberOfFollowUps'),
            dataIndex: 'numberOfFollowUps',
            hideInSearch: true,
            width: 100,
        },
        {
            title: t('urgeCollection:followUpTimes'),
            dataIndex: 'followUpTimes',
            hideInSearch: true,
            width: 100,
        },
        {
            title: t('urgeCollection:numberOfOrderCount'),
            dataIndex: 'numberOfOrderCount',
            hideInSearch: true,
            width: 100,
        },
        {
            tooltip: t('urgeCollection:coverageRateTooltips'),
            title: t('urgeCollection:coverageRate'),
            dataIndex: 'coverageRate',
            hideInSearch: true,
            width: 100,
            render: (_, { coverageRate }) => ({
                props: {
                    style: {
                        background: '#FAFAFA',
                    },
                },
                children: coverageRate,
            }),
        },
        {
            title: t('urgeCollection:fullRepaymentOrders'),
            dataIndex: 'fullRepaymentOrders',
            hideInSearch: true,
            width: 100,
        },
        {
            title: t('urgeCollection:extensionCount'),
            dataIndex: 'numberOfExtensionOrders',
            hideInSearch: true,
            width: 100,
        },
        {
            tooltip: t('urgeCollection:extensionRateTooltips'),
            title: t('urgeCollection:extensionRate'),
            dataIndex: 'extensionRate',
            hideInSearch: true,
            width: 100,
            render: (_, { extensionRate }) => ({
                props: {
                    style: {
                        background: '#FAFAFA',
                    },
                },
                children: extensionRate,
            }),
        },
        {
            tooltip: t('urgeCollection:totalReceivedCountTooltips'),
            title: t('urgeCollection:totalReceivedCount'),
            dataIndex: 'totalNumberOfRepaymentsReceived',
            hideInSearch: true,
            width: 100,
        },
        {
            tooltip: t('urgeCollection:orderPaymentRateTooltips'),
            title: t('urgeCollection:orderPaymentRate'),
            dataIndex: 'orderPaymentRate',
            hideInSearch: true,
            width: 100,
            render: (_, { orderPaymentRate }) => ({
                props: {
                    style: {
                        background: '#FAFAFA',
                    },
                },
                children: orderPaymentRate,
            }),
        },
        {
            title: t('urgeCollection:receiptAmount'),
            dataIndex: 'receiptAmount',
            hideInSearch: true,
            width: 100,
            render: (_, { receiptAmount }) => receiptAmount?.toLocaleString(),
        },
        {
            title: t('urgeCollection:followUpAmount'),
            dataIndex: 'followUpAmount',
            hideInSearch: true,
            width: 100,
            render: (_, { followUpAmount }) => followUpAmount?.toLocaleString(),
        },
        {
            tooltip: t('urgeCollection:paymentAmountRateTooltips'),
            title: t('urgeCollection:paymentAmountRate'),
            dataIndex: 'paymentAmountRatio',
            hideInSearch: true,
            width: 100,
            render: (_, { paymentAmountRatio }) => ({
                props: {
                    style: {
                        background: '#FAFAFA',
                    },
                },
                children: paymentAmountRatio,
            }),
        },
        {
            title: t('urgeCollection:numberOfRepeatLoans'),
            dataIndex: 'numberOfRepeatLoans',
            hideInSearch: true,
            width: 100,
        },
        {
            tooltip: t('urgeCollection:repeatLoansRateTooltips'),
            title: t('urgeCollection:repeatLoansRate'),
            dataIndex: 'numberOfRepeatLoansRate',
            hideInSearch: true,
            width: 100,
            render: (_, { paymentAmountRatio }) => ({
                props: {
                    style: {
                        background: '#FAFAFA',
                    },
                },
                children: paymentAmountRatio,
            }),
        },
    ];
    if (isSuperAdmin) {
        columns.splice(1, 0, {
            title: t('urgeCollection:merchantName'),
            dataIndex: 'merchantName',
            hideInSearch: true,
            width: 100,
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

    const handelExport = () => {
        const { collectionDate, ...rest } = formRef.current.getFieldsFormatValue();
        const searchQueryString = queryString.stringify({
            ...rest,
            startTime: collectionDate[0],
            endTime: collectionDate[1],
        });
        window.open(`hs/admin/collect-today/collect-detail/download?${searchQueryString}`);
        setSearchList({
            ...searchList,
            ...rest,
            collectionDate,
        });
    };

    useEffect(() => {
        const { collectionDate, ...rest } = searchList;
        triggerGetList({
            ...rest,
            startTime: collectionDate[0],
            endTime: collectionDate[1],
        });
    }, [searchList]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [isSuperAdmin]);

    return (
        <>
            <ProTable<GetCollectTodayCollectDetail>
                formRef={formRef}
                loading={isFetching}
                columns={columns}
                rowKey={(record) =>
                    (record.collector || '') + (record.collectStage || '') + (record.followUpDate || '')
                }
                dataSource={currentData?.records?.records || []}
                form={{ ...searchFormLayout }}
                options={{
                    setting: { listsHeight: 400, draggable: false },
                    reload: () => triggerGetList(searchList),
                }}
                search={{
                    span: i18next.language === 'en-US' ? { ...searchSpan, xl: 12, xxl: 12 } : searchSpan,
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
                            {columnStateMap.function.show && (
                                <Cell index={0} className="summary-cell">
                                    {t('common:currentPageTotal')}
                                </Cell>
                            )}
                            {columnStateMap.merchantName?.show && isSuperAdmin && <Cell index={1} />}
                            {columnStateMap.followUpDate.show && <Cell index={2} />}
                            {columnStateMap.collectTeam.show && <Cell index={3} />}
                            {columnStateMap.collectStage.show && <Cell index={4} />}
                            {columnStateMap.collector.show && (
                                <Cell index={5}>{currentData?.statistics?.collector}</Cell>
                            )}
                            {columnStateMap.initialLoginTime.show && <Cell index={6} />}
                            {columnStateMap.numberOfFollowUps.show && (
                                <Cell index={7}>{currentData?.statistics?.numberOfFollowUps}</Cell>
                            )}
                            {columnStateMap.numberOfFollowUps.show && <Cell index={8} />}
                            {columnStateMap.numberOfOrderCount.show && <Cell index={9} />}
                            {columnStateMap.coverageRate.show && <Cell index={10} />}
                            {columnStateMap.fullRepaymentOrders.show && (
                                <Cell index={11}>{currentData?.statistics?.fullRepaymentOrders}</Cell>
                            )}
                            {columnStateMap.numberOfExtensionOrders.show && (
                                <Cell index={12}>{currentData?.statistics?.numberOfExtensionOrders}</Cell>
                            )}
                            {columnStateMap.extensionRate.show && (
                                <Cell index={13}>{currentData?.statistics?.extensionRate}</Cell>
                            )}
                            {columnStateMap.totalNumberOfRepaymentsReceived.show && (
                                <Cell index={14}>{currentData?.statistics?.totalNumberOfRepaymentsReceived}</Cell>
                            )}
                            {columnStateMap.orderPaymentRate.show && (
                                <Cell index={15}>{currentData?.statistics?.orderPaymentRate}</Cell>
                            )}
                            {columnStateMap.receiptAmount.show && (
                                <Cell index={16}>{currentData?.statistics?.receiptAmount?.toLocaleString()}</Cell>
                            )}
                            {columnStateMap.followUpAmount.show && (
                                <Cell index={17}>{currentData?.statistics?.followUpAmount?.toLocaleString()}</Cell>
                            )}
                            {columnStateMap.paymentAmountRatio.show && (
                                <Cell index={18}>{currentData?.statistics?.paymentAmountRatio}</Cell>
                            )}
                            {columnStateMap.numberOfRepeatLoans.show && (
                                <Cell index={19}>{currentData?.statistics?.numberOfRepeatLoans}</Cell>
                            )}
                            {columnStateMap.numberOfRepeatLoansRate.show && (
                                <Cell index={20}>{currentData?.statistics?.numberOfRepeatLoansRate}</Cell>
                            )}
                        </Row>
                    </Summary>
                )}
                toolBarRender={() => [
                    <Button onClick={handelExport} type="primary">
                        {t('common:export')}
                    </Button>,
                ]}
                sticky={{
                    offsetHeader: -20,
                }}
                scroll={{
                    x: 1,
                }}
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
