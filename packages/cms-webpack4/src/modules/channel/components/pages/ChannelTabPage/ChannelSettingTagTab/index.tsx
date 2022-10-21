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
import {ChannelSettingTagModal} from "./ChannelSettingTagModal";
import {ChannelSettingTagForm} from "./ChannelSettingTagForm";
import {AdminCustomModal} from "../../../../../shared/components/AdminCustomModal";
import {MockChannelTag, ChannelTagVO, ChannelTagSchemaEntity, IChannelTagSchema} from "./formData";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import useAutoLogin from "../../../../../shared/hooks/useAutoLogin";

// NOTICE:
const channelTagSchemaEntity = new ChannelTagSchemaEntity();

export const ChannelSettingTagTabPage = () => {

    // NOTICE: Restful API
    // NOTE: GET list and item
    const [triggerGetList, { currentData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllTagQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetTagQuery();

    // const {isLoginSuccess} = useAutoLogin();
    // useEffect(() => {
    //     triggerGetList(null);
    // }, [isLoginSuccess])

    // NOTE: POST , PUT and DELETE
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateTagMutation();
    const [triggerPut, { data: putData, isLoading: isPutLoading, isSuccess: isPutSuccess }] = usePutTagMutation();
    const [triggerDelete, { data: deleteData, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteTagMutation();


    // NOTICE: Action: List
    useEffect(() => {
        triggerGetList(null);
    }, []);

    // NOTE: Table
    const columns = useMemo(() => {
        const columns: ProColumns<ChannelTagVO>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            setEditID(record.id);
                            setShowModalContent({
                                show: true,
                                isEdit: true,
                            })
                            triggerGet({
                                id: record.id,
                            });
                        }}>修改</a>,
                        <a key="deletable" onClick={() => {
                            setEditID(record.id);
                            setShowDeletedModal(true);
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
        return columns;

    }, []);


    // NOTICE: Action: PUT
    const [editID, setEditID] = useState<number>();

    // NOTICE: Action: Delete
    // NOTE: Modal
    const [showDeleteModal, setShowDeletedModal] = useState(false);

    const onDeleteModalOK = useCallback(() => {
        triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            setShowDeletedModal(false);
            triggerGetList(null);
        })
    }, [editID])

    const onDeleteModalCancel = useCallback(() => {
        setShowDeletedModal(false);
    }, [])


    // NOTICE: Action: POST or PUT
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTE: FORM
    const [form] = useForm()

    // NOTE: FORM - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // NOTICE: Modal
    // NOTE: OK
    const onOk = useCallback(() => {
        form.submit();
    }, [form])

    // NOTE: onAutoCompleteTemplate
    const onAutoCompleteTemplate = useCallback(() => {
        form.setFieldsValue(MockChannelTag)
        validateForm();

    }, [form])

    const onCloseModal = useCallback(() => {
        setCustomAntFormFieldError({});
    }, []);

    // NOTICE: Form-2/2
    // NOTE: Form.1 Initial Data
    const initialValues = useMemo(() => {
        // NOTICE: select and switch need initialValue if you want to select one
        return {

        } as DeepPartial<{}>;
    }, [])

    // NOTE: Form2. Edit Mode, Set form fields from data
    useEffect(() => {
        // NOTICE: validation
        if(!showModalContent.isEdit) return;
        if(!currentFormData) return;

        // NOTICE: form
        // NOTE: form - menu
        // const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        // const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;

        // NOTE: form - main data
        form.setFieldsValue(currentFormData)
    }, [showModalContent.isEdit, currentFormData])


    // NOTE: Form.3. onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
        if(changedFields.length === 0) return;

        // NOTICE: need
        const changedFieldName = changedFields[0].name[0];

        // NOTICE: need
        let sourceData: IChannelTagSchema =  {
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

    const validateForm = useCallback(() => {
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

    // NOTE: Form.4 onFinish
    const onFinish = useCallback(() => {
        const isValid = validateForm();
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

            // NOTE: Reset Form
            form.resetFields();

            // NOTE: Close Modal
            setShowModalContent({
                show: false,
                isEdit: false,
            })

            // NOTE: Reset TableList
            triggerGetList(null);

        })
    }, [editID])
    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<ChannelTagVO>
                tableHeaderColumns={columns}
                tableDatasource={currentData}
                loading={isGetListFetching}
                // NOTE: 新增
                addText={"添加渠道配置标签"}
                setShowModalContent={setShowModalContent}
                searchable={false}
            />

            {/*NOTICE: Create, Edit Modal*/}
            <ChannelSettingTagModal
                showModalContent={showModalContent}
                // 關閉
                setShowModalContent={setShowModalContent}
                form={form}
                onOk={onOk}
                onAutoCompleteTemplate={onAutoCompleteTemplate}
                onCloseModal={onCloseModal}
            >
                <ChannelSettingTagForm
                    isEdit={showModalContent.isEdit}
                    form={form}
                    initialValues={initialValues}
                    onFieldsChange={onFieldsChange}
                    onFinish={onFinish}
                    customAntFormFieldError={customAntFormFieldError}
                />
            </ChannelSettingTagModal>

            {/*NOTICE: Delete Modal*/}
            <AdminCustomModal open={showDeleteModal} onOk={onDeleteModalOK} onCancel={onDeleteModalCancel} message={"确认要删除此笔数据吗?"}/>
        </>
    )
}