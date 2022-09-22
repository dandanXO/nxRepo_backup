import { useState, useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import { ProForm, ProFormText } from '@ant-design/pro-components';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProCard, ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, Menu, Modal, Form, Input, Radio,Spin,Space } from 'antd';
import {useLazyGetMerchantManageListQuery ,usePostMerchantCreateMutation,usePutMerchantEditMutation } from "../../api";
import { GetMerchantListResponse } from "../../types/getMerchantList";


const MerchantManage = () => {
    const [domLoaded, setDomLoaded] = useState(false);
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetMerchantManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [merchantList, setMerchantList] = useState<GetMerchantListResponse[]>(currentData);
    const [postMerchantCreate, { isLoading: isMerchantCreating, isSuccess: postMerchantSuccess }] = usePostMerchantCreateMutation();
    const [putMerchantEdit, { isLoading: isMerchantEditing, isSuccess: putMerchantSuccess }] = usePutMerchantEditMutation();


    useEffect(() => {
        setDomLoaded(true);
        triggerGetList(null);
        setMerchantModalVisible(false)
    }, [putMerchantSuccess, postMerchantSuccess]);


    useEffect(() => {
        setMerchantList(currentData);
    }, [currentData])

    const columns: ProColumns<GetMerchantListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => {
                    setIsEdit(true);
                    setMerchantModalVisible(true)
                    form.setFieldsValue(record);
                }}>修改</a>,
            ],
        },
        { title: '商户编号', dataIndex: 'merchantId', key: 'merchantId', hideInSearch: true },
        { title: '商户名', dataIndex: 'name', key: 'name' , initialValue: ""},
        { title: '联系电话', dataIndex: 'contact', key: 'contact' , initialValue: ""},
        { title: '电子邮箱', dataIndex: 'email', key: 'email', hideInSearch: true },
        {
            title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all', key: 'enabled', valueEnum: {
                all: { text: '全部', status: 'Default' },
                true: { text: '启用', status: 'Success' },
                false: { text: '禁用', status: 'Default', },
            }
        },
        { title: '创建时间', dataIndex: 'createTime', hideInSearch: true, key: 'createTime', valueType: 'dateTime' },
        { title: '更新時間', dataIndex: 'updateTime', hideInSearch: true, key: 'updateTime', valueType: 'dateTime' },

    ]
    const [merchantModalVisible, setMerchantModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [form] = Form.useForm();


    const onFinish = (values: any) => {
        isEdit ? putMerchantEdit(values) : postMerchantCreate({ merchantId: values.merchantId, ...values });
        form.resetFields()
    };

    const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 16 },
    };

    const handleCloseModal = () => {
        setMerchantModalVisible(false)
        form.resetFields()
    }


  return (
        domLoaded  ? <PageContainer
            header={{
                ghost: true,
                breadcrumb: {
                    routes: [
                        { path: '', breadcrumbName: '首页', },
                        { path: '', breadcrumbName: '产品管理', },
                        { path: '', breadcrumbName: '商戶管理', },
                    ],
                },
            }}
        >
            <ProTable<GetMerchantListResponse>
                columns={columns}
                dataSource={merchantList}
                loading={isFetching}
                rowKey="id"
                headerTitle={<Button key="button" icon={<PlusOutlined />} type="primary" onClick={() => {
                    setMerchantModalVisible(true);
                    setIsEdit(false);
                }}>添加</Button>}
                search={{
                    collapsed: false,
                    labelWidth: 'auto',
                  // @ts-ignore
                    optionRender: ({ searchText, resetText }, { form }) => (
                        <Space>
                            <Button onClick={() => {
                                form.resetFields();
                                setMerchantList(currentData);

                            }}>{resetText}</Button>
                            <Button
                                type={'primary'}
                                onClick={() => {
                                  // @ts-ignore
                                    const { name, contact, enabled } = form.getFieldValue();
                                    const searchData = currentData
                                        .filter(i => name === "" ? i : i.name === name)
                                        .filter(i => contact === "" ? i : i.contact === contact)
                                        .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                                    setMerchantList(searchData);
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
                    reload: () => triggerGetList(null)
                }}
            />
            <Modal
                title={isEdit ? "编辑商户" : "添加商户"}
                open={merchantModalVisible}
                onCancel={handleCloseModal}
                onOk={form.submit}
            >
                <Spin spinning={isEdit ? isMerchantEditing : isMerchantCreating}>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish} initialValues={{
                        name: "",
                        contact: "",
                        email: "",
                        enabled: true
                    }}>
                        {isEdit && <Form.Item name="merchantId" label="商户编号" hidden >
                            <Input allowClear />
                        </Form.Item>}
                        <Form.Item name="name" label="商户名" rules={[{ required: true }]}>
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item name="contact" label="联系电话">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item name="email" label="电子邮箱">
                            <Input allowClear />
                        </Form.Item>
                        <Form.Item name="enabled" label="状态">
                            <Radio.Group >
                                <Radio value={true}>启用</Radio>
                                <Radio value={false}>禁用</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                </Spin>
            </Modal>

        </PageContainer> : null
    )
}

export default MerchantManage;

