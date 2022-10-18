import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space } from 'antd';
import { GetUerListProps, UserListContent, GetUserListRequestQuerystring } from "../../../api/types/userTypes/getUserList";
import { useLazyGetUserManageListQuery, useDeleteUserMutation, usePostUserBanMutation, usePostTelSaleMutation } from '../../../api/types/UserApi';
import moment from 'moment';
import { setSearchParams, setPathname, selectSearchParams } from '../../../../shared/utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux"
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';
interface UserTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
}

const UserTable = ({ setShowModal }: UserTableProps) => {
   
    const { channelListEnum, riskRankEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [deleteUser, { isSuccess: isDeteleUserSuccess, isLoading: isUserDeleting, }] = useDeleteUserMutation();
    const [banUser] = usePostUserBanMutation();
    const [importTelSale] = usePostTelSaleMutation();

    const initSearchList: GetUserListRequestQuerystring = {
        addEndTime: "", addStartTime: "", appName: "", channelId: "", idcardNo: "", nameTrue: "", newMember: "", noLoanAgain: false,
        noLoanAgainEndDays: 10, noLoanAgainStartDays: 1, phoneNo: "", riskRank: "", status: "", pageNum: 1, pageSize: 10
    }

    // state
    const [userList, setUserList] = useState<GetUerListProps>({ content: [] });
    const [searchList, setSearchList] = useState<GetUserListRequestQuerystring>(initSearchList);
    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);
    const [isImportTelSale, setIsImportTelSale] = useState(false);
    const [modal, contextHolder] = Modal.useModal();


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
    }, [searchList, isUserDeleting])

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

    const handleImportTelSale=()=>{
        importTelSale({
            addEndTime:searchList.addEndTime,
            addStartTime:searchList.addStartTime,
            appName:searchList.addStartTime,
            channelId:searchList.channelId,
            nameTrue:searchList.nameTrue,
            noLoanAgain:searchList.noLoanAgain,
            noLoanAgainEndDays:searchList.noLoanAgainEndDays,
            noLoanAgainStartDays:searchList.noLoanAgainStartDays,
            phoneNo:searchList.phoneNo,
            riskRank:searchList.riskRank,
            status:searchList.status,
        })
    }
   
    const columns: ProColumns<UserListContent>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => record.isBlack ?
                [<a key="editable" onClick={()=>handleToUserDetail(record.id)} >查看</a>, <a key="blackList" onClick={() => setShowModal({ show: true, userId: record.id })}>黑名单</a>] :
                [<a key="editable" type="link" onClick={()=>handleToUserDetail(record.id)} >查看</a>,
                <a key="clear" onClick={() => deleteUser({ userId: Number(record.id) })}>清除</a>,
                <a key="forbidden" onClick={() => banUser({ userId: Number(record.id) })}>禁止</a>]
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || ""},
        { title: '姓名', dataIndex: 'nameTrue', key: 'nameTrue', initialValue: searchParams.nameTrue || ""  },
        { title: '性别', dataIndex: 'gender', key: 'gender', hideInSearch: true },
        { title: '年龄', dataIndex: 'age', key: 'age', hideInSearch: true },
        { title: '身份证号', dataIndex: 'idcardNo', key: 'idcardNo', initialValue: searchParams.idcardNo || "" },
        { title: '风控标签', dataIndex: 'riskRank', valueType: 'select', key: 'riskRank', valueEnum: riskRankEnum, initialValue: searchParams.riskRank || "" },
        {
            title: '是否新客', dataIndex: 'newMember', valueType: 'select', key: 'newMember', initialValue: searchParams.newMember || "" ,
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        {
            title: '用户状态', dataIndex: 'status', valueType: 'select', key: 'status', initialValue: searchParams.status || "",
            valueEnum: {
                '': { text: '不限' },
                '0': { text: '未提交' },
                '4': { text: '黑名单' },
                '14': { text: '认证通过' },
                '18': { text: '终审中' },
                '19': { text: '审核拒绝' },
                '20': { text: '审核通过' },
            },
        },
        { title: '注册包名', dataIndex: 'appName',  key: 'appName', initialValue: searchParams.appName || "" ,},
        { title: '注册渠道', dataIndex: 'channelId', valueType: 'select',  key: 'channelId', valueEnum: channelListEnum, initialValue:searchParams.channelId || ''},
        {
            title: '注册时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true,
            render: (text) => moment(Number(text) * 1000).format("YYYY-MM-DD HH:mm:ss")
        },
        {
            title: '注册时间', dataIndex: 'addTimeRange', valueType: 'dateRange', key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] }, hideInTable: true,
            initialValue: (searchParams.addStartTime === undefined || searchParams.addStartTime ==="" )? "" : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)]
        },
        {
            title: '结清未复借',
            dataIndex: 'noLoanAgain',
            colSize: 6,
            hideInTable: true,
            renderFormItem: (text, { }, form) => {
                return <Form form={form} name={'noLoanAgain'} initialValues={{ noLoanAgain:searchParams.noLoanAgain || isNoLoanAgain }} >
                    <Radio.Group value={isNoLoanAgain} onChange={({ target: { value } }) => setIsNoLoanAgain(value)} >
                        <Radio.Button value={true}>是</Radio.Button>
                        <Radio.Button value={false}>否</Radio.Button>
                    </Radio.Group>
                </Form>
            }
        },
        {
            title: '天数',
            dataIndex: 'noLoanAgainDays',
            key: 'noLoanAgainDays',
            initialValue: '',
            hideInTable: true,
            renderFormItem: (item, { }, form) => {
                return <Form form={form} key={'noLoanAgainDays'} initialValues={{ noLoanAgainStartDays: searchParams.noLoanAgainStartDays ||1, noLoanAgainEndDays:searchParams.noLoanAgainEndDays || 10 }} >
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


    return (
        <ProTable<UserListContent>
            columns={columns}
            dataSource={userList?.content || []}
            loading={isFetching}
            rowKey="id"
            headerTitle={<Button key="button" disabled={!isImportTelSale} type="primary" ghost onClick={handleImportTelSale}>导入电销</Button>}
            search={{
                // collapsed:false,
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {contextHolder}
                        <Button onClick={() => {
                            //  form.resetFields();
                            // @ts-ignore
                            form.setFieldsValue({...initSearchList,addTimeRange:''})
                            setSearchList(initSearchList);
                            setIsImportTelSale(false);
                            setIsNoLoanAgain(false);

                        }}>{resetText}</Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { addTimeRange, appName, channelId, idcardNo, nameTrue, newMember,noLoanAgain, noLoanAgainStartDays, noLoanAgainEndDays, phoneNo, riskRank,status } = form.getFieldValue();

                                if (noLoanAgain && noLoanAgainStartDays > noLoanAgainEndDays) {
                                    modal.warning({content:'結清未複借終止天數，需大於結清未複借起始天數'});
                                    return;
                                }
                            
                                setIsImportTelSale(noLoanAgain === "true" ? true : false)
              
                                setSearchList({
                                    ...searchList,
                                    addEndTime: addTimeRange[1] ? addTimeRange[1].format('YYYY-MM-DD 23:59:59') : '',
                                    addStartTime: addTimeRange[0] ? addTimeRange[0].format('YYYY-MM-DD 00:00:00') : '',
                                    appName:appName,
                                    channelId: channelId === '0' ? '' : channelId,
                                    idcardNo: idcardNo,
                                    nameTrue: nameTrue,
                                    newMember: newMember,
                                    noLoanAgain: noLoanAgain,
                                    noLoanAgainEndDays: noLoanAgainEndDays,
                                    noLoanAgainStartDays: noLoanAgainStartDays,
                                    phoneNo: phoneNo,
                                    riskRank: riskRank,
                                    status:status
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
                current: userList?.content?.length === 0 ? 0 : userList.number + 1,
            }}
        />

    )
}

export default UserTable;

