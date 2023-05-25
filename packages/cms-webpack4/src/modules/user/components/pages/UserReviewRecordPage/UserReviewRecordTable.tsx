import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Space } from 'antd';
import useGetUserReviewRecordOperatorEnum from '../../../../shared/hooks/useGetUserReviewRecordOperatorEnum';
import { useLazyGetUserReviewRecordListQuery } from '../../../api/UserReviewRecordApi';
import { UserReviewRecordList, GetUserReviewRecordListRequestQuerystring, GetUserReviewRecordListProps } from '../../../api/types/userReviewRecordTypes/getUserReviewRecordList';
import CopyText from '../../../../shared/components/other/CopyText';
import queryString from "query-string";
import { enumObjectToMap } from '../../../../shared/utils/format/enumObjectToMap';

const UserReviewRecordTable = (): JSX.Element => {

    const { triggerGetOperatorList, userReviewRecordOperatorEnum  } = useGetUserReviewRecordOperatorEnum();
    const initSearchList:GetUserReviewRecordListRequestQuerystring = {
        operatorId: '', phoneNo: '', reviewStatus: '', reviewTimeEnd: '', reviewTimeStart: '', userName: '', pageNum: 1, pageSize: 10
    };

    const [searchList, setSearchList] = useState<GetUserReviewRecordListRequestQuerystring>(initSearchList);
    const [recordList,setRecordList] = useState<GetUserReviewRecordListProps>({ records: [] });
    // api
    const [triggerGetList, { currentData, isFetching }] = useLazyGetUserReviewRecordListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });


    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList]);

    useEffect(() => {
        if (currentData !== undefined) {
            setRecordList(currentData);
        }
    }, [currentData]);

    useEffect(()=>{
        triggerGetOperatorList(null);
    },[]);


    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    const handleExportUserRecordList = () => {
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/user-review-record/list/download?${searchQueryString}`);
    };

    const statusEnum = {
        '': { text: '不限' },
        '0': { text: '机审异常', color: 'lightgray' },
        '1': { text: '机审通过', color: 'blue' },
        '2': { text: '机审拒绝', color: 'orange' },
        '6': { text: '终审通过', color: 'green' },
        '7': { text: '终审拒绝', color: 'red' },
        '8': { text: '终审拉黑', color: 'lightgray' },
    };

    const columns: ProColumns<UserReviewRecordList>[] = [
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: "", render: (text) => <CopyText text={text} /> },
        { title: '审核状态', dataIndex: 'reviewStatus', valueType: 'select', key: 'reviewStatus', initialValue: "", valueEnum: enumObjectToMap(statusEnum) },
        { title: '审核时间', dataIndex: 'reviewTime', key: 'reviewTime', hideInSearch: true, valueType: 'dateTime',  },
        { title: '审核时间', dataIndex: 'reviewTimeRange', valueType: 'dateRange', key: 'reviewTimeRange', fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: "" },
        { title: '操作人', dataIndex: 'operatorId', key: 'operatorId', valueType: 'select', valueEnum: userReviewRecordOperatorEnum, initialValue: "" , hideInTable: true },
        { title: '操作人', dataIndex: 'operator', key: 'operator', hideInSearch: true },
        { title: '备注', dataIndex: 'remark', key: 'remark', hideInSearch: true, render: (text) => <CopyText text={text} /> },
    ];
    return (
        <ProTable<UserReviewRecordList>
            columns={columns}
            dataSource={recordList?.records || []}
            loading={isFetching}
            rowKey="id"
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            //  form.resetFields();
                            // @ts-ignore
                            form.setFieldsValue({ ...initSearchList, reviewTimeRange: '' });
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { reviewTimeRange, phoneNo, userName, reviewStatus, operatorId } = form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    phoneNo,
                                    userName,
                                    reviewStatus: reviewStatus === '' ? '' : Number(reviewStatus),
                                    reviewTimeEnd: reviewTimeRange ? reviewTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    reviewTimeStart: reviewTimeRange ? reviewTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    operatorId,
                                    pageNum: 1,
                                });
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
            toolBarRender={() => [<Button onClick={handleExportUserRecordList} type='primary'>导出</Button>]}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: recordList?.totalRecords,
                current: recordList?.records?.length === 0 ? 0 : recordList.currentPage,
            }}
        />

    );
};

export default UserReviewRecordTable;

