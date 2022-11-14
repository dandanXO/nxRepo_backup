
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useGetUserContactsListQuery,useLazyGetUserContactsListQuery } from '../../api/UserInfoApi';
import { UserId } from "../../../../types/UserId";
import { GetUserContacts } from "../../api/types/userInfoTypes/getUserContacts"
import { useEffect, useState } from 'react';
import usePageable from '../../hooks/usePageable';
const AddressBook = (({ userId }: UserId) => {

    const [triggerGetList, { currentData, isLoading, isFetching,isSuccess }] = useLazyGetUserContactsListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const columns: ProColumns<GetUserContacts>[] = [
        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: '最后添加时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', valueType: 'dateTime' },
    ]

    const [pageable,setPagealbe]=useState({ userId,pageNum: 1, pageSize: 10 })
    const [addressBook,setAddressBook]=useState<any>()
    useEffect(() => {
        triggerGetList(pageable)
    }, [pageable]);

    useEffect(()=>{
        if(currentData!==undefined){
            setAddressBook(currentData)
        }
    },[currentData])

    
    const pageOnChange = (current, pageSize) => {
        setPagealbe({ ...pageable, pageNum: current, pageSize: pageSize })
    }

    // const [pagination, setPagination] = useState(null);

    // useEffect(() => {
    //     if (currentData !== undefined) {
    //         const { pageable } = usePageable(currentData, triggerGetList, { userId })
    //         setPagination(pageable);
    //     }
    // }, [currentData])

    

    return (

        <ProTable<GetUserContacts>
            columns={columns}
            dataSource={!isLoading && addressBook?.records || []}
            loading={isFetching}
            rowKey="id"
            search={false}
            options={false}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: addressBook?.totalRecords,
                current:addressBook?.records?.length === 0 ? 0 : addressBook?.currentPage,
            }}
            // pagination={pagination}
        />

    )
})

export default AddressBook;

