import { useEffect, useRef, useState } from 'react';
import type { ColumnsState, ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, Table, Tag } from 'antd';
import { useLazyGetDailyRiskControlListQuery } from '../../api/DailyRiskControlApi';
import { GetDailyRiskControlListRequestQuery, GetDailyRiskControlList } from '../../api/types/DailyRiskControlTypes/getDailyRiskControlList';
import CopyText from '../../../shared/components/CopyText';
import { ProColumnsOperationConstant } from "../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../shared/utils/getUserInfo';
import useGetProviderEnum from '../../../shared/hooks/useGetProviderEnum';
import { enumObjectToMap } from '../../../shared/utils/enumObjectToMap';
import moment from 'moment';
import queryString from "query-string";

const DailyRiskControlTable = () => {

    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();
    const dayRange = [moment().subtract(7, 'days'), moment()];
    const initSearchList: GetDailyRiskControlListRequestQuery = {
        endTime: dayRange[1].format('YYYY-MM-DD 23:59:59'),
        startTime: dayRange[0].format('YYYY-MM-DD 00:00:00') ,
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
        triggerGetProviderList(null);
    }, []);
    const formRef = useRef<ProFormInstance>();

    const getSearchParams = () => {
        // @ts-ignore
        const {  dayRange,  riskControlModel = '' } = formRef.current.getFieldValue();
        return{
            endTime: dayRange ? dayRange[1].format('YYYY-MM-DD 23:59:59') : '',
            startTime: dayRange ? dayRange[0].format('YYYY-MM-DD 00:00:00') : '',
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
    const { day = '', requestCount = '', successCount = '', excellentCount = '', excellentRate = '', goodCount = '', goodRate = '', normalCount = '',
        normalRate = '', ordinaryCount = '', ordinaryRate = '', rejectCount = '', rejectRate = '' } = currentData?.total || {};
  
    const columns: ProColumns<GetDailyRiskControlList>[] = [
        { title: '日期', dataIndex: 'dayRange', key: 'dayRange', valueType: 'dateRange', fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: dayRange },
        { title: '风控名称', dataIndex: 'riskControlModel', key: 'riskControlModel', initialValue: "", valueEnum: providerListEnum, hideInTable: true },
        { title: '日期', dataIndex: 'day', key: 'day', hideInSearch: true },
        { title: '风控请求数', dataIndex: 'requestCount', key: 'requestCount', hideInSearch: true },
        { title: '成功回复数', dataIndex: 'successCount', key: 'successCount', hideInSearch: true },
        { title: '极好', dataIndex: 'excellentCount', key: 'excellentCount', hideInSearch: true, render: (text, { excellentRate }) => `${text}(${excellentRate})` },
        { title: '良好', dataIndex: 'goodCount', key: 'goodCount', hideInSearch: true, render: (text, { goodRate }) => `${text}(${goodRate})` },
        { title: '正常', dataIndex: 'normalCount', key: 'normalCount', hideInSearch: true, render: (text, { normalRate }) => `${text}(${normalRate})` },
        { title: '普通', dataIndex: 'ordinaryCount', key: 'ordinaryCount', hideInSearch: true, render: (text, { ordinaryRate }) => `${text}(${ordinaryRate})` },
        { title: '拒绝', dataIndex: 'rejectCount', key: 'rejectCount', hideInSearch: true, render: (text, { rejectRate }) => `${text}(${rejectRate})` },
    ]

    const initColumnsStateMap = columns.reduce((prev, curr) => {
        return curr.hideInSearch ? { ...prev, ...{ [`${curr.key}`]: { show: true } } } : { ...prev }
    }, {}) as Record<string, ColumnsState>;
    
    const [columnsStateMap, setColumnsStateMap] = useState<Record<string, ColumnsState>>({ ...initColumnsStateMap });

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
                            form.setFieldsValue({ ...initSearchList })
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
            summary={() => {
                return (
                    <Table.Summary>
                        <Table.Summary.Row style={{ fontWeight: 'bold', background: '#fafafa' }}>
                            {columnsStateMap.day.show && <Table.Summary.Cell index={0}>{day}</Table.Summary.Cell>}
                            {columnsStateMap.requestCount.show && <Table.Summary.Cell index={1}>{requestCount}</Table.Summary.Cell>}
                            {columnsStateMap.successCount.show && <Table.Summary.Cell index={2}>{successCount}</Table.Summary.Cell>}
                            {columnsStateMap.excellentCount.show && <Table.Summary.Cell index={3}>{excellentCount ? `${excellentCount}(${excellentRate})` : ''}</Table.Summary.Cell>}
                            {columnsStateMap.goodCount.show && <Table.Summary.Cell index={4}>{goodCount ? `${goodCount}(${goodRate})` : ''}</Table.Summary.Cell>}
                            {columnsStateMap.normalCount.show && <Table.Summary.Cell index={5}>{normalCount ? `${normalCount}(${normalRate})` : ''}</Table.Summary.Cell>}
                            {columnsStateMap.ordinaryCount.show && <Table.Summary.Cell index={6}>{ordinaryCount ? `${ordinaryCount}(${ordinaryRate})` : ''}</Table.Summary.Cell>}
                            {columnsStateMap.rejectCount.show && <Table.Summary.Cell index={7}>{rejectCount ? `${rejectCount}(${rejectRate})` : ''}</Table.Summary.Cell>}
                        </Table.Summary.Row>
                    </Table.Summary>
                );
            }}
            // headerTitle={<Button type="primary" ghost onClick={() => handlePayReceiptConfirm(selectedList)} disabled={selectedList.length === 0}>全部确认</Button>}
            toolBarRender={() => [<Button onClick={handleExportDailyRiskControlList} type='primary'>导出</Button>]}
            options={{
                setting: { listsHeight: 400, draggable: false },
                reload: () => triggerGetList(searchList),
            }}
            columnsState={{
                value: columnsStateMap,
                onChange: (v) => setColumnsStateMap(v)
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
            }}
        />

    )
}

export default DailyRiskControlTable;

