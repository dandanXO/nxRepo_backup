
import { ProColumns, ProProvider } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useGetUserContactsListQuery ,useLazyGetUserContactsListQuery } from '../../../../shared/api/UserInfoApi';
import { GetUserContacts } from '../../../../shared/api/userInfoTypes/getUserContacts';
import { useEffect, useState } from 'react';
import { FormModalProps } from '../../../../shared/domain/FormModal';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ProColumnsOperationConstant } from "../../../../shared/components/common/ProColumnsOperationConstant";
const SmsConfigTable = ((props:FormModalProps & {isAddOrEditSuccess?:boolean}) => {

    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess }] = useLazyGetUserContactsListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [pageable, setPageable] = useState({ pageNum: 1, pageSize: 10 });
    const [addressBook, setAddressBook] = useState<any>();

    useEffect(() => {
        triggerGetList(pageable);
    }, [pageable]);

    useEffect(() => {
        setPageable({ pageNum: 1, pageSize: 20 });
    }, [props.isAddOrEditSuccess]);

    useEffect(() => {
        if (currentData !== undefined) {
            setAddressBook(currentData);
        }
    }, [currentData]);


    const pageOnChange = (current, pageSize) => {
        setPageable({ ...pageable, pageNum: current, pageSize: pageSize });
    };

    const handleEdit = ()=>{
        props.setShowModal(true);
        props.setIsEdit(true);
    };

    const columns: ProColumns<GetUserContacts>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            align: 'left',
            width: ProColumnsOperationConstant.width["2"],
            render: (text, record, _, action) => {
                return [
                    <a key="editable" onClick={handleEdit} >修改</a>,
                    <a key="editable" onClick={() => props.setShowModal(true)} >删除</a>];
            }
        },
        { title: '短信名称', dataIndex: 'name', key: 'name' },
        { title: '应用短信商', dataIndex: 'phone', key: 'phone' },
        { title: '短信类型', dataIndex: 'name', key: 'name' },
        { title: '备注', dataIndex: 'phone', key: 'phone' },
        { title: '创建时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', valueType: 'dateTime' },
        { title: '更新时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', valueType: 'dateTime' },
    ];


    return (

        <ProTable<GetUserContacts>
            columns={columns}
            dataSource={!isLoading && addressBook?.records || []}
            loading={isFetching}
            rowKey="id"
            search={false}
            options={false}
            headerTitle={<Button key="addButton" icon={<PlusOutlined />} type="primary" onClick={()=>props.setShowModal(true)}>添加</Button>}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: addressBook?.totalRecords,
                current: addressBook?.records?.length === 0 ? 0 : addressBook?.currentPage,
            }}
        />

    );
});

export default SmsConfigTable;

