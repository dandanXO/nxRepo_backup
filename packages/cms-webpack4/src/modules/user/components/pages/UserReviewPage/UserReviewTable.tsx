import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, Input, Modal, Radio, Space } from 'antd';
import { GetUerReviewListProps,UserReviewListResponse,GetUserReviewListRequestQuerystring } from '../../../api/types/userReviewTypes/getUserReviewList';
import { useLazyGetUserReviewListQuery } from '../../../api/UserReviewApi';
import moment from 'moment';
import { setSearchParams, setPathname, selectSearchParams } from '../../../../shared/utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux"
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';
interface UserTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
}

const UserReviewTable = ({ setShowModal }: UserTableProps) => {
   
    const { channelListEnum, riskRankEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserReviewListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });


    const initSearchList: GetUserReviewListRequestQuerystring = {
        phoneNo: "", regChannelName: "", registerEndTime: "", registerStartTime: "", riskRank: "", userName: "",  pageNum: 1, pageSize: 10
    }

    // state
    const [userReviewList, setUserList] = useState<GetUerReviewListProps>({ records: [] });
    const [searchList, setSearchList] = useState<GetUserReviewListRequestQuerystring>(initSearchList);
    // const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);
    // const [isImportTelSale, setIsImportTelSale] = useState(false);
    // const [modal, contextHolder] = Modal.useModal();


    // redux
    const history = useHistory();
    const dispatch = useDispatch();
    const { searchParams } = useSelector(selectSearchParams);


    useEffect(() => {
        if (Object.keys(searchParams).length > 0) {
            setSearchList(searchParams);
        }
    }, [])

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList])

    useEffect(() => {
        if (currentData !== undefined) {
            setUserList(currentData)
        }
    }, [currentData])

    const handleToUserDetail=(userId)=>{
        dispatch(setPathname({pathname:'/user-info',previousPathname:'/user'}));
        dispatch(setSearchParams(searchList));
        history.push(`user-info/${userId}`);
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

 
    const columns: ProColumns<UserReviewListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [<a key="editable" onClick={()=>handleToUserDetail(record.userId)} >审核</a>]
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || "" },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || "" },
        { title: '风控标签', dataIndex: 'riskRank', valueType: 'select', key: 'riskRank', valueEnum: riskRankEnum, initialValue: searchParams.riskRank || "" },
        { title: '注册渠道', dataIndex: 'regChannelName', valueType: 'select', key: 'regChannelName', valueEnum: channelListEnum, initialValue: searchParams.channelId || '' },
        { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '注册时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.addStartTime === undefined || searchParams.addStartTime === "") ? "" : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)]
        },
    ]
    const [selectedRow, setSelectedRow] = useState([]);
    const [buttonDisabled,setButtonDisbaled]=useState(true)

    const onSelectChange = (selectedRowKeys) => {
        console.log(selectedRowKeys)
        setButtonDisbaled(selectedRowKeys.length===0?true:false)
        setSelectedRow(selectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: onSelectChange,
    };

    return (
        <ProTable<UserReviewListResponse>
            columns={columns}
            dataSource={userReviewList?.records || []}
            loading={isFetching}
            rowSelection={rowSelection}
            rowKey="id"
            headerTitle={
                <Space>
                    <Button key="button" type="primary" ghost disabled={buttonDisabled}>全部通过</Button>
                    <Button key="button" type="primary" ghost disabled={buttonDisabled}>全部拒绝</Button>
                    <Input.Group compact>
                        <div style={{ padding: '4px 11px', border: '1px solid #d9d9d9' }}>随机提取</div>
                        <Input style={{ width: '30%' }}  suffix="%"/>
                        <Button type="primary">送出</Button>
                    </Input.Group>
                </Space>
            }
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    addTimeRange: '',
                                });
                                setSearchList(initSearchList);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                // const { addTimeRange, appName, channelId, idcardNo, nameTrue, newMember,noLoanAgain, noLoanAgainStartDays, noLoanAgainEndDays, phoneNo, riskRank,status } = form.getFieldValue();

                                setSearchList({
                                    ...searchList,
                                    // addEndTime: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    // addStartTime: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    // appName:appName,
                                    // channelId: channelId === '0' ? '' : channelId,
                                    // idcardNo: idcardNo,
                                    // nameTrue: nameTrue,
                                    // newMember: newMember,
                                    // noLoanAgain: noLoanAgain,
                                    // noLoanAgainEndDays: noLoanAgainEndDays,
                                    // noLoanAgainStartDays: noLoanAgainStartDays,
                                    // phoneNo: phoneNo,
                                    // riskRank: riskRank,
                                    // status:status
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
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: userReviewList.totalRecords,
                current: userReviewList?.records?.length === 0 ? 0 : userReviewList.currentPage,
            }}
        />
    );
}

export default UserReviewTable;

