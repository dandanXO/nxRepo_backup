
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useGetUserContactsListQuery } from "../../api/types/UserInfoApi";
import { UserId } from "../../../../types/UserId";
import { GetUserContacts } from "../../api/types/userInfoTypes/getUserContacts"

const AddressBook = (({ userId }: UserId) => {

    const { currentData, isLoading } = useGetUserContactsListQuery({ userId, pageNumber: 1, pageSize: 10 });
    const columns: ProColumns<GetUserContacts>[] = [

        { title: '姓名', dataIndex: 'name', key: 'name' },
        { title: '手机号', dataIndex: 'phone', key: 'phone' },
        { title: '最后添加时间', dataIndex: 'lastUpdateTime', key: 'lastUpdateTime', valueType: 'dateTime' },
    ]

    return (

        <ProTable<GetUserContacts>
            columns={columns}
            dataSource={!isLoading && currentData?.content || []}
            loading={isLoading}
            rowKey="id"
            search={false}
            options={false}
            pagination={{
                // pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "300", "400", "500"],
                // pageSize:10,
                showSizeChanger: true,
                defaultPageSize: 10
                // onChange:pageOnChange
            }}
        />

    )
})

export default AddressBook;

