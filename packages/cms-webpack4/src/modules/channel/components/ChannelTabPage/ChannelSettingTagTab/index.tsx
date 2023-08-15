import { ProColumns } from '@ant-design/pro-components';
import { Modal } from 'antd/es';
import { useForm } from 'antd/es/form/Form';
import React, { useCallback, useEffect, useState } from 'react';

import { AdminTable, ModalContent } from '../../../../shared/components/common/AdminTable';
import { ProColumnsOperationConstant } from '../../../../shared/components/common/ProColumnsOperationConstant';
import { ChannelTagVO } from '../../../domain/vo/ChannelTagVO';
import {
    useCreateTagMutation,
    useDeleteTagMutation,
    useLazyGetAllTagQuery,
    useLazyGetTagQuery,
    usePutTagMutation,
} from '../../../service/ChannelApi';
import { ChannelSettingTagFormModal } from './ChannelSettingTagFormModal';
import { useFormModal } from './useFormModal';

interface ChannelSettingTagTabPageProps {
    active: boolean;
}
export const ChannelSettingTagTabPage = (props: ChannelSettingTagTabPageProps): JSX.Element => {
    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<ChannelTagVO>[]>();

    // NOTICE: Action: Create or Edit
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    const onAddChannelTag = useCallback(() => {
        userAddChannelSetting();
    }, []);

    // NOTICE: Action: Edit
    const [editID, setEditID] = useState<number>();

    // NOTICE: Form
    const [form] = useForm();

    // Modal - onModalFormAutoCompleteTemplate
    // const onModalFormAutoCompleteTemplate = useCallback(() => {
    //     userUseFormAutoCompleteUseCase();
    // }, [])

    // NOTICE: Modal - Delete
    const [showDeleteModal, setShowDeletedModal] = useState(false);
    console.log(showDeleteModal);

    const onDeleteModalOK = useCallback((editID: number) => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUseCase(editID);
    }, []);

    const onDeleteModalCancel = useCallback(() => {
        setShowDeletedModal(false);
    }, []);

    // NOTICE: Use Case
    // NOTE: User login automatically
    // const {isLoginSuccess} = useAutoLogin();
    // const userAutoLogin = useCallback(() => {
    // }, [])
    // useEffect(() => {
    //     userAutoLogin();
    // }, [isLoginSuccess])

    // NOTE: System is initializing ChannelSetting List
    const systemInitalizeChannelSettingListUsecase = useCallback(() => {
        const columns: ProColumns<ChannelTagVO>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record) => {
                    return [
                        <a
                            key="editable"
                            onClick={() => {
                                userBrowseEditChannelSettingUseCase(record);
                            }}
                        >
                            修改
                        </a>,
                        <a
                            key="deletable"
                            onClick={() => {
                                userBrowseDeleteChannelSettingUseCase(record);
                            }}
                        >
                            刪除
                        </a>,
                    ];
                },
                width: ProColumnsOperationConstant.width['2'],
            },
            {
                key: 'id',
                dataIndex: 'id',
                hideInSearch: true,
                hideInTable: true,
            },
            { key: 'name', title: '渠道配置标签', dataIndex: 'name', initialValue: '' },
            { key: 'auditAcc', title: '测试帐号', dataIndex: 'auditAcc', initialValue: '' },
            { key: 'auditAccOtpCode', title: '测试验证码', dataIndex: 'auditAccOtpCode', initialValue: '' },
        ];
        setColumns(columns);
    }, []);

    useEffect(() => {
        systemInitalizeChannelSettingListUsecase();
    }, []);

    // NOTE: User browse AllChannelSettings
    const userBrowseAllChannelSettingsUsecase = useCallback(() => {
        triggerGetList(null);
    }, []);

    // NOTE: GET list and item
    const [triggerGetList, { currentData: currentItemListData, isFetching: isGetListFetching }] = useLazyGetAllTagQuery(
        {
            pollingInterval: 0,
            refetchOnFocus: false,
            refetchOnReconnect: false,
        },
    );

    useEffect(() => {
        if (props.active) userBrowseAllChannelSettingsUsecase();
    }, [props.active]);

    // NOTE: User use FormAutoComplete
    // const userUseFormAutoCompleteUseCase = useCallback(() => {
    //     form.setFieldsValue(MockChannelTag);
    //     systemValidateChannelSettingUseCase();
    // }, [form])

    // NOTE: User browse EditChannelSetting
    const userBrowseEditChannelSettingUseCase = useCallback((record: ChannelTagVO) => {
        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        });
        triggerGet({
            id: record.id,
        });
    }, []);
    const [triggerGet, { currentData: currentFormData }] = useLazyGetTagQuery();

    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if (showModalContent.isEdit && currentFormData) {
            systemReloadEditChannelSettingUseCase(currentFormData);
        }
    }, [showModalContent.isEdit, currentFormData]);

    // NOTE: System reload EditChannelSetting
    const systemReloadEditChannelSettingUseCase = useCallback(
        (currentFormData) => {
            // NOTICE: form
            // NOTE: form - menu
            // const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
            // const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;

            // NOTE: form - main data
            form.setFieldsValue(currentFormData);
        },
        [showModalContent.isEdit, currentFormData],
    );

    // NOTE: User add ChannelSetting
    const userAddChannelSetting = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);

    // NOTE: POST , PUT and DELETE
    const [triggerPost] = useCreateTagMutation();
    const [triggerPut] = usePutTagMutation();

    // NOTE: User browse DeleteChannelSetting
    const [modal, contextHolder] = Modal.useModal();
    const userBrowseDeleteChannelSettingUseCase = useCallback((record: ChannelTagVO) => {
        if (!record.occupied) {
            modal.confirm({
                title: '确认要删除此笔数据吗?',
                // NOTICE: 得用下面寫法否則 editID 會找不到
                onOk: () => onDeleteModalOK(record.id),
                // onOk: onDeleteModalOK,
                onCancel: onDeleteModalCancel,
            });
        } else {
            modal.warning({
                title: '此配置标签已在使用中，不能刪除。',
                content: <>若尚有任何疑问，请与技术联系</>,
                onOk: () => {
                    //
                },
                okText: '知道了',
            });
        }
    }, []);

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUseCase = useCallback((editID: number) => {
        // NOTE:
        triggerDelete({
            id: editID,
        })
            .unwrap()
            .then(() => {
                setShowDeletedModal(false);
                triggerGetList(null);
            });
    }, []);

    const [triggerDelete] = useDeleteTagMutation();

    const {
        // form
        formInitialValues,
        onFormFieldsChange,
        onFormFinish,
        customAntFormFieldError,
        // modal
        onModalOk,
        onCloseModal,
    } = useFormModal({
        // NOTE: other need
        showModalContent,
        setShowModalContent,
        form,
        //
        editID,
        triggerGetList,
        triggerPost,
        triggerPut,
    });
    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<ChannelTagVO>
                hasAddForm={true}
                tableHeaderColumns={columns}
                tableDatasource={currentItemListData}
                loading={isGetListFetching}
                // NOTE: 新增
                addText={'添加渠道配置标签'}
                onAddCallback={onAddChannelTag}
                setShowModalContent={setShowModalContent}
                searchable={false}
            />

            <ChannelSettingTagFormModal
                // modal
                showModalContent={showModalContent}
                setShowModalContent={setShowModalContent}
                onModalOk={onModalOk}
                onCloseModal={onCloseModal}
                form={form}
                formInitialValues={formInitialValues}
                onFormFieldsChange={onFormFieldsChange}
                onFormFinish={onFormFinish}
                customAntFormFieldError={customAntFormFieldError}
            />

            {/*NOTICE: Delete Modal*/}
            <div>{contextHolder}</div>
        </>
    );
};