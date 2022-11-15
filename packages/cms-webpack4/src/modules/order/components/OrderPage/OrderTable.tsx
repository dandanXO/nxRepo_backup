// import { useEffect, useState } from 'react';
// import type { ProColumns } from '@ant-design/pro-components';
// import { ProTable } from '@ant-design/pro-components';
// import { Button, Form, InputNumber, Modal, Radio, Space,Tag } from 'antd';

// import { useLazyGetUserManageListQuery, useDeleteUserMutation, usePostUserBanMutation, usePostTelSaleMutation,usePostUserBanReleaseMutation } from '../../../api/UserApi';
// import moment from 'moment';
// import { setSearchParams, setPathname, selectSearchParams } from '../../../shared/utils/searchParamsSlice';
// import { useDispatch, useSelector } from "react-redux"
// import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
// import useValuesEnums from '../../../shared/hooks/useValuesEnums';


// const OrderTable = () => {
   
//     const { channelListEnum, riskRankEnum } = useValuesEnums();
//     // api
//     const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserManageListQuery({
//         pollingInterval: 0,
//         refetchOnFocus: false,
//         refetchOnReconnect: false
//     });
   
//     const initSearchList = {
//         addEndTime: "", addStartTime: "", appName: "", channelId: "", idcardNo: "", nameTrue: "", newMember: "", noLoanAgain: false,
//         noLoanAgainEndDays: 10, noLoanAgainStartDays: 1, phoneNo: "", riskRank: "", status: "", pageNum: 1, pageSize: 10
//     }
//     // redux
//     const history = useHistory();
//     const dispatch = useDispatch();
//     const { searchParams } = useSelector(selectSearchParams);
//     // state
//     const [userList, setUserList] = useState<GetUerListProps>({ records: [] });
//     const [searchList, setSearchList] = useState<GetUserListRequestQuerystring>(initSearchList);


//     useEffect(() => {
//         if (Object.keys(searchParams).length > 0) {
//             setSearchList(searchParams);
//         }
//     }, [])

//     useEffect(() => {
//         triggerGetList(searchList);
//     }, [searchList])

//     useEffect(() => {
//         if (currentData !== undefined) {
//             setUserList(currentData);
//         }
//     }, [currentData])

//     const handleToUserDetail=(userId)=>{
//         dispatch(setPathname({pathname:'/order-detail',previousPathname:'/order'}));
//         dispatch(setSearchParams(searchList));
//         history.push(`order-detail/${userId}`);
//     }

//     // const {pageable}=usePageable(userList);
//     const pageOnChange = (current, pageSize) => {
//         setSearchList({ ...searchList, pageNum: current, pageSize: pageSize })
//     }

//     const statusEnum = {
//         '': { text: '不限' },
//         '6': { text: '审核中', color: 'blue' },
//         '7': { text: '审核拒绝', color: 'red' },
//         '8': { text: '放款中', color: 'purple' },
//         '9': { text: '还款中', color: 'blue' },
//         '10': { text: '已完成', color: 'green' },
//         '11': { text: '放款失败', color: 'red' },
//         '12': { text: '已逾期', color: 'orange' },
//     };
    
//     const columns: ProColumns<UserListContent>[] = [
//         {
//             title: '操作',
//             valueType: 'option',
//             key: 'option',
//             align: 'left',
//             width:50,
//             render: (text, record, _, action) => {
//                 return <a key="editable" onClick={() => handleToUserDetail(record.id)} >查看</a>
//             }

//         },
//         { title: '订单编号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || ""},
//         { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || ""},
//         { title: '姓名', dataIndex: 'nameTrue', key: 'nameTrue', initialValue: searchParams.nameTrue || ""  },
//         {
//             title: '老客下单', dataIndex: 'newMember', valueType: 'select', key: 'newMember', initialValue: searchParams.newMember || "" ,
//             valueEnum: {
//                 '': { text: '不限' },
//                 true: { text: '是' },
//                 false: { text: '否' },
//             },
//         },
//         { title: 'APP名称', dataIndex: 'appName',  key: 'appName', initialValue: searchParams.appName || "" ,},
//         { title: '产品名称', dataIndex: 'productName', key: 'productName', initialValue: searchParams.productName || ""  },
//         { title: '身份证号', dataIndex: 'idcardNo', key: 'idcardNo', initialValue: searchParams.idcardNo || "" },
//         { title: '风控标签', dataIndex: 'riskRank', valueType: 'select', key: 'riskRank', valueEnum: riskRankEnum, initialValue: searchParams.riskRank || "" },
//         {
//             title: '是否新客', dataIndex: 'newMember', valueType: 'select', key: 'newMember', initialValue: searchParams.newMember || "" ,
//             valueEnum: {
//                 '': { text: '不限' },
//                 true: { text: '是' },
//                 false: { text: '否' },
//             },
//         },
//         {
//             title: '订单状态', dataIndex: 'status', valueType: 'select', key: 'status', initialValue: searchParams.status || "",
//             valueEnum:statusEnum,
//             render: (text, { status }) => {
//                 const tagStatus = statusEnum[status] || { color: '', text: '' };
//                 return <Tag color={tagStatus.color}>{tagStatus.text}</Tag>;
//             },
//         },
//         { title: '空放订单', dataIndex: 'dummy', key: 'dummy', hideInSearch: true, valueEnum: { true: { text: '是' }, false: { text: '否' } } },
//         { title: '申请金额', dataIndex: 'idcardNo', key: 'idcardNo', hideInSearch: true, initialValue: searchParams.idcardNo || "" },
//         { title: '到帐金额', dataIndex: 'idcardNo', key: 'idcardNo', hideInSearch: true, initialValue: searchParams.idcardNo || "" },
//         { title: '借款期限', dataIndex: 'idcardNo', key: 'idcardNo', hideInSearch: true, initialValue: searchParams.idcardNo || "" },
//         { title: '应还金额', dataIndex: 'idcardNo', key: 'idcardNo', hideInSearch: true, initialValue: searchParams.idcardNo || "" },
//         { title: '申请时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
//         {
//             title: '申请时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
//             fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
//             initialValue: (searchParams.addStartTime === undefined || searchParams.addStartTime === "") ? "" : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)]
//         },
//         { title: '放款时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
//         {
//             title: '放款时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
//             fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
//             initialValue: (searchParams.addStartTime === undefined || searchParams.addStartTime === "") ? "" : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)]
//         },
//         { title: '到期日', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
//         {
//             title: '到期日', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
//             fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
//             initialValue: (searchParams.addStartTime === undefined || searchParams.addStartTime === "") ? "" : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)]
//         },
//         {
//             title: '是否展期', dataIndex: 'newMember', valueType: 'select', key: 'newMember', initialValue: searchParams.newMember || "" ,
//             valueEnum: {
//                 '': { text: '不限' },
//                 true: { text: '是' },
//                 false: { text: '否' },
//             },
//         },
//         { title: '申请渠道', dataIndex: 'channelId', valueType: 'select',  key: 'channelId', valueEnum: channelListEnum, initialValue:searchParams.channelId || ''},
//         { title: '风控方案', dataIndex: 'idcardNo', key: 'idcardNo', hideInSearch: true, initialValue: searchParams.idcardNo || "" },
//     ]


//     return (
//         <ProTable<UserListContent>
//             columns={columns}
//             dataSource={userList?.records || []}
//             loading={isFetching}
//             rowKey="id"
//             // headerTitle={<Button key="button" disabled={!isImportTelSale} type="primary" ghost onClick={handleImportTelSale}>导入电销</Button>}
//             search={{
//                 labelWidth: 'auto',
//                 // @ts-ignore
//                 optionRender: ({ searchText, resetText }, { form }) => (
//                     <Space>
//                         <Button onClick={() => {
//                             //  form.resetFields();
//                             // @ts-ignore
//                             form.setFieldsValue({...initSearchList,addTimeRange:''})
//                             setSearchList(initSearchList);
    

//                         }}>{resetText}</Button>
//                         <Button
//                             type={'primary'}
//                             onClick={() => {
//                                 // @ts-ignore
//                                 const { addTimeRange, appName, channelId, idcardNo, nameTrue, newMember,noLoanAgain, noLoanAgainStartDays, noLoanAgainEndDays, phoneNo, riskRank,status } = form.getFieldValue();

                               
//                                 setSearchList({
//                                     ...searchList,
//                                     addEndTime: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
//                                     addStartTime: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
//                                     appName:appName,
//                                     channelId: channelId === '0' ? '' : channelId,
//                                     idcardNo: idcardNo,
//                                     nameTrue: nameTrue,
//                                     newMember: newMember,
//                                     noLoanAgain: noLoanAgain,
//                                     noLoanAgainEndDays: noLoanAgainEndDays,
//                                     noLoanAgainStartDays: noLoanAgainStartDays,
//                                     phoneNo: phoneNo,
//                                     riskRank: riskRank,
//                                     status:status
//                                 })
//                                 form.submit();
//                             }}
//                         >
//                             {searchText}
//                         </Button>
//                     </Space>
//                 ),
//             }}
//             options={{
//                 setting: { listsHeight: 400, },
//                 reload: () => triggerGetList(searchList)
//             }}
//             pagination={{
//                 showSizeChanger: true,
//                 defaultPageSize: 10,
//                 onChange: pageOnChange,
//                 total: userList?.totalRecords,
//                 current: userList?.records?.length === 0 ? 0 : userList.currentPage,
//                 // ...pageable,
//                 // onChange: pageOnChange,
//             }}
//         />

//     )
// }

// export default OrderTable;

