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
import { NumberValidator } from '../../../../shared/utils/validator';

const UserReviewTable = () => {
   
    const { channelListEnum, riskRankEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserReviewListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });


    const initSearchList: GetUserReviewListRequestQuerystring = {
        phoneNo: "", regChannelId: "", registerEndTime: "", registerStartTime: "", riskRank: "", userName: "",  pageNum: 1, pageSize: 10
    }

    // state
    const [userReviewList, setUserList] = useState<GetUerReviewListProps>({ records: [] });
    const [searchList, setSearchList] = useState<GetUserReviewListRequestQuerystring>(initSearchList);
    const [modal, contextHolder] = Modal.useModal();
    const [selectedRow, setSelectedRow] = useState([]);

    // redux
    const history = useHistory();
    const dispatch = useDispatch();
    const { searchParams } = useSelector(selectSearchParams);



    useEffect(() => {
        console.log(searchParams.searchList)
        if(searchParams.searchList===undefined)return;
        if (Object.keys(searchParams.searchList).length > 0) {
            setSearchList(searchParams.searchList);
        }
        if (searchParams.selectedRow.length > 0) {
            setSelectedRow(searchParams.selectedRow);
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

    const handleToUserDetail = (userId) => {
        dispatch(setPathname({ pathname: '/user-review-info', previousPathname: '/user-review' }));
        dispatch(setSearchParams({searchList:searchList,selectedRow:selectedRow}));
        history.push(`user-review-info/${userId}`);
    }

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
    }

 
    const columns: ProColumns<UserReviewListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [<a key="editable" onClick={() => handleToUserDetail(record.userId)} >审核</a>]
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || "" },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: searchParams.userName || "" },
        { title: '风控标签', dataIndex: 'riskRank', valueType: 'select', key: 'riskRank', valueEnum: riskRankEnum, initialValue: searchParams.riskRank || "" },
        {
            title: '注册渠道', dataIndex: 'regChannelId', valueType: 'select', key: 'regChannelId', hideInTable: true,
            valueEnum: channelListEnum, initialValue: searchParams.regChannelId || ''
        },
        { title: '注册渠道', dataIndex: 'regChannelName', key: 'regChannelName', hideInSearch: true },
        { title: '注册时间', dataIndex: 'registerTime', key: 'registerTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '注册时间', dataIndex: 'registerTimeRange', valueType: 'dateRange', key: 'registerTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.registerStartTime === undefined || searchParams.registerStartTime === "") ? "" : [moment(searchParams.registerStartTime), moment(searchParams.registerEndTime)]
        },
    ]
 
    const [buttonDisabled,setButtonDisbaled]=useState(true)
    const [randomInputValue,setRandomInputValue]=useState<number|string>("");

    const onSelectChange = (selectedRowKeys) => {
        console.log('selectedRowKeys',selectedRowKeys)
        setButtonDisbaled(selectedRowKeys.length===0?true:false)
        setSelectedRow(selectedRowKeys);
        setRandomInputValue(selectedRowKeys.length===0?"":randomInputValue);
    };
    const rowSelection = {
        selectedRowKeys: selectedRow,
        onChange: onSelectChange,
    };

    const hey = () => {
        console.log('OK');
    }

    const handleReviewAll = (status) => {
        const confirmText = status === 1 ? '通过' : '拒绝'
        modal.confirm({ content: `确认全部审核${confirmText}吗？`, onOk() { hey() } });
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

    const handleSelectRandomRows=()=>{
        const userReviewListLength=userReviewList?.records.length;
        const selectLength=Number(userReviewListLength*Number(randomInputValue)/100).toFixed();
        console.log('selectLength',selectLength)
        if(Number(selectLength)===0)return;
        let selectArray=[]
        const userIds=userReviewList?.records.map(i=>i.userId);
        for (let i=0;i<Number(selectLength);i++){
            let randomSelect=Math.random()*userIds.length | 0;
            console.log('randomSelect',randomSelect)
            if(selectArray.includes(userIds[randomSelect])){
                i--;
            }else{
                selectArray.push(userIds[randomSelect]);
            }
        }

        console.log('selectArray',selectArray)

        onSelectChange(selectArray)
        
    }

    return (
        <ProTable<UserReviewListResponse>
            columns={columns}
            dataSource={userReviewList?.records || []}
            loading={isFetching}
            rowSelection={rowSelection}
            rowKey={({userId})=>userId}
            headerTitle={
                <Space>
                    <Button key="passButton" type="primary" ghost disabled={buttonDisabled} onClick={()=>handleReviewAll(1)}>全部通过</Button>
                    <Button key="rejectButton" type="primary" ghost disabled={buttonDisabled} onClick={()=>handleReviewAll(0)}>全部拒绝</Button>
                    <Input.Group compact>
                        <div style={{ padding: '4px 11px', border: '1px solid #d9d9d9' }}>随机提取</div>
                        <Input style={{ width: '30%' }} suffix="%" onChange={handleRandomInputOnchange} value={randomInputValue} placeholder={'0'}/>
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
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    registerTimeRange: '',
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
                                const { phoneNo, regChannelId, riskRank, userName, registerTimeRange } = form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    registerEndTime: registerTimeRange[1] ? registerTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    registerStartTime: registerTimeRange[0] ? registerTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    phoneNo,
                                    regChannelId,
                                    riskRank,
                                    userName
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
        >
            
        </ProTable>
    );
}

export default UserReviewTable;

