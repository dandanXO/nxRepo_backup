import React, {useCallback, useEffect, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {AdminTable, ModalContent} from "../../../../../shared/components/AdminTable";
import {
    useCreateTagMutation,
    useDeleteTagMutation,
    useLazyGetAllTagQuery,
    useLazyGetTagQuery,
    usePutTagMutation
} from "../../../../service/ChannelApi";
import {useForm} from "antd/es/form/Form";
import {AdminCustomModal} from "../../../../../shared/components/AdminCustomModal";
import {ChannelTagVO} from "../../../../domain/vo/ChannelTagVO";
import {useFormModal} from "./useFormModal";
import {ChannelSettingTagFormModal} from "./ChannelSettingTagFormModal";

export const ChannelSettingTagTabPage = () => {

    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<ChannelTagVO>[]>()

    // NOTICE: Action: Create or Edit
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    const onAddChannelTag = useCallback(() => {
        userAddChannelSetting()
    }, [])

    // NOTICE: Action: Edit
    const [editID, setEditID] = useState<number>();

    // NOTICE: Form
    const [form] = useForm()



    // Modal - onModalFormAutoCompleteTemplate
    // const onModalFormAutoCompleteTemplate = useCallback(() => {
    //     userUseFormAutoCompleteUseCase();
    // }, [])

    // NOTICE: Modal - Delete
    const [showDeleteModal, setShowDeletedModal] = useState(false);

    const onDeleteModalOK = useCallback(() => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUseCase()
    }, [editID])

    const onDeleteModalCancel = useCallback(() => {
        setShowDeletedModal(false);
    }, [])


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
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            userBrowseEditChannelSettingUseCase(record);
                        }}>修改</a>,<a key="deletable" onClick={() => {
                            userBrowseDeleteChannelSettingUseCase(record)
                        }}>刪除</a>,

                    ]
                }
            },
            {
                key: 'id',
                dataIndex: 'id',
                hideInSearch: true,
                hideInTable: true,
            },
            { key: 'name', title: '渠道配置标签', dataIndex: 'name', initialValue: "" },
            { key: 'auditAcc', title: '测试帐号', dataIndex: 'auditAcc', initialValue: "" },
            { key: 'auditAccOtpCode', title: '测试验证码', dataIndex: 'auditAccOtpCode', initialValue: "" },
        ];
        setColumns(columns);
    }, []);

    useEffect(() => {
        systemInitalizeChannelSettingListUsecase();
    }, [])

    // NOTE: User browse AllChannelSettings
    const userBrowseAllChannelSettingsUsecase = useCallback(() => {
        triggerGetList(null);
    }, [])

    // NOTE: GET list and item
    const [triggerGetList, { currentData: currentItemListData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllTagQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    useEffect(() => {
        userBrowseAllChannelSettingsUsecase()
    }, []);

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
        })
        triggerGet({
            id: record.id,
        });
    }, []);
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetTagQuery();

    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if(showModalContent.isEdit && currentFormData) {
            systemReloadEditChannelSettingUseCase(currentFormData)
        }
    }, [showModalContent.isEdit, currentFormData])

    // NOTE: System reload EditChannelSetting
    const systemReloadEditChannelSettingUseCase = useCallback((currentFormData) => {
        // NOTICE: form
        // NOTE: form - menu
        // const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        // const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;

        // NOTE: form - main data
        form.setFieldsValue(currentFormData)
    }, [showModalContent.isEdit, currentFormData])


    // NOTE: User add ChannelSetting
    const userAddChannelSetting = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);


    // NOTE: POST , PUT and DELETE
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateTagMutation();
    const [triggerPut, { data: putData, isLoading: isPutLoading, isSuccess: isPutSuccess }] = usePutTagMutation();

    // NOTE: User browse DeleteChannelSetting
    const userBrowseDeleteChannelSettingUseCase = useCallback((record: ChannelTagVO) => {
        setEditID(record.id);
        setShowDeletedModal(true);
    }, [])

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUseCase = useCallback(() => {
        // NOTE:
        triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            setShowDeletedModal(false);
            triggerGetList(null);
        })
    }, [editID]);

    const [triggerDelete, { data: deleteData, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteTagMutation();

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
    })
    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<ChannelTagVO>
                tableHeaderColumns={columns}
                tableDatasource={currentItemListData}
                loading={isGetListFetching}
                // NOTE: 新增
                addText={"添加渠道配置标签"}
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
            <AdminCustomModal open={showDeleteModal} onOk={onDeleteModalOK} onCancel={onDeleteModalCancel} message={"确认要删除此笔数据吗?"}/>
        </>
    )
}
