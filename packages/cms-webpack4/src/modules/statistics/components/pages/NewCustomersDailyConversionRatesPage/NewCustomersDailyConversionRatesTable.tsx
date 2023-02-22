import { useEffect, useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, Space, List, Tag, Tooltip } from 'antd';
import { GetNewCustomersDailyConversionRatesRequestQuerystring, NewCustomersDailyConversionRates, GetNewCustomersDailyConversionRatesProps } from '../../../api/types/NewCustomersDailyConversionRatesTypes/getNewCustomersDailyConversionRates';
import { useLazyGetNewCustomersDailyConversionRatesQuery,usePostNewCustomersDailyConversionRatesDownloadMutation } from '../../../api/NewCustomersDailyConversionRatesApi';
import { getIsSuperAdmin } from '../../../../shared/storage/getUserInfo';
import useGetMerchantEnum from '../../../../shared/hooks/common/useGetMerchantEnum';
import useGetChannelEnum from '../../../../shared/hooks/useGetChannelEnum';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import queryString from "query-string";
import download from "downloadjs";
import axios from 'axios';
const { CheckableTag } = Tag;
const NewCustomersDailyConversionRatesTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetNewCustomersDailyConversionRatesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [postDownload, { data, isSuccess: postDownloadIsSuccess }] = usePostNewCustomersDailyConversionRatesDownloadMutation();

    const initSearchList: GetNewCustomersDailyConversionRatesRequestQuerystring = {
        channelId: '', endTime: '', merchantId: '', startTime: '', size: 10, page: 0
    }

    // // state
    const [searchList, setSearchList] = useState<GetNewCustomersDailyConversionRatesRequestQuerystring>(initSearchList);


    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
        triggerGetChannelList(null);
    }, [isSuperAdmin]);

    const CustomColumn = ({ text, rate = '百分比' }) => {
        return <div>
            <div>{text}</div>
            <div>({rate})</div>
        </div>
    }

    const columns: ProColumns<NewCustomersDailyConversionRates>[] = [

        {
            title: '日期', dataIndex: 'dateRange', key: 'dateRange', valueType: 'dateRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: ""
        },
        { title: '渠道来源', dataIndex: 'channelId', key: 'channelId', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: channelListEnum, fieldProps: { showSearch: true } },
    ]

    if (isSuperAdmin) {
        columns.splice(0, 0, {
            title: '商户名', dataIndex: 'merchantId', key: 'merchantId', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true }
        })
    }

    const customColumns = [
        { title: '日期', dataIndex: 'day', key: 'day', hideInSearch: true },
        { title: <CustomColumn text={'注册量'} />, dataIndex: 'registerCount', key: 'registerCount', hideInSearch: true, tooltip: '注册百分比=注册量/短信发送数', render: (text, { registerRate }) => <CustomColumn text={text} rate={registerRate} /> },
        {
            title: '使用者授权认证', dataIndex: 'authorization', key: 'authorization', hideInSearch: true,
            children: [
                { title: <CustomColumn text={'相冊'} />, dataIndex: 'photoCount', key: 'photoCount', hideInSearch: true, render: (text, { photoCountRate }) => <CustomColumn text={text} rate={photoCountRate} /> },
                { title: <CustomColumn text={'通讯录'} />, dataIndex: 'contactCount', key: 'contactCount', hideInSearch: true, render: (text, { contactRate }) => <CustomColumn text={text} rate={contactRate} /> },
                { title: <CustomColumn text={'AppList'} />, dataIndex: 'appsCount', key: 'appsCount', hideInSearch: true, render: (text, { appsCountRate }) => <CustomColumn text={text} rate={appsCountRate} /> },
                { title: <CustomColumn text={'短信通话'} />, dataIndex: 'cdrCount', key: 'cdrCount', hideInSearch: true, render: (text, { cdrCountRate }) => <CustomColumn text={text} rate={cdrCountRate} /> },
            ]
        },
        {
            title: '使用者操作认证', dataIndex: 'operation', key: 'operation', hideInSearch: true,
            children: [
                { title: <CustomColumn text={'紧急联系人'} />, dataIndex: 'authCount', key: 'authCount', hideInSearch: true, render: (text, { authRate }) => <CustomColumn text={text} rate={authRate} /> },
                { title: <CustomColumn text={'实名认证'} />, dataIndex: 'idCardCount', key: 'idCardCount', hideInSearch: true, render: (text, { idCardRate }) => <CustomColumn text={text} rate={idCardRate} /> },
                { title: <CustomColumn text={'Face ID'} />, dataIndex: 'livenessCount', key: 'livenessCount', hideInSearch: true, render: (text, { livenessCountRate }) => <CustomColumn text={text} rate={livenessCountRate} /> },
                { title: <CustomColumn text={'绑卡认证'} />, dataIndex: 'bankCount', key: 'bankCount', hideInSearch: true, render: (text, { bankRate }) => <CustomColumn text={text} rate={bankRate} /> },
            ]
        },
        {
            title: '风控', dataIndex: 'riskControl', key: 'riskControl', hideInSearch: true,
            children: [
                { title: <CustomColumn text={'内部风控通过'} />, dataIndex: 'innerRiskControlPassCount', key: 'innerRiskControlPassCount',  tooltip: '反欺诈/基础风控' ,hideInSearch: true, render: (text, { innerRiskControlPassRate }) => <CustomColumn text={text} rate={innerRiskControlPassRate} /> },
                { title: <CustomColumn text={'外部风控通过'} />, dataIndex: 'outerRiskControlPassCount', key: 'outerRiskControlPassCount', tooltip: '风控模型分' , hideInSearch: true, render: (text, { outerRiskControlPassRate }) => <CustomColumn text={text} rate={outerRiskControlPassRate} /> },
            ]
        },
        {
            title: '贷前统计', dataIndex: 'preLoan', key: 'preLoan', hideInSearch: true,
            children: [
                { title: '订单申请量', dataIndex: 'applyCount', key: 'applyCount', hideInSearch: true },
                { title: '申请转化率', dataIndex: 'applyRate', key: 'applyRate', hideInSearch: true, tooltip: '申请转化率=订单申请量/注册量' },
            ]
        },
        {
            title: '贷中统计', dataIndex: 'inLoan', key: 'inLoan', hideInSearch: true,
            children: [
                { title: '新客放款量', dataIndex: 'loanCount', key: 'loanCount', hideInSearch: true, tooltip: '新客放款量=待还款量' },
                { title: '放款转化率', dataIndex: 'loanRate', key: 'loanRate', hideInSearch: true, tooltip: '放款转化率=新客放款量/注册量' },
            ]
        },
        {
            title: '贷后统计', dataIndex: 'postLoan', key: 'postLoan', hideInSearch: true,
            children: [
                { title: '已还款量', dataIndex: 'repayCount', key: 'repayCount', hideInSearch: true },
                { title: '还款转化率', dataIndex: 'repayRate', key: 'repayRate', hideInSearch: true, tooltip: '还款转化率=新客还款量/注册量' },
            ]
        },
    ]

    const formRef = useRef<ProFormInstance>();
    const [selectedTags, setSelectedTags] = useState<string[]>(customColumns.map(i => i['key']));
    const [tagColumns, setTagColumns] = useState<Object[]>(customColumns);
    const handleChange = (tag: string, checked: boolean) => {

        const nextSelectedTags = checked
            ? customColumns.map(i => i['key']).filter((t) => [...selectedTags, tag].includes(t))
            : selectedTags.filter((t) => t !== tag);
        const selectedColumns = customColumns.filter(i => nextSelectedTags.indexOf(i.key) > -1)
        setTagColumns(selectedColumns)
        setSelectedTags(nextSelectedTags);
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, page: current-1, size: pageSize })
    }

    const getSearchParams = () => {
        // @ts-ignore
        const { merchantId = '', channelId = '', dateRange } = formRef.current.getFieldValue();
        return {
            // merchantId,
             channelId,
            endTime: dateRange[1] ? dateRange[1].format('YYYY-MM-DD 23:59:59') : '',
            startTime: dateRange[0] ? dateRange[0].format('YYYY-MM-DD 00:00:00') : '',
        }
    }

    const handleExport = () => {
        // const searchParams = getSearchParams();
        // postDownload(searchParams).unwrap().then(file=>{
        //     // download(file,'新客日统计转化率.xlsx')
        //     var blob = new Blob(
        //         [file],
        //         {type:   "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"}
        //     );
            
        //     // Programatically create a link and click it:
        //     var a = document.createElement("a");
        //     a.href = URL.createObjectURL(blob);
        //     a.download = 'fileName.xlsx';
        //     a.click();
        // });
        // setSearchList({...searchList,...searchParams});
       
    }

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
                            {customColumns.map((tag, index) => {
                                if (tag.key === 'registerCount') return
                                return <CheckableTag
                                    style={{ marginTop: '4px', marginBottom: '4px' }}
                                    key={tag.key}
                                    checked={selectedTags.indexOf(tag.key) > -1}
                                    onChange={(checked) => handleChange(tag.key, checked)}
                                >
                                    {tag.title}
                                </CheckableTag>
                            })}
                        </div>
                    </Space>
                </div>
            }
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space >
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    dateRange: ''
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
                                    page: 0
                                });
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            // toolBarRender={() => [<Button onClick={handleExport} type='primary'>导出</Button>]}
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
        >

        </ProTable>
    );
}

export default NewCustomersDailyConversionRatesTable;

