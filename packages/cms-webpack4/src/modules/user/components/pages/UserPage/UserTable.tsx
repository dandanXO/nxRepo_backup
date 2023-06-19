import type { ProColumns, ProFormInstance } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Checkbox, Form, InputNumber, Modal, Radio, Select, Space, Tag, Tooltip, notification } from 'antd';
import moment from 'moment';
import queryString from 'query-string';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { ProColumnsOperationConstant } from '../../../../shared/components/common/ProColumnsOperationConstant';
import CopyText from '../../../../shared/components/other/CopyText';
import useValuesEnums from '../../../../shared/hooks/common/useValuesEnums';
import useGetChannelEnum from '../../../../shared/hooks/useGetChannelEnum';
import useGetUserQuotaLabelEnum from '../../../../shared/hooks/useGetUserQuotaLabelEnum';
import { getIsSuperAdmin } from '../../../../shared/storage/getUserInfo';
import { enumObjectToMap } from '../../../../shared/utils/format/enumObjectToMap';
import { selectSearchParams, setPathname, setSearchParams } from '../../../../shared/utils/searchParamsSlice';
import {
    useDeleteBlackListMutation,
    useDeleteUserMutation,
    useLazyGetUserManageListQuery,
    usePostTelSaleMutation,
    usePostUserBanMutation,
    usePostUserBanReleaseMutation,
    usePostUserManageQuotaLabelMutation,
} from '../../../api/UserApi';
import { GetUserListRequestQuerystring, UserListContent } from '../../../api/types/userTypes/getUserList';

interface UserTableProps {
    setShowModal?: React.Dispatch<React.SetStateAction<{ show: boolean; userId: string }>>;
    isPostBlackListSuccess?: boolean;
}

const UserTable = ({ setShowModal, isPostBlackListSuccess }: UserTableProps): JSX.Element => {
    const { riskRankEnum } = useValuesEnums();
    const { triggerGetChannelList, channelListEnum } = useGetChannelEnum();
    const { triggerGetUserQuotaLable, userQuotaLablEnum, userQuotaLablSelect } = useGetUserQuotaLabelEnum();

    const isSuperAdmin = getIsSuperAdmin();
    // api
    const [triggerGetList, { currentData, isFetching }] = useLazyGetUserManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const [deleteUser, { isLoading: isUserDeleting }] = useDeleteUserMutation();
    const [banUser, { isSuccess: isBanUserSuccess }] = usePostUserBanMutation();
    const [releaseUser, { isSuccess: isReleaseUserSuccess }] = usePostUserBanReleaseMutation();
    const [importTelSale] = usePostTelSaleMutation();
    const [removeBlack, { isSuccess: isRemoveBlackSuccess }] = useDeleteBlackListMutation();
    const [setQuotaLabel] = usePostUserManageQuotaLabelMutation();

    const initSearchList: GetUserListRequestQuerystring = {
        addEndTime: '',
        addStartTime: '',
        appName: '',
        channelId: '',
        idcardNo: '',
        nameTrue: '',
        newMember: '',
        noLoanAgain: false,
        hasVerifyNotApply: false,
        hasVerifyThirdRisk: false,
        noLoanAgainEndDays: 30,
        noLoanAgainStartDays: 1,
        phoneNo: '',
        riskRank: '',
        status: '',
        pageNum: 1,
        pageSize: 10,
    };
    // redux
    const history = useHistory();
    const dispatch = useDispatch();
    const { searchParams } = useSelector(selectSearchParams);
    // state
    const [searchList, setSearchList] = useState<GetUserListRequestQuerystring>(initSearchList);
    const [isNoLoanAgain, setIsNoLoanAgain] = useState(false);
    const [isImportTelSale, setIsImportTelSale] = useState(false);
    const [isExportRemainOrder, setIsExportRemainOrder] = useState(false);
    const [modal, contextHolder] = Modal.useModal();
    const [notice, noticeContextHolder] = notification.useNotification();

    useEffect(() => {
        if (Object.keys(searchParams).length > 0) {
            setSearchList(searchParams);
            setIsNoLoanAgain(searchParams.noLoanAgain === 'true');
            setIsImportTelSale(searchParams.noLoanAgain === 'true');
        }
    }, []);

    useEffect(() => {
        triggerGetList(searchList);
    }, [
        searchList,
        isUserDeleting,
        isBanUserSuccess,
        isReleaseUserSuccess,
        isRemoveBlackSuccess,
        isPostBlackListSuccess,
    ]);

    useEffect(() => {
        triggerGetChannelList(null);
        triggerGetUserQuotaLable(null);
    }, []);

    const handleToUserDetail = (userId) => {
        dispatch(setPathname({ pathname: '/user-info', previousPathname: '/user' }));
        dispatch(setSearchParams(searchList));
        history.push(`user-info/${userId}`);
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    const handleImportTelSale = () => {
        importTelSale({
            addEndTime: searchList.addEndTime,
            addStartTime: searchList.addStartTime,
            appName: searchList.addStartTime,
            channelId: searchList.channelId,
            nameTrue: searchList.nameTrue,
            noLoanAgain: searchList.noLoanAgain,
            noLoanAgainEndDays: searchList.noLoanAgainEndDays,
            noLoanAgainStartDays: searchList.noLoanAgainStartDays,
            phoneNo: searchList.phoneNo,
            riskRank: searchList.riskRank,
            status: searchList.status,
        })
            .unwrap()
            .then(() =>
                modal.success({
                    title: '您选择的笔数已全数成功导入电销',
                    content: '详情请至电销分配页面查看',
                    okText: '确定',
                }),
            )
            .catch(() => {
                //
            });
    };

    const [deleteModal, deleteContextHolder] = Modal.useModal();
    const [banModal, banContextHolder] = Modal.useModal();
    const handleDeleteUser = (id) => {
        deleteModal.confirm({
            content: '确认要清除该用户信息吗？',
            onOk() {
                deleteUser({ userId: Number(id) });
            },
        });
    };
    const handleBanUser = (id) => {
        banModal.confirm({
            title: '确认要禁止该用户登入吗？',
            content: '禁止用户登入后仍可以解禁',
            onOk() {
                banUser({ userId: Number(id) });
            },
        });
    };

    const handleRemoveBlack = (id) => {
        deleteModal.confirm({
            title: '确认要解除该用户的黑名单状态吗？',
            content: '解除黑名单状态后将回到加入黑名单前的状态',
            onOk() {
                removeBlack({ userId: Number(id) });
            },
        });
    };

    const handleReleaseUser = (id) => {
        banModal.confirm({
            title: '确认要解除该用户禁止登入吗？',
            content: '用户解禁后将回到黑名单状态',
            onOk() {
                releaseUser({ userId: Number(id) });
            },
        });
    };

    const getSearchParams = () => {
        // @ts-ignore
        const { addTimeRange, ...values } = formRef.current.getFieldValue();
        return {
            ...searchList,
            ...values,
            addEndTime: addTimeRange?.[1]?.format('YYYY-MM-DD 23:59:59') || '',
            addStartTime: addTimeRange?.[0]?.format('YYYY-MM-DD 00:00:00') || '',
            pageNum: 1,
        };
    };

    const handleExportUserList = (exportRemainOrder) => {
        const searchQueryString = queryString.stringify(getSearchParams());
        window.open(`/hs/admin/user-manage/user-download?${searchQueryString}&exportRemainOrder=${exportRemainOrder}`);
        setSearchList(getSearchParams());
    };

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

    const formRef = useRef<ProFormInstance>();

    const handleStatusOnChange = () => {
        // @ts-ignore
        const { addTimeRange } = formRef.current.getFieldValue();
        const [addStartTime, addEndTime] = addTimeRange
            ? addTimeRange.map((date) => date?.format('YYYY-MM-DD'))
            : ['', ''];
        setIsExportRemainOrder(addEndTime !== '' && addStartTime !== '' && addStartTime === addEndTime);
    };

    const [selectedRow, setSelectedRow] = useState([]);
    const [quotaLabelValue, setQuotaLabelValue] = useState('');
    const [quotaLabelSelectDisabled, setQuotaLabelSelectDisabled] = useState(false);
    const onSelectChange = (selectedRowKeys) => {
        setQuotaLabelSelectDisabled(selectedRowKeys.length > 0);
        setSelectedRow(selectedRowKeys);
    };

    const handleQuotaLabelChange = (value) => {
        if (value === '') return;
        setQuotaLabel({ quotaLabelId: value, userIds: selectedRow })
            .unwrap()
            .then(() => {
                onSelectChange([]);
                triggerGetList(searchList);
                setQuotaLabelValue('');
                notice['success']({ message: value === 0 ? '已移除额度标签' : '已加上额度标签' });
            });
    };

    const columns: ProColumns<UserListContent>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            align: 'left',
            width: ProColumnsOperationConstant.width[isSuperAdmin ? '5' : '3'],
            tooltip: (
                <div>
                    <div>▪ 黑名单：将用户列入黑名单。</div>
                    <div>▪ 清除：清除该用户信息。</div>
                    <div>▪ 禁止：禁止该用户登入。</div>
                    <div>▪ 解除：解除黑名单状态。</div>
                    <div>▪ 解禁：解除禁止登入。</div>
                </div>
            ),
            render: (text, record) => {
                const optionCheck = [
                    <a key="editable" onClick={() => handleToUserDetail(record.id)}>
                        查看
                    </a>,
                ];
                const optionClear = [
                    <a key="clear" onClick={() => handleDeleteUser(record.id)}>
                        清除
                    </a>,
                ];
                const optionRelease = [
                    <a key="forRelease" onClick={() => handleReleaseUser(record.id)}>
                        解禁
                    </a>,
                ];
                const optionBan = [
                    <a key="forbidden" onClick={() => handleBanUser(record.id)}>
                        禁止
                    </a>,
                ];
                const optionBlackList = [
                    <a key="blackList" onClick={() => setShowModal({ show: true, userId: record.id.toString() })}>
                        黑名单
                    </a>,
                ];
                const optionRemoveBlack = isSuperAdmin
                    ? [
                          <a key="removeBlack" onClick={() => handleRemoveBlack(record.id)}>
                              解除
                          </a>,
                      ]
                    : [];
                return record.status === 4
                    ? [...optionCheck, ...optionClear, ...optionBan, ...optionRemoveBlack]
                    : record.status === 13
                    ? [...optionCheck, ...optionClear, ...optionRelease]
                    : [...optionCheck, ...optionBlackList];
            },
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchParams.phoneNo || '' },
        {
            title: '姓名',
            dataIndex: 'nameTrue',
            key: 'nameTrue',
            initialValue: searchParams.nameTrue || '',
            render: (text) => <CopyText text={text} />,
        },
        { title: '性别', dataIndex: 'gender', key: 'gender', hideInSearch: true },
        { title: '年龄', dataIndex: 'age', key: 'age', hideInSearch: true },
        {
            title: '身份证号',
            dataIndex: 'idcardNo',
            key: 'idcardNo',
            initialValue: searchParams.idcardNo || '',
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '风控标签',
            dataIndex: 'riskRank',
            valueType: 'select',
            key: 'riskRank',
            valueEnum: riskRankEnum,
            initialValue: searchParams.riskRank || '',
        },
        {
            title: '是否新客',
            dataIndex: 'newMember',
            valueType: 'select',
            key: 'newMember',
            initialValue: searchParams.newMember || '',
            valueEnum: {
                '': { text: '不限' },
                true: { text: '是' },
                false: { text: '否' },
            },
        },
        {
            title: '用户状态',
            dataIndex: 'status',
            valueType: 'select',
            key: 'status',
            initialValue: searchParams.status || '',
            valueEnum: enumObjectToMap(statusEnum),
            fieldProps: { showSearch: true },
            render: (text, { status }) => {
                const tagStatus = statusEnum[status] || { color: '', text: '' };
                return statusEnum[status] ? <Tag color={tagStatus.color}>{tagStatus.text}</Tag> : '-';
            },
        },
        {
            title: '额度标签',
            dataIndex: 'quotaLabelId',
            valueType: 'select',
            key: 'quotaLabelId',
            initialValue: searchParams.quotaLabelId || '',
            valueEnum: userQuotaLablEnum,
            fieldProps: { showSearch: true },
            render: (text, { quotaLabelId }) => {
                const userQuotaLaProperty = quotaLabelId ? userQuotaLablEnum?.get(quotaLabelId || '') : '';
                return quotaLabelId ? <Tag color={userQuotaLaProperty?.color}>{userQuotaLaProperty?.text}</Tag> : '-';
            },
        },
        {
            title: '注册包名',
            dataIndex: 'appName',
            key: 'appName',
            initialValue: searchParams.appName || '',
            render: (text) => <CopyText text={text} />,
        },
        {
            title: '注册渠道',
            dataIndex: 'channelId',
            valueType: 'select',
            key: 'channelId',
            valueEnum: channelListEnum,
            fieldProps: { showSearch: true },
            initialValue: searchParams.channelId || '',
        },
        { title: '注册时间', dataIndex: 'addTime', key: 'addTime', hideInSearch: true, valueType: 'dateTime' },
        {
            title: '注册时间',
            dataIndex: 'addTimeRange',
            valueType: 'dateRange',
            key: 'addTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'], onChange: () => handleStatusOnChange() },
            hideInTable: true,
            initialValue:
                searchParams.addStartTime === undefined || searchParams.addStartTime === ''
                    ? ''
                    : [moment(searchParams.addStartTime), moment(searchParams.addEndTime)],
        },
        {
            title: '结清未复借',
            dataIndex: 'noLoanAgain',
            hideInTable: true,
            renderFormItem: (text, _, form) => {
                return (
                    <Form
                        form={form}
                        name={'noLoanAgain'}
                        initialValues={{ noLoanAgain: searchParams.noLoanAgain || isNoLoanAgain }}
                    >
                        <Form.Item>
                            <Radio.Group
                                value={isNoLoanAgain}
                                onChange={({ target: { value } }) => setIsNoLoanAgain(value)}
                            >
                                <Radio.Button value={true}>是</Radio.Button>
                                <Radio.Button value={false}>否</Radio.Button>
                            </Radio.Group>
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: '天数',
            dataIndex: 'noLoanAgainDays',
            key: 'noLoanAgainDays',
            initialValue: '',
            hideInTable: true,
            renderFormItem: (item, _, form) => {
                return (
                    <Form
                        form={form}
                        key={'noLoanAgainDays'}
                        initialValues={{
                            noLoanAgainStartDays: searchParams.noLoanAgainStartDays || 1,
                            noLoanAgainEndDays: searchParams.noLoanAgainEndDays || 30,
                        }}
                    >
                        <Form.Item style={{ whiteSpace: 'nowrap' }}>
                            <Form.Item
                                name="noLoanAgainStartDays"
                                style={{ display: 'inline-block', width: '100px', margin: '0 8px 0 0' }}
                            >
                                <InputNumber min={1} max={30} placeholder={'天'} disabled={!isNoLoanAgain} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>~</Form.Item>
                            <Form.Item
                                name="noLoanAgainEndDays"
                                style={{ display: 'inline-block', width: '100px', margin: '0 8px' }}
                            >
                                <InputNumber min={1} max={30} placeholder={'天'} disabled={!isNoLoanAgain} />
                            </Form.Item>
                            <Form.Item style={{ display: 'inline-block', marginBottom: 0 }}>天</Form.Item>
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: '通过认证未申请',
            dataIndex: 'hasVerifyNotApply',
            hideInTable: true,
            renderFormItem: (text, _, form) => {
                const checked = form.getFieldValue('hasVerifyNotApply');
                return (
                    <Form form={form} name="hasVerifyNotApply">
                        <Form.Item>
                            <Checkbox value={checked === 'true' ? 'false' : 'true'} checked={checked === 'true'} />
                        </Form.Item>
                    </Form>
                );
            },
        },
        {
            title: '通过外部风控',
            dataIndex: 'hasVerifyThirdRisk',
            hideInTable: true,
            renderFormItem: (text, _, form) => {
                const checked = form.getFieldValue('hasVerifyThirdRisk');
                return (
                    <Form form={form} name="hasVerifyThirdRisk">
                        <Form.Item>
                            <Checkbox value={checked === 'true' ? 'false' : 'true'} checked={checked === 'true'} />
                        </Form.Item>
                    </Form>
                );
            },
        },
    ];

    return (
        <ProTable<UserListContent>
            formRef={formRef}
            columns={columns}
            dataSource={currentData?.records || []}
            loading={isFetching}
            rowKey={({ id }) => id}
            headerTitle={
                <Space>
                    <Button key="button" disabled={!isImportTelSale} type="primary" ghost onClick={handleImportTelSale}>
                        导入电销
                    </Button>
                    <Select
                        value={quotaLabelValue}
                        allowClear={false}
                        placeholder="额度标签"
                        disabled={!quotaLabelSelectDisabled}
                        onChange={handleQuotaLabelChange}
                        options={userQuotaLablSelect}
                    />
                </Space>
            }
            rowSelection={{
                selectedRowKeys: selectedRow,
                onChange: onSelectChange,
            }}
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {deleteContextHolder}
                        {banContextHolder}
                        {contextHolder}
                        {noticeContextHolder}
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({ ...initSearchList, addTimeRange: '' });
                                setSearchList(initSearchList);
                                setIsImportTelSale(false);
                                setIsNoLoanAgain(false);
                                setIsExportRemainOrder(false);
                            }}
                        >
                            {resetText}
                        </Button>
                        <Button
                            type={'primary'}
                            onClick={() => {
                                // @ts-ignore
                                const { noLoanAgain, noLoanAgainStartDays, noLoanAgainEndDays } = form.getFieldValue();
                                if (noLoanAgain && noLoanAgainStartDays > noLoanAgainEndDays) {
                                    modal.warning({ content: '結清未複借終止天數，需大於結清未複借起始天數' });
                                    return;
                                }
                                setIsImportTelSale(noLoanAgain === 'true');
                                setIsNoLoanAgain(noLoanAgain === 'true');
                                setSearchList(getSearchParams());
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
            toolBarRender={() => [
                <Tooltip placement="top" title={'限制只能导出注册时间1天内且审核通过的用户资料'}>
                    <Button onClick={() => handleExportUserList(true)} type="primary" disabled={!isExportRemainOrder}>
                        导出剩馀单量
                    </Button>{' '}
                </Tooltip>,
                <Button onClick={() => handleExportUserList(false)} type="primary">
                    导出
                </Button>,
            ]}
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

export default UserTable;
