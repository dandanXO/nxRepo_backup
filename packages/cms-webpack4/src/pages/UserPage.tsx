import {useEffect, useState} from 'react';
import type {ProColumns} from '@ant-design/pro-components';
import {PageContainer, ProTable} from '@ant-design/pro-components';
import {Button, Form, Input, InputNumber, Modal, Radio, Space} from 'antd';

import {GetUerListProps,UserListContent,GetUserListResponse,GetUserListRequestQuerystring,GetUerProps} from "../modules/user/api/types/getUserList";
import { useLazyGetUserManageListQuery,useGetChannelListQuery ,useGetUserSMSListQuery} from '../modules/user/api/UserApi';
import useAutoLogin from '../modules/shared/hooks/useAutoLogin';
// import {useGetAvailableMerchantListQuery} from "../../modules/product/api/ProductApi";

const UserManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const { currentData:channelList, isSuccess: isGetMerchantListSuccess } = useGetChannelListQuery(null);
    const { currentData:userSmsList } = useGetUserSMSListQuery({userId:1000050, pageNumber:1,pageSize:10});
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [userList, setUserList] = useState<GetUerListProps>({content:[]});
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    useAutoLogin();
    useEffect(() => {
       

        setDomLoaded(true);
        console.log('132',form.getFieldsValue())
        triggerGetList({
            addEndTime:"",
            addStartTime:"",
            channelId:"",
            hasOrder:"",
            idcardNo:"",
            nameTrue:"",
            noLoanAgain:false,
            noLoanAgainEndDays:10,
            noLoanAgainStartDays:1,
            phoneNo:"",
            riskRank:"",
            rnStatus:"",
            status:"",
            userStatus:0,
            pageNum:1,
            pageSize:10
        })
    }, [])

    useEffect(()=>{
        console.log(channelList)
        console.log(userSmsList)
        // setUserList(currentData);
    },[currentData])



    const channelListValueEnum = channelList?.reduce((prev, curr) => {
        return { ...prev, ...{ [curr.channelId]: { text: curr.name } } }
    }, { 0: { text: '不限' } })


    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);

    const columns: ProColumns<UserListContent>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => record.isBlack ?
                [<a key="editable" href="/user-info">查看</a>, <a key="blackList" onClick={() => setShowModal(true)}>黑名单</a>] :
                [<a key="editable" href="/user-info">查看</a>, <a key="clear">清除</a>, <a key="forbidden">禁止</a>]
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
                'GOOD': { text: '良好', color: 'orange' },
                'NORMAL': { text: '正常', color: 'blue' },
                'ORDINARY': { text: '普通', color: 'gold' },
                'REJECT': { text: '拒绝', color: 'lightGray' },
            },
        },
        {
            title: '是否新客', dataIndex: 'newMember', valueType: 'select', initialValue: '', key: 'isOldUser',
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '注册包名', dataIndex: 'appName', initialValue: '', key: 'appName' },
        { title: '注册渠道', dataIndex: 'channelName', valueType: 'select', initialValue: '0', key: 'channelName', valueEnum: channelListValueEnum },
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
            renderFormItem: (text, record, _, action) => [
                <Form key={'formNoLoanAgainDays'} initialValues={{ termRangeLow: 1, termRangeHigh: 10 }} >
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

            ],
        },
    ]



    const onFinish = (values: any) => {
        // isEdit ? putMerchantEdit(values) : postMerchantCreate({ merchantId: values.merchantId, ...values });
        form.resetFields()
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 },
    };

    const handleCloseModal = () => {
        setShowModal(false)
        form.resetFields()
    }

    return (
        domLoaded ? <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        { path: '', breadcrumbName: '首页', },
                        { path: '', breadcrumbName: '用户管理', },
                        { path: '', breadcrumbName: '用户管理 ', },
                    ],
                },
            }}
        >
            <ProTable<UserListContent>
                columns={columns}
                dataSource={userList.content||[]}
                // loading={isFetching}
                rowKey="id"
                headerTitle={
                    <Button key="button" disabled={!isNoLoanAgain} type="primary" ghost onClick={() => setShowModal(true)}>导入电销</Button>
                }
                search={{
                    collapsed: false,
                    labelWidth: 'auto',
                    // @ts-ignore
                    optionRender: ({ searchText, resetText }, { form }) => (
                        <Space>
                            <Button onClick={() => {
                                form.resetFields();
                                // setMerchantList(currentData);
                            }}>{resetText}</Button>
                            <Button
                                type={'primary'}
                                onClick={() => {
                                    // const { name, contact, enabled } = form.getFieldValue();
                                    // @ts-ignore
                                    console.log(form.getFieldValue())
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
                    // reload: () => triggerGetList(null)
                }}
                pagination={{
                    showSizeChanger: true,
                    defaultPageSize: 10
                }}
            />
            <Modal
                title={"添加黑名单"}
                open={showModal}
                onCancel={handleCloseModal}
                onOk={form.submit}
            >
                {/* <Spin spinning={isEdit ? isMerchantEditing : isMerchantCreating}> */}
                <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{ comment: "" }}>
                    <Form.Item name="comment" label="备注" rules={[{ required: true }]} extra="提醒您，备注提交后即不可再修改">
                        <Input.TextArea allowClear rows={8} />
                    </Form.Item>
                </Form>
                {/* </Spin> */}
            </Modal>
        </PageContainer> : null
    )
}

export default UserManage;

