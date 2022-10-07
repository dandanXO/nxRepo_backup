import { useState, useEffect, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {ProTable } from '@ant-design/pro-components';
import { useGetUserSMSListQuery } from "../api/UserApi";
import { GetUserSms } from '../api/types/getUserInfo';
import { GetUserId } from '../api/types/getUserId';

const SmsMessage = ({userId}:GetUserId) => {
    const { currentData: userSmsList, isLoading } = useGetUserSMSListQuery({ userId, pageNumber: 1, pageSize: 10 });

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

