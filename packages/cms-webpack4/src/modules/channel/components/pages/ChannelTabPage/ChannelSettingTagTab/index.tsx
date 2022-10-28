import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {AdminTable, ModalContent} from "../../../../../shared/components/AdminTable";
import {
    useCreateTagMutation, useDeleteTagMutation,
    useLazyGetAllTagQuery,
    useLazyGetTagQuery,
    usePutTagMutation
} from "../../../../service/ChannelApi";
import {useForm} from "antd/es/form/Form";
import {ChannelSettingTagForm} from "./ChannelSettingTagForm";
import {AdminCustomModal} from "../../../../../shared/components/AdminCustomModal";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import {AdminFormCustomModal} from "../../../../../shared/components/AdminFormCustomModal";
import {ChannelTagVO} from "../../../../domain/vo/ChannelTagVO";
import {ChannelTagSchemaEntity, IChannelTagSchema} from "../../../../domain/entity/ChannelTagSchemaEntity";
import {FormInstance} from "antd";

export interface FormModalHookProps {
    showModalContent: {
        isEdit: boolean;
        show: boolean;
    };
    setShowModalContent: (any) => void;
    editID: number;
    form: FormInstance;
    triggerGetList: (any) => void;
    triggerPost: (any) => void;
    triggerPut: (any) => void;
}

export const useFormModal = (props: FormModalHookProps) => {

    // NOTICE:
    const channelTagSchemaEntity = new ChannelTagSchemaEntity();

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {

        } as DeepPartial<{}>;
    }, [])

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields, allFields) => {
        userEditingChannelSettingUseCase(changedFields);
    }, [])

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // NOTE: User is editing ChannelSetting
    const userEditingChannelSettingUseCase = useCallback((changedFields) => {
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

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [props.showModalContent.isEdit, props.editID])

    // NOTE: user Edited ChannelSetting
    const userEditedChannelSettingUseCase = useCallback(() => {
        const isValid = systemValidateChannelSettingUseCase();
        if(!isValid) return;

        // NOTICE: need
        const fields = props.form.getFieldsValue();

        // NOTICE: MODE - Edit
        if(props.showModalContent.isEdit) {
            fields["id"] = props.editID;
        }

        // NOTE: Create or Edit
        const triggerAPI = (!props.showModalContent.isEdit ? props.triggerPost : props.triggerPut) as any;

        // NOTE: Request
        triggerAPI(fields).unwrap().then((responseData) => {
            // console.log("responseData", responseData);

            // Reset Form
            props.form.resetFields();

            // Close Modal
            props.setShowModalContent({
                show: false,
                isEdit: false,
            })

            // Reset TableList
            props.triggerGetList(null);

        })
    }, [props.showModalContent.isEdit, props.editID])

    // NOTE: System validate ChannelSetting
    const systemValidateChannelSettingUseCase = useCallback(() => {
        // NOTICE: need
        const fields = props.form.getFieldsValue();

        // NOTICE: need to prevent restored validation
        Object.keys(fields).map(key => {
            if(fields[key] === undefined) {
                props.form.setFieldValue(key, "");
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

    // NOTICE: Modal - Create, Edit
    // Modal - OK
    const onModalOk = useCallback(() => {
        props.form.submit();
    }, [props.form])

    // Modal - Close
    const onCloseModal = useCallback(() => {
        props.form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    return {
        // form
        formInitialValues,
        onFormFieldsChange,
        onFormFinish,
        customAntFormFieldError,
        // modal
        onModalOk,
        onCloseModal,

    }
}

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

export interface ChannelSettingTagFormModalProps {
    // modal
    showModalContent: {
        isEdit: boolean;
        show: boolean;
    };
    setShowModalContent: (any) => void;
    onModalOk: () => void;
    onCloseModal:  () => void;
    // form
    form: FormInstance;
    formInitialValues: any;
    onFormFieldsChange: any;
    onFormFinish: any;
    customAntFormFieldError: any;
}

export const ChannelSettingTagFormModal = (props: ChannelSettingTagFormModalProps) => {
    {/*NOTICE: Create, Edit Modal*/}
    return (
        <AdminFormCustomModal
            title={"渠道配置标签"}
            width={"600px"}
            showModalContent={props.showModalContent}
            // 關閉
            setShowModalContent={props.setShowModalContent}
            onOk={props.onModalOk}
            onCloseModal={props.onCloseModal}
            // onAutoCompleteTemplate={onModalFormAutoCompleteTemplate}
        >
            <ChannelSettingTagForm
                isEdit={props.showModalContent.isEdit}
                form={props.form}
                initialValues={props.formInitialValues}
                onFieldsChange={props.onFormFieldsChange}
                onFinish={props.onFormFinish}
                customAntFormFieldError={props.customAntFormFieldError}
            />
        </AdminFormCustomModal>
    )
}
