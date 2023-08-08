import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Input, List, Modal, Space } from 'antd';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { ProColumnsOperationConstant } from '../../../shared/components/common/ProColumnsOperationConstant';
import useValuesEnums from '../../../shared/hooks/common/useValuesEnums';
import usePageSearchParams from '../../../shared/hooks/usePageSearchParams';
import { useLazyGetUserReviewListQuery } from '../../api/UserReviewApi';
import { usePostUserReviewMutation } from '../../api/UserReviewApi';
import {
    GetUserReviewListProps,
    GetUserReviewListRequestQuerystring,
    UserReviewListResponse,
} from '../../api/types/userReviewTypes/getUserReviewList';

const UserReviewTable = (): JSX.Element => {
    const { channelListEnum, riskRankEnum } = useValuesEnums();
    // api
    const [triggerGetList, { currentData, isFetching }] = useLazyGetUserReviewListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false,
    });
    const [postUserReview, { data, isSuccess: postUserReviewIsSuccess }] = usePostUserReviewMutation();

    const initSearchList: GetUserReviewListRequestQuerystring = {
        phoneNo: '',
        regChannelId: '',
        registerEndTime: '',
        registerStartTime: '',
        riskRank: '',
        userName: '',
        pageNum: 1,
        pageSize: 10,
    };

    // hooks
    const { searchList, setSearchList, savePath } = usePageSearchParams({
        searchListParams: initSearchList,
    });

    // state
    const [userReviewList, setUserList] = useState<GetUserReviewListProps>({ records: [] });
    const [modal, contextHolder] = Modal.useModal();
    const [selectedRow, setSelectedRow] = useState([]);
    const [errorModal, errorContextHolder] = Modal.useModal();
    const [buttonDisabled, setButtonDisbaled] = useState(true);
    const [randomInputValue, setRandomInputValue] = useState<number | string>('');
    // redux
    const history = useHistory();

    useEffect(() => {
        triggerGetList(searchList);
    }, [searchList, postUserReviewIsSuccess]);

    useEffect(() => {
        if (currentData !== undefined) {
            setUserList(currentData);
        }
    }, [currentData]);

    useEffect(() => {
        // 送出審核 - 錯誤訊息提醒
        if (data && data.length !== 0) {
            errorModal.error({
                title: 'Error',
                content: (
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item) => (
                            <List.Item>
                                <List.Item.Meta title={`用户ID - ${item.userId}`} description={item.errorMessage} />
                            </List.Item>
                        )}
                    />
                ),
            });
        }
    }, [postUserReviewIsSuccess]);

    const handleToUserDetail = (userId) => {
        history.push(`/userManage/userLastCheck/review/${userId}`);
        savePath('/userManage/userLastCheck', '/userManage/userLastCheck/review');
    };

    const pageOnChange = (current, pageSize) => {
        setSearchList({ ...searchList, pageNum: current, pageSize: pageSize });
    };

    const onSelectChange = (selectedRowKeys) => {
        setButtonDisbaled(selectedRowKeys.length === 0);
        setSelectedRow(selectedRowKeys);
        setRandomInputValue(selectedRowKeys.length === 0 ? '' : randomInputValue);
    };

    const handleReviewAll = (status) => {
        const confirmText = status === 1 ? '通过' : '拒绝';
        const reasonText = status === 1 ? `批次审核通过` : `批次审核不通过`;
        modal.confirm({
            content: `确认全部审核${confirmText}吗？`,
            onOk() {
                postUserReview({ userIds: selectedRow, status: status, reason: reasonText });
            },
        });
    };

    const handleRandomInputOnchange = (e) => {
        const inputValue = e.target.value;
        if (inputValue === '') {
            setRandomInputValue('');
            return;
        }

        if (!isNaN(inputValue)) {
            setRandomInputValue(inputValue > 100 ? 100 : inputValue < 0 ? 0 : Number(inputValue).toFixed());
        } else {
            setRandomInputValue(0);
        }
    };

    const handleSelectRandomRows = () => {
        const userReviewListLength = userReviewList?.records.length;
        const selectLength = Number((userReviewListLength * Number(randomInputValue)) / 100).toFixed();
        if (Number(selectLength) === 0) return;
        const selectArray = [];
        const userIds = userReviewList?.records.map((i) => i.userId);
        for (let i = 0; i < Number(selectLength); i++) {
            const randomSelect = (Math.random() * userIds.length) | 0;
            if (selectArray.includes(userIds[randomSelect])) {
                i--;
            } else {
                selectArray.push(userIds[randomSelect]);
            }
        }
        onSelectChange(selectArray);
    };

    const columns: ProColumns<UserReviewListResponse>[] = [
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record) => [
                <a key="editable" onClick={() => handleToUserDetail(record.userId)}>
                    审核
                </a>,
            ],
            width: ProColumnsOperationConstant.width['1'],
        },
        { title: '手机号', dataIndex: 'phoneNo', key: 'phoneNo', initialValue: searchList.phoneNo },
        { title: '姓名', dataIndex: 'userName', key: 'userName', initialValue: searchList.userName },
        {
            title: '风控标签',
            dataIndex: 'riskRank',
            valueType: 'select',
            key: 'riskRank',
            valueEnum: riskRankEnum,
            initialValue: searchList.riskRank,
        },
        {
            title: '注册渠道',
            dataIndex: 'regChannelId',
            valueType: 'select',
            key: 'regChannelId',
            valueEnum: channelListEnum,
            initialValue: searchList.regChannelId,
        },
        {
            title: '注册时间',
            dataIndex: 'registerTime',
            key: 'registerTime',
            hideInSearch: true,
            valueType: 'dateTime',
        },
        {
            title: '注册时间',
            dataIndex: 'registerTimeRange',
            valueType: 'dateRange',
            key: 'registerTimeRange',
            fieldProps: { placeholder: ['开始时间', '结束时间'] },
            hideInTable: true,
            initialValue:
                searchList.searchList === undefined || searchList.searchList.registerStartTime === ''
                    ? ''
                    : [moment(searchList.searchList.registerStartTime), moment(searchList.searchList.registerEndTime)],
        },
    ];
    return (
        <ProTable<UserReviewListResponse>
            columns={columns}
            dataSource={userReviewList?.records || []}
            loading={isFetching}
            rowSelection={{
                selectedRowKeys: selectedRow,
                onChange: onSelectChange,
            }}
            rowKey={({ userId }) => userId}
            headerTitle={
                <Space>
                    <Button
                        key="passButton"
                        type="primary"
                        ghost
                        disabled={buttonDisabled}
                        onClick={() => handleReviewAll(1)}
                    >
                        全部通过
                    </Button>
                    <Button
                        key="rejectButton"
                        type="primary"
                        ghost
                        disabled={buttonDisabled}
                        onClick={() => handleReviewAll(0)}
                    >
                        全部拒绝
                    </Button>
                    <Input.Group compact>
                        <div style={{ padding: '4px 11px', border: '1px solid #d9d9d9' }}>随机提取</div>
                        <Input
                            style={{ width: '30%' }}
                            suffix="%"
                            onChange={handleRandomInputOnchange}
                            value={randomInputValue}
                            placeholder={'0'}
                        />
                        <Button type="primary" onClick={handleSelectRandomRows}>
                            送出
                        </Button>
                    </Input.Group>
                </Space>
            }
            search={{
                labelWidth: 'auto',
                // @ts-ignore
                optionRender: ({ searchText, resetText }, { form }) => (
                    <Space>
                        {contextHolder}
                        {errorContextHolder}
                        <Button
                            onClick={() => {
                                // @ts-ignore
                                form.setFieldsValue({
                                    ...initSearchList,
                                    registerTimeRange: '',
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
                                const { phoneNo, regChannelId, riskRank, userName, registerTimeRange } =
                                    // @ts-ignore
                                    form.getFieldValue();
                                setSearchList({
                                    ...searchList,
                                    registerEndTime: registerTimeRange[1]
                                        ? registerTimeRange[1].format('YYYY-MM-DD 23:59:59')
                                        : '',
                                    registerStartTime: registerTimeRange[0]
                                        ? registerTimeRange[0].format('YYYY-MM-DD 00:00:00')
                                        : '',
                                    phoneNo,
                                    regChannelId,
                                    riskRank,
                                    userName,
                                    pageNum: 1,
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
                total: userReviewList?.totalRecords,
                current: userReviewList?.records?.length === 0 ? 0 : userReviewList?.currentPage,
            }}
        ></ProTable>
    );
};

export default UserReviewTable;
