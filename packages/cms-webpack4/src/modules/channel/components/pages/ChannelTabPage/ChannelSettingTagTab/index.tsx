import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {AdminTable, ModalContent} from "../../../../../shared/components/AdminTable";
import {
    useCreateTagMutation, useDeleteTagMutation,
    useLazyGetAllTagQuery,
    useLazyGetTagQuery,
    usePutTagMutation
} from "../../../../api/ChannelApi";
import {useForm} from "antd/es/form/Form";
import {ChannelSettingTagForm} from "./ChannelSettingTagForm";
import {AdminCustomModal} from "../../../../../shared/components/AdminCustomModal";
import {MockChannelTag, ChannelTagVO, ChannelTagSchemaEntity, IChannelTagSchema} from "./formData";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import {AdminFormCustomModal} from "../../../../../shared/components/AdminFormCustomModal";

// NOTICE:
const channelTagSchemaEntity = new ChannelTagSchemaEntity();

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

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {

        } as DeepPartial<{}>;
    }, [])

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields, allFields) => {
        userEditingChannelSettingUsecase(changedFields);
    }, [])

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [editID])

    // NOTICE: Modal - Create, Edit
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form])

    // Modal - Close
    const onCloseModal = useCallback(() => {
        setCustomAntFormFieldError({});
    }, []);

    // Modal - onModalFormAutoCompleteTemplate
    // const onModalFormAutoCompleteTemplate = useCallback(() => {
    //     userUseFormAutoCompleteUsecase();
    // }, [])

    // NOTICE: Modal - Delete
    const [showDeleteModal, setShowDeletedModal] = useState(false);

    const onDeleteModalOK = useCallback(() => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUsecase()
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
                            userBrowseEditChannelSettingUsecase(record);
                        }}>修改</a>,
                        <a key="deletable" onClick={() => {
                            userBrowseDeleteChannelSettingUsecase(record)
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
    // const userUseFormAutoCompleteUsecase = useCallback(() => {
    //     form.setFieldsValue(MockChannelTag);
    //     systemValidateChannelSettingUsecase();
    // }, [form])

    // NOTE: User browse EditChannelSetting
    const userBrowseEditChannelSettingUsecase = useCallback((record: ChannelTagVO) => {
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

    // NOTE: System reload EditChannelSetting
    const systemReloadEditChannelSettingUsecase = useCallback((currentFormData) => {
        // NOTICE: form
        // NOTE: form - menu
        // const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        // const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;

        // NOTE: form - main data
        form.setFieldsValue(currentFormData)
    }, [showModalContent.isEdit, currentFormData])

    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if(showModalContent.isEdit && currentFormData) {
            systemReloadEditChannelSettingUsecase(currentFormData)
        }
    }, [showModalContent.isEdit, currentFormData])

    // NOTE: User add ChannelSetting
    const userAddChannelSetting = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);

    // NOTE: User is editing ChannelSetting
    const userEditingChannelSettingUsecase = useCallback((changedFields) => {
        if(changedFields.length === 0) return;

        // NOTICE: need
        const changedFieldName = changedFields[0].name[0];

        // NOTICE: need
        const sourceData: IChannelTagSchema =  {
            [changedFields[0].name[0]]: changedFields[0].value
        } as IChannelTagSchema;

        // NOTICE: need
        const data = channelTagSchemaEntity.transformToEntityData(sourceData);
        const validData = channelTagSchemaEntity.setProperties(data).validate(changedFieldName);

        setCustomAntFormFieldError({
            ...customAntFormFieldError,
            ...validData.fieldsMessage,
        });
    }, [])

    // NOTE: System validate ChannelSetting
    const systemValidateChannelSettingUsecase = useCallback(() => {
        // NOTICE: need
        const fields = form.getFieldsValue();

        // NOTICE: need to prevent restored validation
        Object.keys(fields).map(key => {
            if(fields[key] === undefined) {
                form.setFieldValue(key, "");
            }
        })

        // NOTICE: need
        const data = channelTagSchemaEntity.transformToEntityData(fields);
        const validData = channelTagSchemaEntity.setProperties(data).validate();

        setCustomAntFormFieldError({
            ...customAntFormFieldError,
            ...validData.fieldsMessage,
        });
        return validData.isEntityValid;
    }, [])

    // NOTE: user Edited ChannelSetting
    const userEditedChannelSettingUseCase = useCallback(() => {
        const isValid = systemValidateChannelSettingUsecase();
        if(!isValid) return;

        // NOTICE: need
        const fields = form.getFieldsValue();

        // NOTICE: MODE - Edit
        if(showModalContent.isEdit) {
            fields["id"] = editID;
        }

        // NOTE: Create or Edit
        const triggerAPI = !showModalContent.isEdit ? triggerPost : triggerPut;

        // NOTE: Request
        triggerAPI(fields).unwrap().then((responseData) => {
            // console.log("responseData", responseData);

            // Reset Form
            form.resetFields();

            // Close Modal
            setShowModalContent({
                show: false,
                isEdit: false,
            })

            // Reset TableList
            triggerGetList(null);

        })
    }, [showModalContent.isEdit, editID])

    // NOTE: POST , PUT and DELETE
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateTagMutation();
    const [triggerPut, { data: putData, isLoading: isPutLoading, isSuccess: isPutSuccess }] = usePutTagMutation();

    // NOTE: User browse DeleteChannelSetting
    const userBrowseDeleteChannelSettingUsecase = useCallback((record: ChannelTagVO) => {
        setEditID(record.id);
        setShowDeletedModal(true);
    }, [])

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUsecase = useCallback(() => {
        // NOTE:
        triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            setShowDeletedModal(false);
            triggerGetList(null);
        })
    }, [editID]);

    const [triggerDelete, { data: deleteData, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteTagMutation();

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

            {/*NOTICE: Create, Edit Modal*/}
            <AdminFormCustomModal
                title={"渠道配置标签"}
                width={"600px"}
                showModalContent={showModalContent}
                // 關閉
                setShowModalContent={setShowModalContent}
                form={form}
                onOk={onModalOk}
                onCloseModal={onCloseModal}
                // onAutoCompleteTemplate={onModalFormAutoCompleteTemplate}
            >
                <ChannelSettingTagForm
                    isEdit={showModalContent.isEdit}
                    form={form}
                    initialValues={formInitialValues}
                    onFieldsChange={onFormFieldsChange}
                    onFinish={onFormFinish}
                    customAntFormFieldError={customAntFormFieldError}
                />
            </AdminFormCustomModal>

            {/*NOTICE: Delete Modal*/}
            <AdminCustomModal open={showDeleteModal} onOk={onDeleteModalOK} onCancel={onDeleteModalCancel} message={"确认要删除此笔数据吗?"}/>
        </>
    )
}
