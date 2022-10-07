import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, InputNumber, Modal, Radio, Space, message } from 'antd';

import { GetUerListProps, UserListContent, GetUserListResponse, GetUserListRequestQuerystring, GetUerProps } from "../api/types/getUserList";
import { useLazyGetUserManageListQuery, useGetChannelListQuery, useGetUserSMSListQuery } from '../api/UserApi';


interface UserTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
}

const UserTable = ({ setShowModal }: UserTableProps) => {

    const { currentData: channelList, isSuccess: isGetMerchantListSuccess } = useGetChannelListQuery(null);

    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [userList, setUserList] = useState<GetUerListProps>({ content: [] });

    const initSearchList: GetUserListRequestQuerystring = {
        addEndTime: "", addStartTime: "", channelId: "", hasOrder: "", idcardNo: "", nameTrue: "", newMember: "", noLoanAgain: false,
        noLoanAgainEndDays: 10, noLoanAgainStartDays: 1, phoneNo: "", riskRank: "", rnStatus: "", status: "", userStatus: 0,
        pageNum: 1, pageSize: 10
    }
    const [searchList, setSearchList] = useState<GetUserListRequestQuerystring>(initSearchList)

    const [form] = Form.useForm();

    useEffect(() => {
        console.log('searchList', searchList)
        triggerGetList(searchList)
    }, [searchList])

    useEffect(() => {

        if (currentData !== undefined) {
            setUserList(currentData)

        }
    }, [currentData])



    const channelListValueEnum = channelList?.reduce((prev, curr) => {
        return { ...prev, ...{ [curr.channelId]: { text: curr.name } } }
    }, { '0': { text: '不限' } })

    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);

    const columns: ProColumns<UserListContent>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => record.isBlack ?
                [<a key="editable" href={`#/user-info/${record.id}`}>查看</a>, <a key="blackList" onClick={() => setShowModal({show:true,userId:record.id})}>黑名单</a>] :
                [<a key="editable" href={`#/user-info/${record.id}`}>查看</a>, <a key="clear">清除</a>, <a key="forbidden">禁止</a>]
            ,
        },

        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: '' },
        { title: '姓名', dataIndex: 'nameTrue', key: 'nameTrue', initialValue: '' },
        { title: '性别', dataIndex: 'gender', key: 'gender', hideInSearch: true },
        { title: '年龄', dataIndex: 'age', key: 'age', hideInSearch: true },
        { title: '身份证号', dataIndex: 'idcardNo', key: 'idcardNo', initialValue: '' },
        {
            title: '风控标签', dataIndex: 'riskRank', valueType: 'select', initialValue: '', key: 'riskRank',
            valueEnum: {
                '': { text: '不限', color: '' },
                'EXCELLENT': { text: '极好', color: 'green' },

                'NORMAL': { text: '正常', color: 'blue' },
                'ORDINARY': { text: '普通', color: 'gold' },
                'REJECT': { text: '拒绝', color: 'lightGray' },
                'GOOD': { text: '良好', color: 'orange' },
            },
        },
        {
            title: '是否新客', dataIndex: 'newMember', valueType: 'select', initialValue: '', key: 'newMember',
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '注册包名', dataIndex: 'appName', initialValue: '', key: 'appName' },
        { title: '注册渠道', dataIndex: 'channelId', valueType: 'select', initialValue: '0', key: 'channelId', valueEnum: channelListValueEnum },
        { title: '注册时间', dataIndex: 'addTime', valueType: 'dateTime', key: 'addTime', hideInSearch: true },
        {
            title: '注册时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true, initialValue: ''
        },
        {
            title: '结清未复借',
            dataIndex: 'noLoanAgain',
            initialValue: isNoLoanAgain,
            colSize: 6,
            hideInTable: true,
            renderFormItem: (text) => {
                return <Radio.Group value={isNoLoanAgain} onChange={({ target: { value } }) => setIsNoLoanAgain(value)} >
                    <Radio.Button value={true}>是</Radio.Button>
                    <Radio.Button value={false}>否</Radio.Button>
                </Radio.Group>
            }
        },
        {
            title: '天数',
            dataIndex: 'noLoanAgainDays',
            key: 'noLoanAgainDays',
            initialValue: '',
            hideInTable: true,
            renderFormItem: (item, { }, form) => {
                return <Form form={form} key={'noLoanAgainDays'} initialValues={{ noLoanAgainStartDays: 1, noLoanAgainEndDays: 10 }} >
                    <Form.Item style={{ whiteSpace: 'nowrap' }} >
                        <Form.Item name="noLoanAgainStartDays" style={{ display: 'inline-block', width: '100px', margin: '0 8px 0 0' }}>
                            <InputNumber min={1} max={10} placeholder={"天"} disabled={!isNoLoanAgain} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>~</Form.Item>
                        <Form.Item name="noLoanAgainEndDays" style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}>
                            <InputNumber min={1} max={10} placeholder={"天"} disabled={!isNoLoanAgain} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
                    </Form.Item>
                </Form>
            }



        },
    ]

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    return (
        <ProTable<UserListContent>
            columns={columns}
            dataSource={userList?.content || []}
            loading={isLoading}
            rowKey="id"
            headerTitle={<Button key="button" disabled={!isNoLoanAgain} type="primary" ghost onClick={() => setShowModal(true)}>导入电销</Button>}
            search={{
                collapsed: false,
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button onClick={() => {
                            form.resetFields();
                            setSearchList(initSearchList);
                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { addTimeRange, channelId, idcardNo, nameTrue, newMember, noLoanAgain, noLoanAgainStartDays, noLoanAgainEndDays, phoneNo, riskRank } = form.getFieldValue();
                                // @ts-ignore

                                console.log('getFieldValue', form.getFieldValue());

                                if (noLoanAgainStartDays > noLoanAgainEndDays) {
                                    console.log('123')
                                    message.info('結清未複借終止天數，需大於結清未複借起始天數');
                                    return;
                                }

                                setSearchList({
                                    ...searchList,
                                    addEndTime: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    addStartTime: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    channelId: channelId === '0' ? '' : channelId,
                                    idcardNo: idcardNo,
                                    nameTrue: nameTrue,
                                    newMember: Boolean(newMember),
                                    noLoanAgain: noLoanAgain,
                                    noLoanAgainEndDays: noLoanAgainEndDays,
                                    noLoanAgainStartDays: noLoanAgainStartDays,
                                    phoneNo: phoneNo,
                                    riskRank: riskRank,
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
                reload: () => triggerGetList(searchList)
            }}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: userList.totalElements,
                current: userList.content.length === 0 ? 0 : userList.number + 1,
            }}
        />

    )
}

export default UserTable;

