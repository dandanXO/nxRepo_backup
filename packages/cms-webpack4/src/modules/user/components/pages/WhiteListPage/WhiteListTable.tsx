import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space } from 'antd';
import { GetWhiteListRequestQuerystring, GetWhiteListProps, WhiteListReponse } from '../../../api/types/whiteListTypes/getWhtieList';
import { useLazyGetWhiteListQuery, useDeleteWhiteListMutation, useDeleteWhiteListAllMutation } from '../../../api/WhiteListApi';
import { PlusOutlined } from '@ant-design/icons';
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';

interface WhiteLisTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
    isPostWhiteListSuccess:boolean;
}

const WhiteListTable = ({ setShowModal,isPostWhiteListSuccess }: WhiteLisTableProps) => {
   
    const { operatorListEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetWhiteListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [deleteWhiteList,{isSuccess:isDeleteWhiteListSuccess}]=useDeleteWhiteListMutation();
    const [deleteWhiteListAll,{isSuccess:isDeleteWhiteListAllSuccess}]=useDeleteWhiteListAllMutation();


    const initSearchList: GetWhiteListRequestQuerystring = {
        addTimeEnd: "", addTimeStart: "", operatorId: "",  phoneNo: "", pageNum: 1, pageSize: 10
    }

    // state
    const [whiteList, setWhiteList] = useState<GetWhiteListProps>({ records: [] });
    const [searchList, setSearchList] = useState<GetWhiteListRequestQuerystring>(initSearchList);
    const [deleteModal, deleteContextHolder] = Modal.useModal();
    const [selectedRow, setSelectedRow] = useState([]);
    const [buttonDisabled,setButtonDisbaled]=useState(true)
    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList,isPostWhiteListSuccess,isDeleteWhiteListSuccess,isDeleteWhiteListAllSuccess])

    useEffect(() => {
        if (currentData !== undefined) {
            setWhiteList(currentData);
        }
    }, [currentData])

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    
    const onSelectChange = (selectedRowKeys) => {
        setButtonDisbaled(selectedRowKeys.length === 0 ? true : false)
        setSelectedRow(selectedRowKeys);

    };

    const columns: ProColumns<WhiteListReponse>[] = [
        { title: '注册时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '注册时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: ""
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: "" },
        { title: '操作人', dataIndex: 'operatorName', key: 'operatorName', valueType: 'select', valueEnum: operatorListEnum, initialValue: "" },
       
    ]

    const handleDelete=()=>{
        deleteModal.confirm({
            content:"确认要删除已选取的数据吗？",
            onOk(){
                deleteWhiteList({ids:selectedRow});
                onSelectChange([]);
            }
        })
    }

    const handleDeleteAll=()=>{
        deleteModal.confirm({
            content:"确认要清除所有白名单数据吗？",
            onOk(){
                deleteWhiteListAll(null);
                onSelectChange([]);
            }
        })

    }
    return (
        <ProTable<WhiteListReponse>
            columns={columns}
            dataSource={whiteList?.records || []}
            loading={isFetching}
            rowKey="id"
            rowSelection={{
                selectedRowKeys: selectedRow,
                onChange: onSelectChange,
            }}
            headerTitle={ <Space>
                <Button key="addButton" icon={<PlusOutlined />} type="primary" onClick={()=>setShowModal(true)}>添加</Button>
                <Button key="clearButton" type="primary" onClick={()=>handleDeleteAll()}>全部清空</Button>
                <Button key="deleteButton" type="primary" disabled={buttonDisabled} onClick={()=>handleDelete()}>删除</Button>
            </Space>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {deleteContextHolder}
                        <Button onClick={() => {
                            // @ts-ignore
                            form.resetFields();
                            setSearchList(initSearchList)
                            onSelectChange([]);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { addTimeRange, operatorName, phoneNo } = form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    addTimeEnd: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    addTimeStart: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    operatorId:operatorName,
                                    phoneNo,
                                });
                                onSelectChange([]);
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
                total: whiteList?.totalRecords,
                current: whiteList?.records?.length === 0 ? 0 : whiteList.currentPage,
            }}
        />

    )
}

export default WhiteListTable;

