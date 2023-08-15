import { ExclamationCircleOutlined } from '@ant-design/icons';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space, Tag, Tooltip } from 'antd';
import { Key } from 'antd/es/table/interface';
import moment from 'moment';
import queryString from 'query-string';
import { useEffect, useRef, useState } from 'react';

import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import useGetChannelEnum from '../../../shared/hooks/useGetChannelEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { useLazyGetNewCustomersDailyConversionRatesQuery } from '../../api/NewCustomersDailyConversionRatesApi';
import {
    GetNewCustomersDailyConversionRatesRequestQuerystring,
    NewCustomersDailyConversionRates,
} from '../../api/types/NewCustomersDailyConversionRatesTypes/getNewCustomersDailyConversionRates';

const { CheckableTag } = Tag;
const NewCustomersDailyConversionRatesTable = (): JSX.Element => {
    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    // api
    const [triggerGetList, { currentData, isFetching }] = useLazyGetNewCustomersDailyConversionRatesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });

    const initDayRange = [moment().subtract(6, 'days'), moment()];
    const initSearchList: GetNewCustomersDailyConversionRatesRequestQuerystring = {
        channelId: '',
        endTime: initDayRange[1].format('YYYY-MM-DD 23:59:59'),
        merchantId: '',
        startTime: initDayRange[0].format('YYYY-MM-DD 00:00:00'),
        size: 10,
        page: 0,
    };

    // state
    const [searchList, setSearchList] = useState<GetNewCustomersDailyConversionRatesRequestQuerystring>(initSearchList);

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
        triggerGetChannelList(null);
    }, [isSuperAdmin]);

    const CustomColumn = ({ text, rate = '百分比' }) => {
        return (
            <div>
                <div>{text}</div>
                <div>({rate})</div>
            </div>
        );
    };

    const columns: ProColumns<NewCustomersDailyConversionRates>[] = [
        {
            title: '日期',
            dataIndex: 'dateRange',
            key: 'dateRange',
            valueType: 'dateRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] },
            hideInTable: true,
            initialValue: initDayRange,
        },
        { title: '日期', dataIndex: 'day', key: 'day', hideInSearch: true },
        {
            title: '渠道来源',
            dataIndex: 'channelId',
            key: 'channelId',
            hideInTable: true,
            initialValue: '',
            valueType: 'select',
            valueEnum: channelListEnum,
            fieldProps: { showSearch: true },
        },
    ];

    if (isSuperAdmin) {
        columns.splice(0, 0, {
            title: '商户名',
            dataIndex: 'merchantId',
            key: 'merchantId',
            hideInTable: true,
            initialValue: '',
            valueType: 'select',
            valueEnum: merchantListEnum,
            fieldProps: { showSearch: true },
        });
    }

    const customColumns: ProColumns<NewCustomersDailyConversionRates>[] = [
        { title: 'OTP发送量', dataIndex: 'otpCount', key: 'otpCount', hideInSearch: true },
        {
            title: <CustomColumn text={'注册量'} />,
            dataIndex: 'registerCount',
            key: 'registerCount',
            hideInSearch: true,
            tooltip: '注册百分比=注册量/短信发送数',
            render: (text, { registerRate }) => <CustomColumn text={text} rate={registerRate} />,
        },
        {
            title: '使用者授权认证',
            dataIndex: 'authorization',
            key: 'authorization',
            hideInSearch: true,
            children: [
                {
                    title: <CustomColumn text={'相冊'} />,
                    dataIndex: 'photoCount',
                    key: 'photoCount',
                    hideInSearch: true,
                    render: (text, { photoCountRate }) => <CustomColumn text={text} rate={photoCountRate} />,
                },
                {
                    title: <CustomColumn text={'通讯录'} />,
                    dataIndex: 'contactCount',
                    key: 'contactCount',
                    hideInSearch: true,
                    render: (text, { contactRate }) => <CustomColumn text={text} rate={contactRate} />,
                },
                {
                    title: <CustomColumn text={'AppList'} />,
                    dataIndex: 'appsCount',
                    key: 'appsCount',
                    hideInSearch: true,
                    render: (text, { appsCountRate }) => <CustomColumn text={text} rate={appsCountRate} />,
                },
                {
                    title: <CustomColumn text={'短信通话'} />,
                    dataIndex: 'cdrCount',
                    key: 'cdrCount',
                    hideInSearch: true,
                    render: (text, { cdrCountRate }) => <CustomColumn text={text} rate={cdrCountRate} />,
                },
            ],
        },
        {
            title: '使用者操作认证',
            dataIndex: 'operation',
            key: 'operation',
            hideInSearch: true,
            children: [
                {
                    title: <CustomColumn text={'实名认证'} />,
                    dataIndex: 'idCardCount',
                    key: 'idCardCount',
                    hideInSearch: true,
                    render: (text, { idCardRate }) => <CustomColumn text={text} rate={idCardRate} />,
                },
                {
                    title: <CustomColumn text={'紧急联系人'} />,
                    dataIndex: 'authCount',
                    key: 'authCount',
                    hideInSearch: true,
                    render: (text, { authRate }) => <CustomColumn text={text} rate={authRate} />,
                },
                {
                    title: <CustomColumn text={'Face ID'} />,
                    dataIndex: 'livenessCount',
                    key: 'livenessCount',
                    hideInSearch: true,
                    render: (text, { livenessCountRate }) => <CustomColumn text={text} rate={livenessCountRate} />,
                },
                {
                    title: <CustomColumn text={'绑卡认证'} />,
                    dataIndex: 'bankCount',
                    key: 'bankCount',
                    hideInSearch: true,
                    render: (text, { bankRate }) => <CustomColumn text={text} rate={bankRate} />,
                },
            ],
        },
        {
            title: '完成认证',
            dataIndex: 'allCertified',
            key: 'allCertified',
            hideInSearch: true,
            children: [
                {
                    title: <CustomColumn text={'完成认证用户数'} />,
                    dataIndex: 'allCertifiedCount',
                    key: 'allCertifiedCount',
                    hideInSearch: true,
                    render: (text, { allCertifiedRate }) => <CustomColumn text={text} rate={allCertifiedRate} />,
                },
            ],
        },
        {
            title: '提交',
            dataIndex: 'submit',
            key: 'submit',
            hideInSearch: true,
            children: [
                {
                    title: <CustomColumn text={'提交用户数'} />,
                    dataIndex: 'submitOrderUserCount',
                    key: 'submitOrderUserCount',
                    tooltip: '提交用户数包含内部风控通过以及包含内部风控不通过',
                    hideInSearch: true,
                    render: (text, { submitOrderUserRate }) => <CustomColumn text={text} rate={submitOrderUserRate} />,
                },
            ],
        },
        {
            title: '风控',
            dataIndex: 'riskControl',
            key: 'riskControl',
            hideInSearch: true,
            children: [
                {
                    title: <CustomColumn text={'内部风控通过'} />,
                    dataIndex: 'innerRiskControlPassCount',
                    key: 'innerRiskControlPassCount',
                    tooltip: '内部风控通过数包含有提交的用户以及没有提交的用户',
                    hideInSearch: true,
                    render: (text, { innerRiskControlPassRate }) => (
                        <CustomColumn text={text} rate={innerRiskControlPassRate} />
                    ),
                },
                {
                    title: <CustomColumn text={'外部风控用户数'} />,
                    dataIndex: 'riskControlUserCount',
                    key: 'riskControlUserCount',
                    hideInSearch: true,
                    render: (text, { riskControlUserRate }) => <CustomColumn text={text} rate={riskControlUserRate} />,
                },
                {
                    title: <CustomColumn text={'外部风控通过'} />,
                    dataIndex: 'outerRiskControlPassCount',
                    key: 'outerRiskControlPassCount',
                    tooltip: '提交订单后且通过的用户数',
                    hideInSearch: true,
                    render: (text, { outerRiskControlPassRate }) => (
                        <CustomColumn text={text} rate={outerRiskControlPassRate} />
                    ),
                },
            ],
        },
        {
            title: '贷前统计',
            dataIndex: 'preLoan',
            key: 'preLoan',
            hideInSearch: true,
            children: [
                { title: '订单申请用户数', dataIndex: 'applyUserCount', key: 'applyUserCount', hideInSearch: true },
                { title: '订单申请量', dataIndex: 'applyCount', key: 'applyCount', hideInSearch: true },
                {
                    title: '申请转化率',
                    dataIndex: 'applyRate',
                    key: 'applyRate',
                    hideInSearch: true,
                    tooltip: '申请转化率=订单申请量/注册量',
                },
            ],
        },
        {
            title: '贷中统计',
            dataIndex: 'inLoan',
            key: 'inLoan',
            hideInSearch: true,
            children: [
                { title: '新客放款用户数', dataIndex: 'newLoanUserCount', key: 'newLoanUserCount', hideInSearch: true },
                {
                    title: '新客放款量',
                    dataIndex: 'loanCount',
                    key: 'loanCount',
                    hideInSearch: true,
                    tooltip: '新客放款量=待还款量',
                },
                {
                    title: '放款转化率',
                    dataIndex: 'loanRate',
                    key: 'loanRate',
                    hideInSearch: true,
                    tooltip: '放款转化率=新客放款量/注册量',
                },
            ],
        },
        {
            title: '贷后统计',
            dataIndex: 'postLoan',
            key: 'postLoan',
            hideInSearch: true,
            children: [
                { title: '已还款用戶數', dataIndex: 'repayUserCount', key: 'repayUserCount', hideInSearch: true },
                { title: '已还款量', dataIndex: 'repayCount', key: 'repayCount', hideInSearch: true },
                {
                    title: '还款转化率',
                    dataIndex: 'repayRate',
                    key: 'repayRate',
                    hideInSearch: true,
                    tooltip: '还款转化率=新客还款量/新客放款量',
                },
            ],
        },
    ];
    const formRef = useRef<ProFormInstance>();
    const getSearchParams = () => {
        // @ts-ignore
        const { merchantId = '', channelId = '', dateRange = '' } = formRef.current.getFieldValue();
        return {
            merchantId,
            channelId,
            endTime: dateRange ? dateRange[1].format('YYYY-MM-DD 23:59:59') : '',
            startTime: dateRange ? dateRange[0].format('YYYY-MM-DD 00:00:00') : '',
        };
    };

    const [selectedTags, setSelectedTags] = useState<Key[]>(customColumns.map((i) => i['key']));
    const [tagColumns, setTagColumns] = useState<ProColumns<NewCustomersDailyConversionRates>[]>(customColumns);
    const handleChange = (tag: Key, checked: boolean) => {
        const nextSelectedTags = checked
            ? customColumns.map((i) => i['key']).filter((t) => [...selectedTags, tag].includes(t))
            : selectedTags.filter((t) => t !== tag);
        const selectedColumns = customColumns.filter((i) => nextSelectedTags.indexOf(i.key) > -1);
        setTagColumns(selectedColumns);
        setSelectedTags(nextSelectedTags);
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, page: current - 1, size: pageSize });
    };

    const handleExport = () => {
        const searchParams = getSearchParams();
        const searchQueryString = queryString.stringify(searchParams);
        window.open(`/hs/admin/statistics/dayRegisterStatisticDownLoad?${searchQueryString}`);
        setSearchList({ ...searchList, ...searchParams, page: 0 });
    };

    return (
        <ProTable<NewCustomersDailyConversionRates>
            formRef={formRef}
            bordered
            columns={[...columns, ...tagColumns]}
            dataSource={currentData?.records || []}
            loading={isFetching}
            headerTitle={
                <div>
                    <Space>
                        {'显示群组'}
                        <Tooltip title={'反选可隐藏该群组'}>
                            <ExclamationCircleOutlined />
                        </Tooltip>
                        {':'}
                        <div>
                            {customColumns.map((tag) => {
                                if (tag.key === 'registerCount') return;

                                let tagKey = tag.title;
                                if (tag.key === 'otpCount') {
                                    tagKey = 'OTP短信';
                                } else if (tag.key === 'allCertifiedCount') {
                                    tagKey = '完成认证';
                                }
                                return (
                                    <CheckableTag
                                        style={{ marginTop: '4px', marginBottom: '4px' }}
                                        key={tag.key}
                                        checked={selectedTags.indexOf(tag.key) > -1}
                                        onChange={(checked) => handleChange(tag.key, checked)}
                                    >
                                        {tagKey}
                                    </CheckableTag>
                                );
                            })}
                        </div>
                    </Space>
                </div>
            }
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    dateRange: '',
                                });
                                setSearchList(initSearchList);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                setSearchList({
                                    ...searchList,
                                    ...getSearchParams(),
                                    page: 0,
                                });
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            toolBarRender={() => [
                <Button onClick={handleExport} type="primary">
                    导出
                </Button>,
            ]}
            options={{
                setting: false,
                reload: () => triggerGetList(searchList),
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: currentData?.totalRecords,
                current: currentData?.records?.length === 0 ? 0 : currentData?.currentPage,
            }}
        ></ProTable>
    );
};

export default NewCustomersDailyConversionRatesTable;