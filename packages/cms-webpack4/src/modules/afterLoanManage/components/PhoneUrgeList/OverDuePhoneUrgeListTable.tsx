import { CheckCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import { useEnum } from '../../../shared/constants/useEnum';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { formatPrice } from '../../../shared/utils/format/formatPrice';
import { useGetCollectOverDueCollectorListQuery } from '../../api/CollectOverDueApi';
import { useLazyGetCollectOverDuePhoneUrgeListQuery } from '../../api/OverDuePhoneUrgeApi';
import { CollectOverDuePhoneUrgeListItem } from '../../api/types/getCollectOverDuePhoneUrgeList';

const { Text } = Typography;

const initSearchList = {
    orderNo: '',
    appName: '',
    collectorId: '',
    followUpResult: '',
    merchantId: '',
    orderLabel: '',
    overdueDays: '',
    orderStatus: '',
    phone: '',
    stage: '',
    userName: '',
    pageNum: 1,
    pageSize: 10,
};

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

export const OverDuePhoneUrgeListTable = (): JSX.Element => {
    const { searchList, searchParams, setSearchList, handleToDetailPage } = usePageSearchParams({
        searchListParams: initSearchList,
    });
    const [initialSearchParams, setInitialSearchParams] = useState(searchParams);
    const [triggerGetList, { currentData: overDuePhoneUrgeListResponse, isFetching: overDuePhoneUrgeListFetching }] =
        useLazyGetCollectOverDuePhoneUrgeListQuery({
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: false,
        });
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();

    // 一般催收人員不取得催收員列表
    const loginInfo = JSON.parse(Cookies.get('adminUser'));
    const { roleId } = loginInfo['data'];
    const ableToGetCollectorList = ![15].includes(roleId);

    let collectorData = undefined;

    if (ableToGetCollectorList) {
        const { data } = useGetCollectOverDueCollectorListQuery(null);
        collectorData = data;
    }

    const { t } = useTranslation();
    const { OrderLabelEnum, OverDueStageEnum, FollowUpResultEnum, OverDueOrderStatusEnum } = useEnum();
    const history = useHistory();
    const location = useLocation();

    const currentPath = location.pathname;
    const isSuperAdmin = getIsSuperAdmin();

    const collectorListEnum = collectorData?.reduce((acc, current) => {
        acc.set(current.collectorId, { text: current.collectorName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const columns: ProColumns[] = [
        {
            title: t('function'),
            key: 'operate',
            valueType: 'option',
            render: (_, record) => {
                return (
                    <a key="editable" onClick={() => handleClickPromote(record.userId, record.collectId)}>
                        {t('urgeCollection:followUp')}
                    </a>
                );
            },
        },
        {
            title: t('urgeCollection:orderNo'),
            dataIndex: 'orderNo',
            key: 'orderNo',
            initialValue: searchParams.orderNo || '',
        },
        {
            title: t('urgeCollection:appName'),
            dataIndex: 'appName',
            key: 'appName',
            initialValue: searchParams.appName || '',
        },
        {
            title: t('urgeCollection:orderLabel'),
            dataIndex: 'orderLabel',
            key: 'orderLabel',
            initialValue: searchParams.orderLabel || '',
            valueType: 'select',
            valueEnum: OrderLabelEnum,
            fieldProps: { allowClear: false },
            render: (_, { orderLabel }) => {
                const orderLabelStatus = OrderLabelEnum[orderLabel];
                return (
                    <div style={{ textAlign: 'center' }}>
                        {orderLabelStatus ? <Tag color={orderLabelStatus?.color}>{orderLabelStatus?.text}</Tag> : '-'}
                    </div>
                );
            },
        },
        {
            title: t('urgeCollection:userName'),
            dataIndex: 'userName',
            key: 'userName',
            initialValue: searchParams.userName || '',
        },
        {
            title: t('urgeCollection:phone'),
            dataIndex: 'phone',
            key: 'phone',
            initialValue: searchParams.phone || '',
            render: (_, { phone }) => (
                <Typography>
                    {phone.substring(0, 3) + '*'.repeat(phone.length - 6) + phone.substring(phone.length - 3)}
                </Typography>
            ),
        },
        {
            title: t('urgeCollection:stage'),
            dataIndex: 'stage',
            key: 'stage',
            width: '100px',
            ellipsis: true,
            initialValue: searchParams.stage || '',
            valueType: 'select',
            valueEnum: { '': { text: t('noRestriction') }, ...OverDueStageEnum },
            render: (_, { stage }) => <Typography>{OverDueStageEnum[stage]?.text}</Typography>,
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: t('urgeCollection:overdueDays'),
            dataIndex: 'overdueDays',
            key: 'overdueDays',
            initialValue: searchParams.overdueDays || '',
        },
        {
            title: t('order:orderStatus'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            initialValue: searchParams.orderStatus || '',
            valueType: 'select',
            width: '100px',
            valueEnum: OverDueOrderStatusEnum,
            fieldProps: { allowClear: false },
            render: (_, { orderStatus }) => {
                const status = OverDueOrderStatusEnum.get(orderStatus);
                return (
                    <div style={{ textAlign: 'center' }}>
                        {status ? <Tag color={status?.color}>{status?.text}</Tag> : '-'}
                    </div>
                );
            },
        },
        {
            title: t('urgeCollection:outstandingBalance'),
            dataIndex: 'outstandingBalance',
            key: 'outstandingBalance',
            hideInSearch: true,
            render: (_, { outstandingBalance }) => (
                <Typography>{formatPrice(Number(outstandingBalance) || 0)}</Typography>
            ),
        },
        {
            title: t('urgeCollection:lastOpenAppTime'),
            dataIndex: 'lastOpenAppTime',
            key: 'lastOpenAppTime',
            hideInSearch: true,
            render: (_, { lastOpenAppTime }) => (
                <Typography>
                    {(lastOpenAppTime && moment(lastOpenAppTime).format('YYYY-MM-DD HH:mm:ss')) || '-'}
                </Typography>
            ),
        },
        {
            title: t('urgeCollection:latestRepaymentCodeAcquisitionTime'),
            dataIndex: 'latestRepaymentCodeAcquisitionTime',
            key: 'latestRepaymentCodeAcquisitionTime',
            hideInSearch: true,
            render: (_, { latestRepaymentCodeAcquisitionTime }) => (
                <Typography>
                    {(latestRepaymentCodeAcquisitionTime &&
                        moment(latestRepaymentCodeAcquisitionTime).format('YYYY-MM-DD HH:mm:ss')) ||
                        '-'}
                </Typography>
            ),
        },
        {
            title: t('urgeCollection:followUpCount'),
            dataIndex: 'followUpCount',
            key: 'followUpCount',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:contactable'),
            dataIndex: 'contactable',
            key: 'contactable',
            hideInSearch: true,
            render: (_, { contactable }) =>
                contactable ? (
                    <div style={{ textAlign: 'center' }}>
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </div>
                ) : null,
        },
        {
            title: t('urgeCollection:followUpResult'),
            dataIndex: 'followUpResult',
            key: 'followUpResult',
            initialValue: searchParams.followUpResult || '',
            valueType: 'select',
            valueEnum: FollowUpResultEnum,
            render: (_, { followUpResult }) => {
                const followUpResultStatus = FollowUpResultEnum[followUpResult];
                return <Text style={{ color: followUpResultStatus?.color }}>{followUpResultStatus?.text}</Text>;
            },
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: () => (
                <div>
                    {t('urgeCollection:ptpTime')}{' '}
                    <Tooltip title={<div style={{ whiteSpace: 'pre-line' }}>{t('urgeCollection:ptpTimeTooltip')}</div>}>
                        <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                    </Tooltip>
                </div>
            ),
            dataIndex: 'ptpTime',
            key: 'ptpTime',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:trackingRecord'),
            dataIndex: 'trackingRecord',
            key: 'trackingRecord',
            width: '200px',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:recentTrackingTime'),
            dataIndex: 'recentTrackingTime',
            key: 'recentTrackingTime',
            hideInSearch: true,
            render: (_, { recentTrackingTime }) => (
                <Typography>
                    {(recentTrackingTime && moment(recentTrackingTime).format('YYYY-MM-DD HH:mm:ss')) || '-'}
                </Typography>
            ),
        },
        {
            title: t('urgeCollection:collectorName'),
            dataIndex: 'collectorName',
            key: 'collectorName',
            initialValue: searchParams.collectorName || '',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:collectorName'),
            dataIndex: 'collectorId',
            key: 'collectorId',
            initialValue: searchParams.collectorId || '',
            hideInSearch: !ableToGetCollectorList,
            hideInTable: true,
            valueType: 'select',
            valueEnum: collectorListEnum,
            fieldProps: { showSearch: true, allowClear: false },
        },
    ];
    if (isSuperAdmin) {
        columns.splice(1, 0, {
            title: t('urgeCollection:merchantName'),
            dataIndex: 'merchantName',
            key: 'merchantName',
            hideInSearch: true,
        });
        columns.splice(2, 0, {
            title: t('urgeCollection:merchantName'),
            dataIndex: 'merchantId',
            key: 'merchantId',
            initialValue: searchParams.merchantId || '',
            hideInTable: true,
            valueType: 'select',
            valueEnum: merchantListEnum,
            fieldProps: { showSearch: true, allowClear: false },
        });
    }

    const handleClickPromote = (userId: number, orderId: number) => {
        history.push(`${currentPath}/detail/${userId}/${orderId}`);
        handleToDetailPage(`${currentPath}/detail`, currentPath);
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    useEffect(() => {
        if (Object.keys(initialSearchParams).length === 0) {
            triggerGetList(searchList);
        } else if (JSON.stringify(initialSearchParams) === JSON.stringify(searchList)) {
            triggerGetList(searchList);
            setInitialSearchParams({});
        }
    }, [searchList]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [isSuperAdmin]);

    return (
        <ProTable<CollectOverDuePhoneUrgeListItem>
            loading={overDuePhoneUrgeListFetching}
            dataSource={overDuePhoneUrgeListResponse?.records || []}
            columns={columns}
            rowKey="collectId"
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
                const { collectorId, merchantId, overdueDays, ...restField } = params;
                setSearchList({
                    ...searchList,
                    ...restField,
                    collectorId: collectorId ? Number(collectorId) : undefined,
                    merchantId: merchantId ? Number(merchantId) : undefined,
                    overdueDays: overdueDays ? Number(overdueDays) : undefined,
                });
            }}
            form={{ ...searchFormLayout }}
            options={{
                reload: () => triggerGetList(searchList),
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: overDuePhoneUrgeListResponse?.totalRecords,
                current:
                    overDuePhoneUrgeListResponse?.records?.length === 0 ? 1 : overDuePhoneUrgeListResponse?.currentPage,
            }}
        />
    );
};
