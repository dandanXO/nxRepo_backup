import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio, Spin, Space, InputNumber } from 'antd';
import { useLazyGetMerchantManageListQuery, usePostMerchantCreateMutation,  } from "../../api";

import { GetUserResponse } from "../../types/getUserList";

import { GetAvailableMerchantResponse } from "../../types/getAvailbaleMerchant";
import moment from 'moment';
import {useGetAvailableMerchantListQuery} from "../../modules/product/api/ProductApi";
const UserManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const { currentData: merchantList, isSuccess: isGetMerchantListSuccess } = useGetAvailableMerchantListQuery(null);
    // const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetMerchantManageListQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });
    const currentDataArr = [{
        phoneNo: '9641766099',
        name: 'Swanti Man Tripatih',
        gender: '男',
        age: 34,
        idcardNo: '888899990000',
        windTag: 'best',
        isOldUser: true,
        addPackage: 'com.iron.pocket.android',
        addTime: '2022-08-19 08:03:12',
        channelName: 'sample:Google',
        isBlack: true,
    },
    {
        phoneNo: '964222229',
        name: 'Swaaaaaaaipatih',
        gender: '女',
        age: 24,
        idcardNo: '822222220000',
        windTag: 'reject',
        isOldUser: false,
        addPackage: 'com.iron.pocket.android2222',
        addTime: '2022-08-19 08:03:12',
        channelName: 'sample:Google222',
        isBlack: false,
    }]
    const [userList, setUserList] = useState<GetUserResponse[]>(currentDataArr);

    useEffect(() => {
        setUserList(currentDataArr);
        setDomLoaded(true);

    }, [])



    const addPackageValueEnum = merchantList?.reduce((prev, curr) => {
        return { ...prev, ...{ [curr.merchantId]: { text: curr.name } } }
    }, { 0: { text: '不限' } })


    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);

    const columns: ProColumns<GetUserResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => record.isBlack ?
                [<a key="editable" href="/userInfo">查看</a>, <a key="blackList" onClick={() => setShowModal(true)}>黑名单</a>] :
                [<a key="editable" href="/userInfo">查看</a>, <a key="clear">清除</a>, <a key="forbidden">禁止</a>]
            ,
        },

        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: '' },
        { title: '姓名', dataIndex: 'name', key: 'name', initialValue: '' },
        { title: '性别', dataIndex: 'gender', key: 'gender', hideInSearch: true },
        { title: '年龄', dataIndex: 'age', key: 'age', hideInSearch: true },
        { title: '身份证号', dataIndex: 'idcardNo', key: 'idcardNo', initialValue: '' },
        {
            title: '风控标签', dataIndex: 'windTag', valueType: 'select', initialValue: '', key: 'windTag',
            valueEnum: {
                '': { text: '不限', color: '' },
                'best': { text: '极好', color: 'green' },
                'good': { text: '良好', color: 'orange' },
                'medium': { text: '正常', color: 'blue' },
                'normal': { text: '普通', color: 'gold' },
                'reject': { text: '拒绝', color: 'lightGray' },
            },
        },
        {
            title: '是否新客', dataIndex: 'isOldUser', valueType: 'select', initialValue: '', key: 'isOldUser',
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '注册包名', dataIndex: 'addPackage', initialValue: '', key: 'addPackage' },
        {
            title: '注册渠道', dataIndex: 'channelName', valueType: 'select', initialValue: '0', key: 'channelName',
            valueEnum: addPackageValueEnum
        },
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
                        <Form.Item name="termRangeLow" style={{ display: 'inline-block', width: '100px', margin: '0 8px 0 0' }}>
                            <InputNumber min={1} max={10} placeholder={"最低天数"} disabled={!isNoLoanAgain} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>~</Form.Item>
                        <Form.Item name="termRangeHigh" style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}>
                            <InputNumber min={1} max={10} placeholder={"最高天数"} disabled={!isNoLoanAgain} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
                    </Form.Item>
                </Form>

            ],
        },
    ]
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();


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
            <ProTable<GetUserResponse>
                columns={columns}
                dataSource={userList}
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

