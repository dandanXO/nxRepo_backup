import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space, Tag } from 'antd';
import moment from 'moment';
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';
import { usePostUserReviewRecordListMutation,useLazyGetUserReviewRecordListQuery } from '../../../api/UserReviewRecordApi';
import { GetUserReviewRecordListResponse } from '../../../api/types/userReviewRecordTypes/getUserReviewRecordList';
import CopyText from '../../../../shared/components/CopyText';
import queryString from "query-string";

const UserReviewRecordTable = () => {

    const { operatorListEnum } = useValuesEnums();
    const initSearchList = {
        // endTime: "2022-12-06 08:17:11",operatorId: "",pageNum: 1,pageSize: 10,reviewStatus: "",startTime: "2021-12-11 08:17:11",userName: "",userPhone: "
        userPhone: '', userName: '', reviewStatus: '', endTime: '', startTime: '', operatorId: '', pageNum: 1, pageSize: 10
    }
  
    const [searchList, setSearchList] = useState(initSearchList);
    const [recordList,setRecordList]=useState({ records: [] });
    // api
    // const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserReviewRecordListQuery({
    //     pollingInterval: 0,useGetUserReviewRecordListMutation
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });
    const [triggerGetList, { data, isLoading }] = usePostUserReviewRecordListMutation();

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (data !== undefined) {
            setRecordList(data);
        }
    }, [data]);

   
    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    const handleExportOrderList = () => {
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/order/list/download?${searchQueryString}`);
    }

    const statusEnum = {
        '': { text: '不限' },
        '1': { text: '机审中', color: 'default'},
        '6': { text: '审核中', color: 'blue' },
        '7': { text: '订单拒绝', color: 'red' },
        '8': { text: '放款中', color: 'purple' },
        '9': { text: '还款中', color: 'blue' },
        '10': { text: '已完成', color: 'green' },
        '11': { text: '放款失败', color: 'red' },
        '12': { text: '已逾期', color: 'orange' },
    };

    const columns: ProColumns<GetUserReviewRecordListResponse>[] = [
        { title: '手机号', dataIndex: 'userPhone', key: 'userPhone', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '审核状态', dataIndex: 'reviewStatus', valueType: 'select', key: 'reviewStatus', initialValue: "", valueEnum: statusEnum },
        { title: '审核时间', dataIndex: 'reviewTime', key: 'reviewTime', hideInSearch: true, valueType: 'dateTime', width: '100px', },
        { title: '审核时间', dataIndex: 'reviewTimeRange', valueType: 'dateRange', key: 'reviewTimeRange', fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: "" },
        { title: '操作人', dataIndex: 'operatorId', key: 'operatorId', valueType: 'select', valueEnum: operatorListEnum, initialValue: "" },
        { title: '备注', dataIndex: 'remark', key: 'remark', hideInSearch: true, render: (text) => <CopyText text={text} /> },
    ]
    return (
        <ProTable<GetUserReviewRecordListResponse>
            columns={columns}
            dataSource={recordList?.records || []}
            loading={isLoading} // isFetching
            rowKey="id"
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            //  form.resetFields();
                            // @ts-ignore
                            form.setFieldsValue({ ...initSearchList, applyTimeRange: '', expireDateRange: '', loanTimeRange: '' })
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { reviewTimeRange, userPhone, userName, reviewStatus, operatorId} = form.getFieldValue();

                                setSearchList({
                                    ...initSearchList,
                                    userPhone, 
                                    userName, 
                                    reviewStatus,
                                    // endTime: reviewTimeRange ? reviewTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    // startTime: reviewTimeRange ? reviewTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    endTime: reviewTimeRange ? reviewTimeRange[1].format('YYYY-MM-DD HH:mm:ss') : '',
                                    startTime: reviewTimeRange ? reviewTimeRange[0].format('YYYY-MM-DD HH:mm:ss') : '',
                                    operatorId
                        
                                  
                                })
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: { listsHeight: 400, },
                reload: () => triggerGetList(searchList),
                
            }}
            toolBarRender={() => [<Button onClick={handleExportOrderList} type='primary'>导出</Button>]}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                // total: recordList?.totalRecords,
                // current: recordList?.records?.length === 0 ? 0 : recordList.currentPage,
            }}
        />

    )
}

export default UserReviewRecordTable;

