import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space } from 'antd';
import { GetWhiteListRequestQuerystring, GetWhiteListProps, WhiteListReponse } from '../../../api/types/whiteListTypes/getWhtieList';
import { useLazyGetWhiteListQuery, useDeleteWhiteListMutation, useDeleteWhiteListAllMutation } from '../../../api/WhiteListApi';
import { PlusOutlined } from '@ant-design/icons';
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';

interface BlackLisTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
    isPostWhiteListSuccess:boolean;
}

const BlackListTable = ({ setShowModal,isPostWhiteListSuccess }: BlackLisTableProps) => {
   
    const { channelListEnum, riskRankEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetWhiteListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const initSearchList: GetWhiteListRequestQuerystring = {
        addTimeEnd: "", addTimeStart: "", operatorId: "",  phoneNo: "", pageNum: 1, pageSize: 10
    }

    // state
    const [BlackList, setBlackList] = useState<GetWhiteListProps>({ records: [] });
    const [searchList, setSearchList] = useState<GetWhiteListRequestQuerystring>(initSearchList);

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList,isPostWhiteListSuccess])

    useEffect(() => {
        if (currentData !== undefined) {
            setBlackList(currentData);
        }
    }, [currentData])

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }


    const columns: ProColumns<WhiteListReponse>[] = [
        { title: '注册时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '注册时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: ""
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: "" },
        { title: '操作人', dataIndex: 'operatorName', key: 'operatorName', initialValue: "" },
       
    ]


    return (
        <ProTable<WhiteListReponse>
            columns={columns}
            dataSource={BlackList?.records || []}
            loading={isFetching}
            rowKey="id"
            headerTitle={<Button key="addButton" icon={<PlusOutlined />} type="primary" onClick={()=>setShowModal(true)}>添加</Button>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            // @ts-ignore
                            form.resetFields();
                            setSearchList(initSearchList)
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { addTimeRange, operatorId, phoneNo } = form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    addTimeEnd: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    addTimeStart: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    operatorId,
                                    phoneNo,
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
                reload: () => triggerGetList(searchList)
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: BlackList?.totalRecords,
                current: BlackList?.records?.length === 0 ? 0 : BlackList.currentPage,
            }}
        />

    )
}

export default BlackListTable;

