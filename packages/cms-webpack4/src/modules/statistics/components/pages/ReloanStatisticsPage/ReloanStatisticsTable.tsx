import { useEffect, useRef, useState } from 'react';
import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, Space, List, Tag, Tooltip } from 'antd';
import { GetReloanStatisticsListRequestQuerystring, GetReloanStatisticsList, } from '../../../api/types/ReloanStatisticsTypes/getReloanStatisticsList';
import { useLazyGetReloanStatisticsListQuery } from '../../../api/ReloanStatisticsApi';
import { getIsSuperAdmin } from '../../../../shared/storage/getUserInfo';
import useGetMerchantEnum from '../../../../shared/hooks/common/useGetMerchantEnum';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import useGetAppNamesEnum from '../../../../shared/hooks/useGetAppNamesEnum';
import useGetProductNamesEnum from '../../../../shared/hooks/common/useGetProductNamesEnum';
import queryString from "query-string";

const { CheckableTag } = Tag;
const ReloanStatisticsTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const { triggerGetAppNames, appNamesEnum } = useGetAppNamesEnum();
    const { triggerGetProductNames, productNamesEnum } = useGetProductNamesEnum();

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetReloanStatisticsListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const initSearchList: GetReloanStatisticsListRequestQuerystring = {
        appName: '', repayEndDate: '', merchantId: '', repayStartDate: '', productId:''
    }

    // // state
    const [searchList, setSearchList] = useState<GetReloanStatisticsListRequestQuerystring>(initSearchList);

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
        triggerGetAppNames(null);
        triggerGetProductNames(null);
    }, [isSuperAdmin]);

    const columns: ProColumns<GetReloanStatisticsList>[] = [
        { title: 'APP名称', dataIndex: 'appName', key: 'appName', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: appNamesEnum, fieldProps: { showSearch: true } },
        { title: '产品名称', dataIndex: 'productId', key: 'productId', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: productNamesEnum, fieldProps: { showSearch: true } },
        { title: '到期时间', dataIndex: 'dateRange', key: 'dateRange', valueType: 'dateRange', fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: "" },
        { title: '到期日', dataIndex: 'expireDate', key: 'expireDate', hideInSearch: true, width:'100px'}
    ]

    if (isSuperAdmin) {
        columns.splice(0, 0, {
            title: '商户名', dataIndex: 'merchantId', key: 'merchantId', hideInTable: true, initialValue: '', valueType: 'select', valueEnum: merchantListEnum, fieldProps: { showSearch: true }
        })
    }

    const customColumns:any[] = [
        {
            title: '到期订单数', dataIndex: 'expireOrder', key: 'expireOrder', hideInSearch: true,
            children: [
                { title: '到期总订单数', dataIndex: 'expireDateOrderCount', key: 'expireDateOrderCount', hideInSearch: true, className: 'totalColumn' },
                { title: '新客到期订单数', dataIndex: 'expireDateNewUserOrderCount', key: 'expireDateNewUserOrderCount', hideInSearch: true, className: 'newCustomer' },
                { title: '老客到期订单数', dataIndex: 'expireDateOldUserOrderCount', key: 'expireDateOldUserOrderCount', hideInSearch: true, className: 'oldCustomer' },
            ]
        },
        {
            title: '到期用户数', dataIndex: 'expireUser', key: 'expireUser', hideInSearch: true,
            children: [
                { title: '到期总用户数', dataIndex: 'expireDateOrderUserCount', key: 'expireDateOrderUserCount', hideInSearch: true, className: 'totalColumn' },
                { title: '新客到期用户数', dataIndex: 'expireDateNewUserOrderUserCount', key: 'expireDateNewUserOrderUserCount', hideInSearch: true, className: 'newCustomer' },
                { title: '老客到期订单数', dataIndex: 'expireDateOldUserOrderCount', key: 'expireDateOldUserOrderCount', hideInSearch: true, className: 'oldCustomer'  },
            ]
        },
        {
            title: '还款订单数', dataIndex: 'repayOrder', key: 'repayOrder', hideInSearch: true,
            children: [
                { title: '还款总订单数', dataIndex: 'expireDateRepayOrderCount', key: 'expireDateRepayOrderCount', hideInSearch: true, className: 'totalColumn' },
                { title: '新客还款订单数', dataIndex: 'expireDateNewUserRepayOrderCount', key: 'expireDateNewUserRepayOrderCount', hideInSearch: true, className: 'newCustomer' },
                { title: '老客还款订单数', dataIndex: 'expireDateOldUserOrderRepayCount', key: 'expireDateOldUserOrderRepayCount', hideInSearch: true, className: 'oldCustomer'  },
            ]
        },
        {
            title: '还款用户数', dataIndex: 'repayUser', key: 'repayUser', hideInSearch: true,
            children: [
                { title: '还款总用户数', dataIndex: 'expireDateRepayOrderUserCount', key: 'expireDateOrderUserCount', hideInSearch: true, className: 'totalColumn' },
                { title: '新客还款用户数', dataIndex: 'expireDateRepayNewUserOrderUserCount', key: 'expireDateNewUserOrderUserCount', hideInSearch: true, className: 'newCustomer' },
                { title: '老客还款用户数', dataIndex: 'expireDateRepayOldUserOrderUserCount', key: 'expireDateOldUserOrderCount', hideInSearch: true, className: 'oldCustomer'  },
            ]
        },
        {
            title: '纯新客订单数', dataIndex: 'newUserOrder', key: 'newUserOrder', hideInSearch: true,
            children: [
                { title: '纯新客订单数', dataIndex: 'addDateNewUserOrderCount', key: 'addDateNewUserOrderCount', hideInSearch: true, className: '' },
            ]
        },
        {
            title: '订单复借统计', dataIndex: 'reloanOrder', key: 'reloanOrder', hideInSearch: true,
            children: [
                { title: '次新客订单数', dataIndex: 'addDateRenewOrderCount', key: 'addDateRenewOrderCount', hideInSearch: true, className: '' },
                { title: '复借订单数', dataIndex: 'addDateReLoanOrderCount', key: 'addDateReLoanOrderCount', hideInSearch: true, className: '' },
                { title: '订单复借率', dataIndex: 'orderReLoanRate', key: 'orderReLoanRate', hideInSearch: true, className: '' , tooltip: '订单复借率=复借订单数/还款订单总数' },
            ]
        },
        {
            title: '用户复借统计', dataIndex: 'reloanUser', key: 'reloanUser', hideInSearch: true,
            children: [
                { title: '复借用户数', dataIndex: 'reLoanUserCount', key: 'reLoanUserCount', hideInSearch: true, className: '' },
                { title: '用户复借率', dataIndex: 'userReLoanRate', key: 'userReLoanRate', hideInSearch: true, tooltip: '用户复借率=复借用戶数/还款用戶总数', className: '' },
            ]
        },
    ]

    const formRef = useRef<ProFormInstance>();
    const subTitleTypes = ['totalColumn', 'newCustomer', 'oldCustomer'];
    const [tagColumns, setTagColumns] = useState<any[]>(customColumns);
    const [selectedTags, setSelectedTags] = useState<string[]>(customColumns.map(i => i['key']));
    const [selectedSubTags, setSelectedSubTags] = useState<string[]>(subTitleTypes);

    const handleTagsChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? customColumns.map(i => i['key']).filter((t) => [...selectedTags, tag].includes(t))
            : selectedTags.filter((t) => t !== tag);
        setSelectedTags(nextSelectedTags);
    };

    const handleSubTagsChange = (tag: string, checked: boolean) => {
        const nextSelectedTags = checked
            ? subTitleTypes.filter((t) => [...selectedSubTags, tag].includes(t))
            : selectedSubTags.filter((t) => t !== tag);
        setSelectedSubTags(nextSelectedTags);
    }

    useEffect(() => {
        const selectedColumns = customColumns
            .filter(i => selectedTags.indexOf(i.key) > -1)
            .map(i => ({
                ...i,
                children: i.children.filter(child => child.className === '' ? child : selectedSubTags.indexOf(child.className) > -1)
            }))
            .filter(col => col.children.length > 0)
        setTagColumns(selectedColumns)
    }, [selectedTags, selectedSubTags])


    const getSearchParams = () => {
        // @ts-ignore
        const { appName = '', merchantId = '', dateRange, productId = '' } = formRef.current.getFieldValue();
        return {
            appName,
            merchantId,
            productId,
            repayEndDate: dateRange[1] ? dateRange[1].format('YYYY-MM-DD 23:59:59') : '',
            repayStartDate: dateRange[0] ? dateRange[0].format('YYYY-MM-DD 00:00:00') : '',
        }
    }

    const handleExport = () => {
        const searchParams = getSearchParams();
        const searchQueryString = queryString.stringify(searchParams);
        window.open(`/hs/admin/statistics/reloan-statistics/download?${searchQueryString}`);
        setSearchList({...searchParams });
    }

    return (

        <ProTable<GetReloanStatisticsList>
            formRef={formRef}
            bordered
            columns={[...columns, ...tagColumns]}
            dataSource={currentData || []}
            loading={isFetching}
            tableClassName={'reloanStatisticsTable'}
            headerTitle={
                <div>
                    <div>
                        <Space>
                            {'显示群组'}<Tooltip title={'反选可隐藏该群组'}><ExclamationCircleOutlined /></Tooltip>{':'}
                            <div>
                                {customColumns.map((tag, index) => {
                                    if (tag.key === 'registerCount') return
                                    return <CheckableTag
                                        style={{ marginTop: '4px', marginBottom: '4px' }}
                                        key={tag.key}
                                        checked={selectedTags.indexOf(tag.key) > -1}
                                        onChange={(checked) => handleTagsChange(tag.key, checked)}
                                    >
                                        {tag.key === 'otpCount' ? 'OTP短信' : tag.title}
                                    </CheckableTag>
                                })}
                            </div>
                        </Space>
                    </div>
                    <div>
                        <Space>
                            {'显示统计类别'}<Tooltip title={'反选可隐藏该群组'}><ExclamationCircleOutlined /></Tooltip>{':'}
                            <div>
                                {subTitleTypes.map((tag, index) => {
                                    const type = {
                                        totalColumn: { title: '总计' },
                                        newCustomer: { title: '新客' },
                                        oldCustomer: { title: '老客' },
                                    }
                                    return <CheckableTag
                                        style={{ marginTop: '4px', marginBottom: '4px' }}
                                        key={tag}
                                        checked={selectedSubTags.indexOf(tag) > -1}
                                        onChange={(checked) => handleSubTagsChange(tag, checked)}
                                    >
                                        {type[tag].title}
                                    </CheckableTag>
                                })}
                            </div>
                        </Space>
                    </div>

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
                                form.setFieldsValue({...initSearchList,dateRange: ''});
                                setSearchList(initSearchList);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                setSearchList({...getSearchParams()});
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            toolBarRender={() => [<Button onClick={handleExport} type='primary'>导出</Button>]}
            options={{
                setting: false,
                reload: () => triggerGetList(searchList),
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
            }}
        >

        </ProTable>
    );
}

export default ReloanStatisticsTable;

