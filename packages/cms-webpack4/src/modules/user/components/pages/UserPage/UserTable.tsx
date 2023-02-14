import { useEffect, useState } from 'react';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Form, InputNumber, Modal, Radio, Space,Tag } from 'antd';
import { GetUerListProps, UserListContent, GetUserListRequestQuerystring } from "../../../api/types/userTypes/getUserList";
import { useLazyGetUserManageListQuery, useDeleteUserMutation, usePostUserBanMutation, usePostTelSaleMutation,usePostUserBanReleaseMutation ,useDeleteBlackListMutation} from '../../../api/UserApi';
import moment from 'moment';
import { setSearchParams, setPathname, selectSearchParams } from '../../../../shared/utils/searchParamsSlice';
import { useDispatch, useSelector } from "react-redux"
import { HashRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import useValuesEnums from '../../../../shared/hooks/useValuesEnums';
import queryString from "query-string";
import CopyText from '../../../../shared/components/CopyText';
import {ProColumnsOperationConstant} from "../../../../shared/components/atoms/ProColumnsOperationConstant";
import { getIsSuperAdmin } from '../../../../shared/utils/getUserInfo';
interface UserTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<Object>>;
    ispostBlackListSuccess?:boolean;
}

const UserTable = ({ setShowModal,ispostBlackListSuccess }: UserTableProps) => {

    const { channelListEnum, riskRankEnum } = useValuesEnums();
    const isSuperAdmin = getIsSuperAdmin();
    // api
    const [triggerGetList, { currentData, isLoading, isFetching, isSuccess, isError, isUninitialized }] = useLazyGetUserManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [deleteUser, { isSuccess: isDeteleUserSuccess, isLoading: isUserDeleting, }] = useDeleteUserMutation();
    const [banUser, { isSuccess: isBanUserSuccess }] = usePostUserBanMutation();
    const [releaseUser, { isSuccess: isReleaseUserSuccess }] = usePostUserBanReleaseMutation();
    const [importTelSale,{isSuccess:isImportTelSaleSuccess}] = usePostTelSaleMutation();
    const [removeBlack,{isSuccess:isRemoveBlackSuccess}] = useDeleteBlackListMutation();

    const initSearchList: GetUserListRequestQuerystring = {
        addEndTime: "", addStartTime: "", appName: "", channelId: "", idcardNo: "", nameTrue: "", newMember: "", noLoanAgain: false,
        noLoanAgainEndDays: 30, noLoanAgainStartDays: 1, phoneNo: "", riskRank: "", status: "", pageNum: 1, pageSize: 10
    }
    // redux
    const history = useHistory();
    const dispatch = useDispatch();
    const { searchParams } = useSelector(selectSearchParams);
    // state
    const [userList, setUserList] = useState<GetUerListProps>({ records: [] });
    const [searchList, setSearchList] = useState<GetUserListRequestQuerystring>(initSearchList);
    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);
    const [isImportTelSale, setIsImportTelSale] = useState(false);
    const [modal, contextHolder] = Modal.useModal();


    useEffect(() => {
        if (Object.keys(searchParams).length > 0) {
            setSearchList(searchParams);
            setIsNoLoanAgain(searchParams.noLoanAgain === "true" ? true : false);
            setIsImportTelSale(searchParams.noLoanAgain === "true" ? true : false);
        }
    }, [])

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList, isUserDeleting,isBanUserSuccess,isReleaseUserSuccess,isRemoveBlackSuccess,ispostBlackListSuccess])

    useEffect(() => {
        if (currentData !== undefined) {
            setUserList(currentData);
        }
    }, [currentData])

    const handleToUserDetail=(userId)=>{
        dispatch(setPathname({pathname:'/user-info',previousPathname:'/user'}));
        dispatch(setSearchParams(searchList));
        history.push(`user-info/${userId}`);
    }

    // const {pageable}=usePageable(userList);
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
        }).unwrap()
        .then((payload) => modal.success({ title: "您选择的笔数已全数成功导入电销", content: "详情请至电销分配页面查看", okText: "确定" }))
        .catch((error) => {})
    }

    const [deleteModal, deleteContextHolder] = Modal.useModal();
    const [banModal, banContextHolder] = Modal.useModal();
    const handleDeleteUser=(id)=>{
        deleteModal.confirm({content:"确认要清除该用户信息吗？", onOk() { deleteUser({ userId: Number(id) }) } });
    }
    const handleBanUser = (id) => {
        banModal.confirm({
            title: "确认要禁止该用户登入吗？",
            content: "禁止用户登入后仍可以解禁",
            onOk() { banUser({ userId: Number(id) }) }
        });
    }

    const handleRemoveBlack = (id) => {
        deleteModal.confirm({
            title: "确认要解除该用户的黑名单状态吗？",
            content: "解除黑名单状态后将回到加入黑名单前的状态",
            onOk() { removeBlack({ userId: Number(id) }) }
        });
    }

    const handleReleaseUser = (id) => {
        banModal.confirm({
            title: "确认要解除该用户禁止登入吗？",
            content: "用户解禁后将回到黑名单状态",
            onOk() { releaseUser({ userId: Number(id) }) }
        });
    }
    const handleExportUserList = () => {
        const searchQueryString = queryString.stringify(searchList);
        window.open(`/hs/admin/user-manage/user-download?${searchQueryString}`);
    }
    const statusEnum = {
        '': { text: '不限' },
        '0': { text: '未认证', color: 'orange' },
        '4': { text: '黑名单', color: 'default' },
        '13': { text: '禁止登入', color: 'default' },
        '14': { text: '认证通过', color: 'success' },
        '18': { text: '终审中', color: 'purple' },
        '19': { text: '审核拒绝', color: 'error' },
        '20': { text: '审核通过', color: 'processing' },
    };

    const columns: ProColumns<UserListContent>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            align: 'left',
            width: ProColumnsOperationConstant.width[isSuperAdmin ? "5" : "3"],
            render: (text, record, _, action) => {
                const optionCheck = [<a key="editable" onClick={() => handleToUserDetail(record.id)} >查看</a>];
                const optionClear = [<a key="clear" onClick={() => handleDeleteUser(record.id)}>清除</a>];
                const optionRelease = [<a key="forRelease" onClick={() => handleReleaseUser(record.id)}>解禁</a>];
                const optionBan = [<a key="forbidden" onClick={() => handleBanUser(record.id)}>禁止</a>];
                const optionBlackList = [<a key="blackList" onClick={() => setShowModal({ show: true, userId: record.id })}>黑名单</a>];
                const optionRemoveBlack = isSuperAdmin ? [<a key="removeBlack" onClick={() => handleRemoveBlack(record.id )}>解除</a>] : [];
                return record.status === 4 ? [...optionCheck, ...optionClear, ...optionBan,...optionRemoveBlack] :
                       record.status === 13 ? [...optionCheck, ...optionClear, ...optionRelease] :
                       [...optionCheck, ...optionBlackList]
            }

        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || ""},
        { title: '姓名', dataIndex: 'nameTrue', key: 'nameTrue', initialValue: searchParams.nameTrue || "", render: (text) => <CopyText text={text} />   },
        { title: '性别', dataIndex: 'gender', key: 'gender', hideInSearch: true },
        { title: '年龄', dataIndex: 'age', key: 'age', hideInSearch: true },
        { title: '身份证号', dataIndex: 'idcardNo', key: 'idcardNo', initialValue: searchParams.idcardNo || "", render: (text) => <CopyText text={text} />  },
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
            valueEnum:statusEnum,
            render: (text, { status }) => {
                const tagStatus = statusEnum[status] || { color: '', text: '' };
                return statusEnum[status] ? <Tag color={tagStatus.color}>{tagStatus.text}</Tag> : '-';
            },
        },
        { title: '注册包名', dataIndex: 'appName',  key: 'appName', initialValue: searchParams.appName || "" , render: (text) => <CopyText text={text} /> },
        { title: '注册渠道', dataIndex: 'channelId', valueType: 'select',  key: 'channelId', valueEnum: channelListEnum, initialValue:searchParams.channelId || ''},
        {
            title: '注册时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime'
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
                return <Form form={form} name={'noLoanAgain'} initialValues={{ noLoanAgain: searchParams.noLoanAgain || isNoLoanAgain }}>
                    <Form.Item>
                        <Radio.Group value={isNoLoanAgain} onChange={({ target: { value } }) => setIsNoLoanAgain(value)} >
                            <Radio.Button value={true}>是</Radio.Button>
                            <Radio.Button value={false}>否</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
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
                return <Form form={form} key={'noLoanAgainDays'} initialValues={{ noLoanAgainStartDays: searchParams.noLoanAgainStartDays ||1, noLoanAgainEndDays:searchParams.noLoanAgainEndDays || 30 }} >
                    <Form.Item style={{ whiteSpace: 'nowrap' }} >
                        <Form.Item name="noLoanAgainStartDays" style={{ display: 'inline-block', width: '100px', margin: '0 8px 0 0' }}>
                            <InputNumber min={1} max={30} placeholder={"天"} disabled={!isNoLoanAgain} />
                        </Form.Item>
                        <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>~</Form.Item>
                        <Form.Item name="noLoanAgainEndDays" style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}>
                            <InputNumber min={1} max={30} placeholder={"天"} disabled={!isNoLoanAgain} />
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
            dataSource={userList?.records || []}
            loading={isFetching}
            rowKey="id"
            headerTitle={<Button key="button" disabled={!isImportTelSale} type="primary" ghost onClick={handleImportTelSale}>导入电销</Button>}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {deleteContextHolder}
                        {banContextHolder}
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
                                setIsNoLoanAgain(noLoanAgain === "true" ? true : false);
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
                                    status:status,
                                    pageNum: 1,
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
            toolBarRender={() => [<Button onClick={handleExportUserList} type='primary'>导出</Button>]}
            pagination={{
                showSizeChanger: true,
                defaultPageSize: 10,
                onChange: pageOnChange,
                total: userList?.totalRecords,
                current: userList?.records?.length === 0 ? 0 : userList.currentPage,
                // ...pageable,
                // onChange: pageOnChange,
            }}
        />

    )
}

export default UserTable;

