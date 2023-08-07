import { CheckCircleTwoTone, InfoCircleOutlined } from '@ant-design/icons';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Tooltip, Typography } from 'antd';
import Cookies from 'js-cookie';
import moment from 'moment';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router-dom';

import CopyText from '../../../shared/components/other/CopyText';
import { useEnum } from '../../../shared/constants/useEnum';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { formatPrice } from '../../../shared/utils/format/formatPrice';
import { useGetTodayCollectorListQuery } from '../../api/CollectTodayApi';
import { useLazyGetCollectTodayPhoneUrgeListQuery } from '../../api/CollectTodayPhoneUrgeApi';
import { CollectTodayPhoneUrgeListItem } from '../../api/types/getCollectTodayPhoneUrgeList';

const { Text } = Typography;

const initSearchList = {
    orderNo: '',
    appName: '',
    collectorId: '',
    followUpResult: '',
    merchantId: '',
    orderLabel: '',
    overdueDays: '',
    orderStatus: 0,
    phone: '',
    stage: '',
    userName: '',
    pageNum: 1,
    pageSize: 10,
};

const searchFormLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const searchSpan = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 8,
    xxl: 8,
};

export const TodayPhoneUrgeListTable = (): JSX.Element => {
    const { searchList, setSearchList, savePath } = usePageSearchParams({
        searchListParams: initSearchList,
    });
    const [triggerGetList, { currentData: currentTodayPhoneUrgeListResponse, isFetching: todayPhoneUrgeListFetching }] =
        useLazyGetCollectTodayPhoneUrgeListQuery({
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
        const { data } = useGetTodayCollectorListQuery(null);
        collectorData = data;
    }

    const { t } = useTranslation();
    const { OrderLabelEnum, CurrentDayOverDueStageEnum, FollowUpResultEnum, CurrentDayOrderStatusEnum } = useEnum();
    const history = useHistory();
    const location = useLocation();

    const currentPath = location.pathname;
    const isSuperAdmin = getIsSuperAdmin();

    const collectorListEnum = collectorData?.reduce((acc, current) => {
        acc.set(current.collectorId, { text: current.collectorName });
        return acc;
    }, new Map().set('', { text: t('common:noRestriction') }));

    const past24Hours = moment().subtract(24, 'hours');

    const columns: ProColumns[] = [
        {
            title: t('common:function'),
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
            initialValue: searchList.orderNo || '',
            render: (_, { orderNo }) => <CopyText text={orderNo} />,
        },
        {
            title: t('urgeCollection:appName'),
            dataIndex: 'appName',
            key: 'appName',
            initialValue: searchList.appName || '',
            render: (_, { appName }) => <CopyText text={appName} />,
        },
        {
            title: t('urgeCollection:orderLabel'),
            dataIndex: 'orderLabel',
            key: 'orderLabel',
            width: '100px',
            initialValue: searchList.orderLabel || '',
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
            initialValue: searchList.userName || '',
            render: (_, { userName }) => <CopyText text={userName} />,
        },
        {
            title: t('urgeCollection:phone'),
            dataIndex: 'phone',
            key: 'phone',
            initialValue: searchList.phone || '',
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
            initialValue: searchList.stage || '',
            valueType: 'select',
            valueEnum: { '': { text: t('common:noRestriction') }, ...CurrentDayOverDueStageEnum },
            render: (_, { stage }) => <Typography>{CurrentDayOverDueStageEnum[stage]?.text}</Typography>,
            fieldProps: {
                allowClear: false,
            },
        },
        {
            title: t('urgeCollection:overdueDays'),
            dataIndex: 'overdueDays',
            key: 'overdueDays',
            initialValue: searchList.overdueDays || '',
        },
        {
            title: t('order:orderStatus'),
            dataIndex: 'orderStatus',
            key: 'orderStatus',
            initialValue: searchList.orderStatus || 0,
            valueType: 'select',
            width: '150px',
            valueEnum: CurrentDayOrderStatusEnum,
            fieldProps: { allowClear: false },
            render: (_, { orderStatus }) => {
                const status = CurrentDayOrderStatusEnum.get(orderStatus);
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
            render: (_, { lastOpenAppTime }) => {
                const lastOpenAppTimeDateTime = lastOpenAppTime && moment(lastOpenAppTime);
                return (
                    <Typography
                        style={{
                            color: `${
                                lastOpenAppTimeDateTime && lastOpenAppTimeDateTime.isAfter(past24Hours) ? '#52C41A' : ''
                            }`,
                        }}
                    >
                        {(lastOpenAppTime && lastOpenAppTimeDateTime.format('YYYY-MM-DD HH:mm:ss')) || '-'}
                    </Typography>
                );
            },
        },
        {
            title: t('urgeCollection:latestRepaymentCodeAcquisitionTime'),
            dataIndex: 'latestRepaymentCodeAcquisitionTime',
            key: 'latestRepaymentCodeAcquisitionTime',
            hideInSearch: true,
            render: (_, { latestRepaymentCodeAcquisitionTime }) => {
                const latestRepaymentCodeAcquisitionTimeDatetime =
                    latestRepaymentCodeAcquisitionTime && moment(latestRepaymentCodeAcquisitionTime);

                return (
                    <Typography
                        style={{
                            color: `${
                                latestRepaymentCodeAcquisitionTimeDatetime &&
                                latestRepaymentCodeAcquisitionTimeDatetime.isAfter(past24Hours)
                                    ? '#52C41A'
                                    : ''
                            }`,
                        }}
                    >
                        {(latestRepaymentCodeAcquisitionTimeDatetime &&
                            latestRepaymentCodeAcquisitionTimeDatetime.format('YYYY-MM-DD HH:mm:ss')) ||
                            '-'}
                    </Typography>
                );
            },
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
            initialValue: searchList.followUpResult || '',
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
            initialValue: searchList.collectorName || '',
            hideInSearch: true,
        },
        {
            title: t('urgeCollection:collectorName'),
            dataIndex: 'collectorId',
            key: 'collectorId',
            initialValue: searchList.collectorId || '',
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
            initialValue: searchList.merchantId || '',
            hideInTable: true,
            valueType: 'select',
            valueEnum: merchantListEnum,
            fieldProps: { showSearch: true, allowClear: false },
        });
    }

    const handleClickPromote = (userId: number, orderId: number) => {
        history.push(`${currentPath}/detail/${userId}/${orderId}`);
        savePath(currentPath, `${currentPath}/detail`);
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [isSuperAdmin]);

    return (
        <ProTable<CollectTodayPhoneUrgeListItem>
            loading={todayPhoneUrgeListFetching}
            dataSource={currentTodayPhoneUrgeListResponse?.records || []}
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
                total: currentTodayPhoneUrgeListResponse?.totalRecords,
                current: currentTodayPhoneUrgeListResponse?.currentPage,
            }}
            scroll={{ x: 'auto' }}
        />
    );
};
