import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, Space, List, Tooltip } from 'antd';
import moment from 'moment';
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import useValuesEnums from '../../../shared/hooks/useValuesEnums';
import { InfoCircleOutlined } from "@ant-design/icons";
import { useLazyGetOrderReviewListQuery, usePostOrderReviewMutation } from '../../api/OrderReviewApi';
import { GetOrderReviewListRequestQuerystring, OrderReviewListResponse, GetOrderReviewListProps } from '../../api/types/getOrderReviewList';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';
import { selectRandomRows } from '../../../shared/utils/selectRandomRows';
import CopyText from '../../../shared/components/CopyText';
import {ProColumnsOperationConstant} from "../../../shared/components/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../shared/utils/getUserInfo';
import useGetMerchantEnum from '../../../shared/hooks/useGetMerchantEnum';
import useGetChannelEnum from '../../../shared/hooks/useGetChannelEnum';
import useGetProviderEnum from '../../../shared/hooks/useGetProviderEnum';
const OrderReviewTable = () => {

    const isSuperAdmin = getIsSuperAdmin();

    // Hooks
    const { triggerGetMerchantList, merchantListEnum } = useGetMerchantEnum();
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    const { triggerGetProviderList, providerListEnum } = useGetProviderEnum();

    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetOrderReviewListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [postOrderReview, { data, isSuccess: postOrderReviewIsSuccess }] = usePostOrderReviewMutation();

    const initSearchList: GetOrderReviewListRequestQuerystring = {
        addEndTime: "", addStartTime: "", appName: "", applyChannel: "", oldMember: "", orderNo: "",
        phoneNo: "", productName: "", provider: "", riskRank: "", userName: "", pageNum: 1, pageSize: 10
    }

    // state
    const [orderReviewList, setOrderReviewList] = useState<GetOrderReviewListProps>({ records: [] });
    const [modal, contextHolder] = Modal.useModal();
    const [errorModal, errorContextHolder] = Modal.useModal();
    const [buttonDisabled, setButtonDisbaled] = useState(true)
    const [randomInputValue, setRandomInputValue] = useState<number | string>("");
    const { searchList, setSearchList, handleToDetailPage, searchParams, selectedList, setSelectedList } = usePageSearchParams({ searchListParams: initSearchList });
    // redux
    const history = useHistory();

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList,postOrderReviewIsSuccess])

    useEffect(() => {
        if(isSuperAdmin){
            triggerGetMerchantList(null);
            triggerGetChannelList(null);
            triggerGetProviderList(null);
        };
    }, [isSuperAdmin])

    useEffect(() => {
        setButtonDisbaled(selectedList.length > 0 ? false : true);
        setRandomInputValue(selectedList.length === 0 ? "" : randomInputValue);
    }, [selectedList])

    useEffect(() => {
        if (currentData !== undefined) {
            setOrderReviewList(currentData)
        }
    }, [currentData])


    const handleToUserDetail = (userId, orderId, orderNo) => {
        history.push(`order-review-detail/${userId}/${orderId}/${orderNo}`);
        handleToDetailPage('/order-review-detail', '/order-review', selectedList)
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

    const onSelectChange = (selectedRowKeys) => {
        setSelectedList(selectedRowKeys);
    };

    const handleReviewAll = (status) => {
        const confirmText = status === 1 ? '通过' : '拒绝';
        const reasonText = status === 1 ? `批次审核通过` : `批次审核不通过`;
        modal.confirm({
            content: `确认全部审核${confirmText}吗？`,
            onOk() {
                postOrderReview({ orderNos: selectedList, status: status, reason: reasonText })
                    .unwrap()
                    .then()
                    .catch((error) => {
                        errorModal.error({
                            title: 'Error',
                            content: `审核${confirmText}失败`
                        })
                    });
            }
        });
    }

    const handleRandomInputOnchange = (e) => {

        const inputValue = e.target.value;
        if (inputValue === "") {
            setRandomInputValue("")
            return;
        }

        if (!isNaN(inputValue)) {
            setRandomInputValue(
                inputValue > 100 ? 100 :
                inputValue < 0 ? 0 :
                Number(inputValue).toFixed()
            )
        } else {
            setRandomInputValue(0);
        }
    }

    const handleSelectRandomRows = () => {
        const selectArray = selectRandomRows(orderReviewList?.records, randomInputValue, 'orderNo');
        if (!selectArray) return
        onSelectChange(selectArray);
    }

    // 风控标签
    const riskRankEnum = {
        '': { text: '不限', color: '' },
        'EXCELLENT': { text: '极好', color: 'green' },
        'NORMAL': { text: '正常', color: 'blue' },
        'ORDINARY': { text: '普通', color: 'gold' },
        'REJECT': { text: '拒绝', color: 'lightGray' },
        'GOOD': { text: '良好', color: 'orange' },
    }

    const columns: ProColumns<OrderReviewListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <a key="editable" onClick={() => handleToUserDetail(record.userId,record.id,record.orderNo)} >审核</a>
            ],
            width: ProColumnsOperationConstant.width["1"],
        },
        { title: '订单编号', dataIndex: 'orderNo', key: 'orderNo', initialValue: searchParams.orderNo || "" , render: (text) => <CopyText text={text} />},
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || "" , render: (text) => <CopyText text={text} />},
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || "" , render: (text) => <CopyText text={text} />},
        {
            title: '老客下单', dataIndex: 'oldMember', valueType: 'select', key: 'oldMember', initialValue: searchParams.oldMember || "",
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: 'APP名称', dataIndex: 'appName',  key: 'appName', initialValue: searchParams.appName || "" , render: (text) => <CopyText text={text} />},
        { title: '产品名称', dataIndex: 'productName', key: 'productName', initialValue: searchParams.productName || "", render: (text) => <CopyText text={text} />  },
        { title: '风控标签', dataIndex: 'riskRank', valueType: 'select', key: 'riskRank', valueEnum: riskRankEnum, initialValue: searchParams.riskRank || "" },
        {
            title: '空放订单', dataIndex: 'dummy', key: 'dummy', hideInSearch: true, valueEnum: {
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        { title: '申请金额', dataIndex: 'deviceMoney', key: 'deviceMoney', hideInSearch: true, align: 'right' },
        { title: '到帐金额', dataIndex: 'lendMoney', key: 'lendMoney', hideInSearch: true, align: 'right' },
        { title: '申请时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '申请时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue:
                (searchParams.searchList === undefined || searchParams.searchList.addStartTime === "")
                    ? ""
                    : [moment(searchParams.searchList.addStartTime), moment(searchParams.searchList.addEndTime)]
        },

    ]

    if (isSuperAdmin) {
        columns.splice(1, 0, {
            title: '商户名', dataIndex: 'merchantName', key: 'merchantName', valueEnum: merchantListEnum, valueType: 'select', initialValue: searchParams.merchantName || '',
            width: ProColumnsOperationConstant.width["2"],
        })
        columns.splice(6, 0, { title: '申请渠道', dataIndex: 'applyChannel', valueType: 'select', key: 'applyChannel', valueEnum: channelListEnum, initialValue: searchParams.applyChannel || '' })
        columns.splice(10, 0, { title: '风控应用', dataIndex: 'provider', valueType: 'select', key: 'provider', valueEnum: providerListEnum, initialValue: searchParams.provider || '' })
    }
    return (
        <ProTable<OrderReviewListResponse>
            columns={columns}
            dataSource={orderReviewList?.records || []}
            loading={isFetching}
            rowSelection={{
                selectedRowKeys: selectedList,
                onChange: onSelectChange,
            }}
            rowKey={({orderNo})=>orderNo}
            headerTitle={
                <Space>
                    <Button key="passButton" type="primary" ghost disabled={buttonDisabled} onClick={()=>handleReviewAll(1)}>全部通过</Button>
                    <Button key="rejectButton" type="primary" ghost disabled={buttonDisabled} onClick={()=>handleReviewAll(0)}>全部拒绝</Button>
                    <Input.Group compact>
                        <div style={{ padding: '4px 11px', border: '1px solid #d9d9d9' }}>
                            <Space>随机提取
                                <Tooltip title="以当前页面呈现笔数为总笔数，输入提取百分比，送出后由系统随机提取待审订单笔数。">
                                    <InfoCircleOutlined style={{ fontSize: '12px', color: '#c0bfbf' }} />
                                </Tooltip>
                            </Space>
                        </div>
                        <Input style={{ width: '30%' }} suffix="%" onChange={handleRandomInputOnchange} value={randomInputValue} placeholder={'0'} />
                        <Button type="primary" onClick={handleSelectRandomRows}>送出</Button>
                    </Input.Group>
                </Space>
            }
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space >
                        {contextHolder}
                        {errorContextHolder}
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    addTimeRange: '',
                                });
                                setSearchList(initSearchList);
                                onSelectChange([]);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { phoneNo, applyChannel, riskRank, userName, addTimeRange,appName,oldMember,orderNo,productName,provider,merchantName } = form.getFieldValue();
                                const merchant = merchantName ? merchantListEnum?.get(merchantName)?.text : '';
                                setSearchList({
                                    ...initSearchList,
                                    addEndTime: addTimeRange ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    addStartTime: addTimeRange ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    appName,
                                    applyChannel: applyChannel === "" ? "" : channelListEnum.get(applyChannel)?.text || "",
                                    phoneNo,
                                    oldMember,
                                    orderNo,
                                    productName,
                                    provider,
                                    riskRank,
                                    userName,
                                    merchantName: isSuperAdmin ? merchant : ''
                                });
                                onSelectChange([]);
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
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: orderReviewList?.totalRecords,
                current: orderReviewList?.records?.length === 0 ? 0 : orderReviewList?.currentPage,
            }}
        >

        </ProTable>
    );
}

export default OrderReviewTable;

