import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

import { ProColumnsOperationConstant } from '../../../shared/components/common/ProColumnsOperationConstant';
import CopyText from '../../../shared/components/other/CopyText';
import useGetMerchantEnum from '../../../shared/hooks/common/useGetMerchantEnum';
import { getIsSuperAdmin } from '../../../shared/storage/getUserInfo';
import { enumObjectToMap } from '../../../shared/utils/format/enumObjectToMap';
import { useLazyGetPayReceiptListQuery, usePostPayReceiptConfirmMutation } from '../../api/PayReceiptApi';
import { GetPayReceiptListRequestQuerystring, PayReceiptList } from '../../api/types/PayReceiptTypes/getPayReceiptList';

const PayReceiptTable = (): JSX.Element => {
    const isSuperAdmin = getIsSuperAdmin();
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const initSearchList: GetPayReceiptListRequestQuerystring = {
        createTimeEnd: '',
        createTimeStart: '',
        merchantId: '',
        orderNo: '',
        phoneNo: '',
        status: 0,
        userName: '',
        utr: '',
        pageNum: 1,
        pageSize: 10,
    };

    // state
    const [searchList, setSearchList] = useState(initSearchList);
    const [selectedList, setSelectedList] = useState([]);
    const [modal, contextHolder] = Modal.useModal();
    // api
    const [triggerGetList, { currentData, isFetching }] = useLazyGetPayReceiptListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const [postPayReceipt, { isSuccess: isPostPayReceiptSuccess }] = usePostPayReceiptConfirmMutation();

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList, isPostPayReceiptSuccess]);

    useEffect(() => {
        if (isSuperAdmin) {
            triggerGetMerchantList(null);
        }
    }, [isSuperAdmin]);

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    const onSelectChange = (selectedRowKeys) => {
        setSelectedList(selectedRowKeys);
    };

    const handlePayReceiptConfirm = (orderNo) => {
        modal.confirm({
            title: `确认要将已选订单状态改为已确认吗？`,
            onOk() {
                postPayReceipt({ orderNos: orderNo })
                    .unwrap()
                    .then(() => setSelectedList([]))
                    .catch(() => {
                        //
                    });
            },
        });
    };

    const statusEnum = {
        '': { text: '不限' },
        '0': { text: '未确认', color: 'orange' },
        '1': { text: '已确认', color: 'green' },
    };

    const utrOrReceiptimgColumn: ProColumns =
        appInfo.COUNTRY !== 'Pakistan' && appInfo.COUNTRY !== 'Bangladesh'
            ? {
                  title: 'UTR',
                  dataIndex: 'utr',
                  key: 'utr',
                  initialValue: '',
                  render: (text) => <CopyText text={text} />,
              }
            : {
                  title: '还款明细',
                  dataIndex: 'receiptImageUrl',
                  key: 'receiptImageUrl',
                  valueType: 'image',
                  hideInSearch: true,
                  align: 'center',
              };

    const columns: ProColumns<PayReceiptList>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            align: 'left',
            width: '50px',
            render: (text, record) => {
                return (
                    <a key="editable" onClick={() => handlePayReceiptConfirm([record.orderNo])}>
                        确认
                    </a>
                );
            },
        },
        {
            title: '订单编号',
            dataIndex: 'orderNo',
            key: 'orderNo',
            initialValue: '',
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '手机号',
            dataIndex: 'phoneNo',
            key: 'phoneNo',
            initialValue: '',
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
            initialValue: '',
            render: (text) => <CopyText text={text} />,
        },
        {
            title: 'APP名称',
            dataIndex: 'appName',
            key: 'appName',
            hideInSearch: true,
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '产品名称',
            dataIndex: 'productName',
            key: 'productName',
            hideInSearch: true,
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '确认状态',
            dataIndex: 'status',
            valueType: 'select',
            key: 'status',
            initialValue: '0',
            align: 'center',
            valueEnum: enumObjectToMap(statusEnum),
            render: (text, { status }) => {
                const tagStatus = statusEnum[status] || { color: '', text: '' };
                return statusEnum[status] ? <Tag color={tagStatus.color}>{tagStatus.text}</Tag> : '-';
            },
        },
        { title: '应还金额', dataIndex: 'deviceMoney', key: 'deviceMoney', hideInSearch: true, align: 'right' },
        { ...utrOrReceiptimgColumn },
        { title: '操作人', dataIndex: 'operator', key: 'operator', hideInSearch: true },
        { title: '建立时间', dataIndex: 'createTime', key: 'createTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '建立时间',
            dataIndex: 'createTimeRange',
            valueType: 'dateRange',
            key: 'createTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] },
            hideInTable: true,
            initialValue: '',
        },
        { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime', valueType: 'dateTime', hideInSearch: true },
    ];
    if (isSuperAdmin) {
        columns.splice(
            1,
            0,
            {
                title: '商户名',
                dataIndex: 'merchantName',
                key: 'merchantName',
                hideInSearch: true,
                width: ProColumnsOperationConstant.width['2'],
            },
            {
                title: '商户名',
                dataIndex: 'merchantId',
                key: 'merchantId',
                valueEnum: merchantListEnum,
                valueType: 'select',
                initialValue: '',
                hideInTable: true,
            },
        );
    }

    return (
        <ProTable<PayReceiptList>
            columns={columns}
            dataSource={currentData?.records || []}
            loading={isFetching}
            rowSelection={{
                selectedRowKeys: selectedList,
                onChange: onSelectChange,
            }}
            rowKey={({ orderNo }) => orderNo}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {contextHolder}
                        <Button
                            onClick={() => {
                                //  form.resetFields();
                                // @ts-ignore
                                form.setFieldsValue({ ...initSearchList, createTimeRange: '' });
                                setSearchList(initSearchList);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                const {
                                    createTimeRange,
                                    merchantId = '',
                                    orderNo,
                                    phoneNo,
                                    status,
                                    userName,
                                    utr = '',
                                    // @ts-ignore
                                } = form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    createTimeEnd: createTimeRange
                                        ? createTimeRange[1].format('YYYY-MM-DD 23:59:59')
                                        : '',
                                    createTimeStart: createTimeRange
                                        ? createTimeRange[0].format('YYYY-MM-DD 00:00:00')
                                        : '',
                                    status: status === '' ? '' : Number(status),
                                    merchantId,
                                    orderNo,
                                    phoneNo,
                                    userName,
                                    utr,
                                    pageNum: 1,
                                });
                                form.submit();
                            }}
                        >
                            {searchText}
                        </Button>
                    </Space>
                ),
            }}
            options={{
                setting: { listsHeight: 400 },
                reload: () => triggerGetList(searchList),
            }}
            headerTitle={
                <Button
                    type="primary"
                    ghost
                    onClick={() => handlePayReceiptConfirm(selectedList)}
                    disabled={selectedList.length === 0}
                >
                    全部确认
                </Button>
            }
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: currentData?.totalRecords,
                current: currentData?.records?.length === 0 ? 0 : currentData?.currentPage,
            }}
        />
    );
};

export default PayReceiptTable;
