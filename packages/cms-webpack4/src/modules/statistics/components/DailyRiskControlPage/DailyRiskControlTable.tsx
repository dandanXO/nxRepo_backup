import { useEffect, useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, Tag } from 'antd';
import { useLazyGetDailyRiskControlListQuery } from '../../api/DailyRiskControlApi';
import { GetDailyRiskControlListRequestQuery, GetDailyRiskControlList } from '../../api/types/DailyRiskControlTypes/getDailyRiskControlList';
import CopyText from '../../../shared/components/CopyText';
import { ProColumnsOperationConstant } from "../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../shared/utils/getUserInfo';
import useGetMerchantEnum from '../../../shared/hooks/useGetMerchantEnum';
import useGetProviderEnum from '../../../shared/hooks/useGetProviderEnum';
import useGetChannelEnum from '../../../shared/hooks/useGetChannelEnum';
import { enumObjectToMap } from '../../../shared/utils/enumObjectToMap';
import moment from 'moment';
import queryString from "query-string";
import { CustomColumnTitle } from '../../../shared/components/CustomColumnTitle';

const DailyRiskControlTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    const dayRange = [moment().subtract(7, 'days'), moment()];
    const initSearchList: GetDailyRiskControlListRequestQuery = {
        appName: '',
        channelId: '',
        endTime: dayRange[1].format('YYYY-MM-DD 23:59:59'),
        startTime: dayRange[0].format('YYYY-MM-DD 00:00:00') ,
        isCharge: '',
        isOldUser: '',
        merchantId: '',
        riskControlModel: ''
    }

    // state
    const [searchList, setSearchList] =useState(initSearchList)

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetDailyRiskControlListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if(isSuperAdmin){
            triggerGetMerchantList(null);
        };
        triggerGetProviderList(null);
        triggerGetChannelList(null);
    }, []);
    const formRef = useRef<ProFormInstance>();

    const getSearchParams = () => {
        // @ts-ignore
        const { appName, channelId = '', dayRange, isCharge, isOldUser, merchantId = '', riskControlModel = '' } = formRef.current.getFieldValue();
        return{
            appName,
            channelId,
            endTime: dayRange[1].format('YYYY-MM-DD 23:59:59'),
            startTime: dayRange[0].format('YYYY-MM-DD 00:00:00') ,
            isCharge,
            isOldUser,
            merchantId,
            riskControlModel
        }
    }

    const handleExportDailyRiskControlList = () => {
        const searchParams = getSearchParams();
        const searchQueryString = queryString.stringify(searchParams);
        window.open(`hs/admin/statistics/risk-control/download?${searchQueryString}`);
        setSearchList(searchParams);
    }

    // title 總計的欄位
    const { day, requestCount, successCount, excellentCount, excellentRate, goodCount, goodRate, normalCount,
        normalRate, ordinaryCount, ordinaryRate, rejectCount, rejectRate, riskControlFee } = currentData?.total || {};
  
    const columns: ProColumns<GetDailyRiskControlList>[] = [
        { title: 'APP名称', dataIndex: 'appName', key: 'appName', hideInTable: true },
        {
            title: '日期', dataIndex: 'dayRange', key: 'dayRange', valueType: 'dateRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: dayRange
        },
        { title: '风控名称', dataIndex: 'riskControlModel', key: 'riskControlModel', initialValue: "", valueEnum: providerListEnum, hideInTable: true },
        {
            title: '是否新客', dataIndex: 'isOldUser', key: 'isOldUser', hideInTable: true, valueType: 'select', initialValue: "",
            valueEnum: {
                '': { text: '选择' },
                true: { text: '是' },
                false: { text: '否' },
            }
        },
        {
            title: '是否收费', dataIndex: 'isCharge', key: 'isCharge', hideInTable: true, valueType: 'select', initialValue: "",
            valueEnum: {
                '': { text: '选择' },
                true: { text: '是' },
                false: { text: '否' },
            }
        },
        { title: '渠道名称', dataIndex: 'channelId', key: 'channelId', initialValue: "", valueEnum: channelListEnum, valueType: 'select', hideInTable: true },
        { title: <CustomColumnTitle titleText={'日期'} contentText={day || ''} />, dataIndex: 'day', key: 'day', valueType: 'date', hideInSearch: true },
        { title: <CustomColumnTitle titleText={'风控请求数'} contentText={requestCount || ''} />, dataIndex: 'requestCount', key: 'requestCount', hideInSearch: true },
        { title: <CustomColumnTitle titleText={'成功回复数'} contentText={successCount || ''} />, dataIndex: 'successCount', key: 'successCount', hideInSearch: true },
        { title: <CustomColumnTitle titleText={'极好'} contentText={excellentCount ? `${excellentCount}(${excellentRate})` : ''} />, dataIndex: 'excellentCount', key: 'excellentCount', hideInSearch: true, render: (text, { excellentRate }) => `${text}(${excellentRate})` },
        { title: <CustomColumnTitle titleText={'良好'} contentText={goodCount ? `${goodCount}(${goodRate})` : ''} />, dataIndex: 'goodCount', key: 'goodCount', hideInSearch: true, render: (text, { goodRate }) => `${text}(${goodRate})` },
        { title: <CustomColumnTitle titleText={'正常'} contentText={normalCount ? `${normalCount}(${normalRate})` : ''} />, dataIndex: 'normalCount', key: 'normalCount', hideInSearch: true, render: (text, { normalRate }) => `${text}(${normalRate})` },
        { title: <CustomColumnTitle titleText={'普通'} contentText={ordinaryCount ? `${ordinaryCount}(${ordinaryRate})` : ''} />, dataIndex: 'ordinaryCount', key: 'ordinaryCount', hideInSearch: true, render: (text, { ordinaryRate }) => `${text}(${ordinaryRate})` },
        { title: <CustomColumnTitle titleText={'拒绝'} contentText={rejectCount ? `${rejectCount}(${rejectRate})` : ''} />, dataIndex: 'rejectCount', key: 'rejectCount', hideInSearch: true, render: (text, { rejectRate }) => `${text}(${rejectRate})` },
        { title: <CustomColumnTitle titleText={'风控费用(USD)'} contentText={riskControlFee || ''} />, dataIndex: 'riskControlFee', key: 'riskControlFee', hideInSearch: true },
    ]
    if (isSuperAdmin) {
        columns.splice(0, 0, {
            title: '商户名', dataIndex: 'merchantId', key: 'merchantId', valueEnum: merchantListEnum, valueType: 'select', initialValue: '', hideInTable: true
        })
    }

    return (
        <ProTable<GetDailyRiskControlList>
            formRef={formRef}
            columns={columns}
            dataSource={currentData?.list || []}
            loading={isFetching}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            //  form.resetFields();
                            // @ts-ignore
                            form.setFieldsValue({...initSearchList})
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                setSearchList(getSearchParams());
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
             // headerTitle={<Button type="primary" ghost onClick={() => handlePayReceiptConfirm(selectedList)} disabled={selectedList.length === 0}>全部确认</Button>}
            toolBarRender={() => [<Button onClick={handleExportDailyRiskControlList} type='primary'>导出</Button>]}
            options={{
                setting: { listsHeight: 400, },
                reload: () => triggerGetList(searchList),
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
            }}
        />
    )
}

export default DailyRiskControlTable;

