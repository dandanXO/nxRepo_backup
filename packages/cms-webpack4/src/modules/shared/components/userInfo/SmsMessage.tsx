import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

import { useLazyGetUserSMSListQuery } from '../../api/UserInfoApi';
import { GetUserSms } from '../../api/userInfoTypes/getUserSms';
import { UserId } from '../../domain/UserId';

const SmsMessage = ({ userId }: UserId): JSX.Element => {
    const [triggerGetList, { currentData, isLoading }] = useLazyGetUserSMSListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const columns: ProColumns<GetUserSms>[] = [
        { title: '发送号码', dataIndex: 'phone', key: 'phone' },
        { title: '内容', dataIndex: 'content', key: 'content', width: '50%' },
        { title: '发送类型', dataIndex: 'direction', key: 'direction' },
        { title: '发送时间', dataIndex: 'time', key: 'time', valueType: 'dateTime' },
    ];

    const [pageable, setPagealbe] = useState({ userId, pageNum: 1, pageSize: 10 });
    const [userSmsList, setUserSmsList] = useState<any>();
    useEffect(() => {
        triggerGetList(pageable);
    }, [pageable]);

    useEffect(() => {
        if (currentData !== undefined) {
            setUserSmsList(currentData);
        }
    }, [currentData]);

    const pageOnChange = (current, pageSize) => {
        setPagealbe({ ...pageable, pageNum: current, pageSize: pageSize });
    };

    return (
        <ProTable<GetUserSms>
            columns={columns}
            dataSource={(!isLoading && userSmsList?.records) || []}
            loading={isLoading}
            rowKey="id"
            search={false}
            options={false}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: userSmsList?.totalRecords,
                current: userSmsList?.records?.length === 0 ? 0 : userSmsList?.currentPage,
            }}
        />
    );
};

export default SmsMessage;
