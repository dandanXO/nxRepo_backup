import type { ProColumns } from '@ant-design/pro-components';
import {ProTable } from '@ant-design/pro-components';
import { useGetUserSMSListQuery } from "../../api/UserInfoApi";
import { GetUserSms } from '../../api/types/userInfoTypes/getUserSms';
import { UserId } from '../../../../types/UserId';

const SmsMessage = ({userId}:UserId) => {
    const { currentData: userSmsList, isLoading } = useGetUserSMSListQuery({ userId, pageNum: 1, pageSize: 10 });

    const columns: ProColumns<GetUserSms>[] = [

        { title: '发送号码', dataIndex: 'phone', key: 'phone' },
        { title: '内容', dataIndex: 'content', key: 'content', width: '50%' },
        { title: '发送类型', dataIndex: 'direction', key: 'direction' },
        { title: '发送时间', dataIndex: 'time', key: 'time', valueType: 'dateTime' },
    ]

    return (

        <ProTable<GetUserSms>
            columns={columns}
            dataSource={!isLoading && userSmsList.content || []}
            loading={isLoading}
            rowKey="id"
            search={false}
            options={false}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10
            }}
        />

    )
}

export default SmsMessage;

