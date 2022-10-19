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
import {AdminDeleteModal} from "../../../../../shared/components/AdminDeleteModal";
import {MockChannelTag, ChannelTagVO, ChannelTagSchemaEntity, IChannelTagSchema} from "./formData";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";

// NOTICE:
const channelTagSchemaEntity = new ChannelTagSchemaEntity();


const setSource = (sourceData) => {
    return {
        auditAcc	:sourceData.auditAcc,
        // google audit acc

        auditAccOtpCode	:sourceData.auditAccOtpCode,
        // google audit 登入验证码

        auditLoanAmount	:!isNaN(sourceData.auditLoanAmount) ? Number(sourceData.auditLoanAmount) : sourceData.auditLoanAmount,
        // 审核的借款金额

        auditQuota	:!isNaN(sourceData.auditQuota) ? Number(sourceData.auditQuota) : sourceData.auditQuota,
        // 审核的订单额度

        auditServiceFee	:!isNaN(sourceData.auditServiceFee) ? Number(sourceData.auditServiceFee) : sourceData.auditServiceFee,
        // 审核的服务费

        auditTaxFee	:!isNaN(sourceData.auditTaxFee) ? Number(sourceData.auditTaxFee) : sourceData.auditTaxFee,
        // 审核的利息

        auditTerm	:!isNaN(sourceData.auditTerm) ? Number(sourceData.auditTerm) : sourceData.auditTerm,
        // 审核的天数

        name	:sourceData.name,
        // APP設定名称

        // NOTICE: 要填寫
        // changedFieldName: changedFieldName,
    }
}
export const ChannelSettingTagTabPage = () => {
    // NOTICE: Restful API
    // NOTE: GET list and item
    const [triggerGetList, { currentData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllTagQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetTagQuery();

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
                            console.log("record", record);
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
                            console.log("record", record);
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
        // console.log("editID", editID);
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

    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()
    // console.log("customAntFormFieldError", customAntFormFieldError);

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
        console.log("changedFields", changedFields)
        console.log("allFields", allFields)
        if(changedFields.length === 0) return;
        // NOTICE: need
        const changedFieldName = changedFields[0].name[0];
        // console.log("changedFieldName", changedFieldName);

        // const fields = form.getFieldsValue().filter(value => value !== undefined);
        // console.log("fields", fields);
        // NOTICE: need
        let sourceData: IChannelTagSchema =  {
            // ...fields,
            [changedFields[0].name[0]]: changedFields[0].value
        } as IChannelTagSchema;

        console.log("sourceData", sourceData);
        // NOTICE: need
        channelTagSchemaEntity.setProperties(setSource(sourceData))
        // console.log("channelTagSchemaEntity", channelTagSchemaEntity)
        // NOTICE: need
        const validData = channelTagSchemaEntity.validate(changedFieldName);
        console.log("validData", validData);

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
                // fields[key] = ""
                form.setFieldValue(key, "");
            }
        })
        // channelTagSchemaEntity.setProperties(setSource(sourceData))

        console.log("fields", fields);
        // NOTICE: need
        const validData = channelTagSchemaEntity.setProperties(setSource(fields)).validate();
        setCustomAntFormFieldError({
            ...customAntFormFieldError,
            ...validData.fieldsMessage,
        });
        console.log("validData", validData);

        return validData.isEntityValid;
    }, [])

    // NOTE: Form.4 onFinish
    const onFinish = useCallback(() => {
        const isValid = validateForm();
        if(!isValid) return;

        // NOTICE: need
        const fields = form.getFieldsValue();
        console.log("finished.fields.1", fields)

        // NOTICE: MODE - Edit
        if(showModalContent.isEdit) {
            fields["id"] = editID;
        }
        console.log("finished.fields.2", fields)

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
            <AdminDeleteModal open={showDeleteModal} onOk={onDeleteModalOK} onCancel={onDeleteModalCancel}/>
        </>
    )
}
