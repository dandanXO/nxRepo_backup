import AdminPage from "../../../../../shared/components/common/AdminPage";
import { AdminTable } from "../../../../../shared/components/common/AdminTable";
import { ProColumns } from "@ant-design/pro-components";
import React, { useCallback, useEffect, useMemo } from "react";
import { AdsTemplateData } from "../../../data/AdsTemplateData";
import { AdsScenarioData } from "../../../data/AdsScenarioData";
import { ProColumnsOperationConstant } from "../../../../../shared/components/common/ProColumnsOperationConstant";
import { AdminFormCustomModal } from "../../../../../shared/components/common/AdminFormCustomModal";
import { ActivityAdsForm } from "./ActivityAdsForm";
import {
    ActivityModel,
    useDeleteActivityMutation,
    useLazyGetActivitiesQuery,
    useLazyGetActivityQuery,
    usePostActivityMutation,
    usePutActivityMutation
} from "../../../service/AdsApi";
import { IActivityAdsPageFormStore } from "../../../export/types/IAdsFormStore";
import { Form } from "antd";
import { CommonResponseError } from "../../../../../shared/api/CommonResponseError";
import { DefaultFormByTemplateType } from "./DefaultFormByTemplateType";
import { useAdminFormModal } from "./useAdminFormModal";
import { DeepPartial } from "../../../../../shared/types/custom";

export const ActivityAdsAdminPage = (): JSX.Element => {

    // NOTE: GET list and item
    const [triggerGetList, {
        currentData: currentItemListData,
    }] = useLazyGetActivitiesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // NOTE: POST , PUT and DELETE
    const [triggerGet , {  currentData: currentFormData }] = useLazyGetActivityQuery();
    const [triggerPost] = usePostActivityMutation();
    const [triggerPut] = usePutActivityMutation();
    const [triggerDelete] = useDeleteActivityMutation();


    const {
        showModalContent,
        setShowModalContent,
        onModalOk,
        onCloseModal,
        editID,
        form,
        onAddItem,
        onEditItem,
        onDeleteItem,
        contextHolder,
        modal,
    } = useAdminFormModal({
        triggerGet,
        triggerGetList,
        triggerDelete,
    });

    const columns: ProColumns<ActivityModel, "text">[] = [
        {
            key: 'option',
            title: '操作',
            valueType: 'option',
            render: (text, record) => {
                return [
                    <a key="editable" onClick={() => {
                        // userBrowseEditChannelSettingUseCase(record);
                        onEditItem(record);
                    }}>修改</a>,<a key="deletable" onClick={() => {
                        // userBrowseDeleteChannelSettingUseCase(record)
                        onDeleteItem(record);
                    }}>刪除</a>,
                ];
            },
            width: ProColumnsOperationConstant.width["2"],
        },
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
            width: 80,
        },
        {
            key: 'name', title: '广告名称', dataIndex: 'name', initialValue: "", hideInSearch: true,
            width: 300,
        },
        {
            key: 'scenario',
            title: '目标场景', dataIndex: 'scenario', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                [AdsScenarioData[0]['value']]: { text: AdsScenarioData[0].name },
                [AdsScenarioData[1]['value']]: { text: AdsScenarioData[1].name },
                [AdsScenarioData[2]['value']]: { text: AdsScenarioData[2].name },
                [AdsScenarioData[3]['value']]: { text: AdsScenarioData[3].name },
                [AdsScenarioData[4]['value']]: { text: AdsScenarioData[4].name },

            },
            width: 200,
            hideInSearch: true,
        },
        {
            key: 'templateType',
            title: '模板选择', dataIndex: 'templateType', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                "1": { text: AdsTemplateData[0].name },
                "2": { text: AdsTemplateData[1].name },
                "3": { text: AdsTemplateData[2].name },
            },
            // width: 80,
            hideInSearch: true,
        },
        {
            key: 'enabled',
            title: '状态', dataIndex: 'enabled', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                "true": { text: '启用', status: 'Success' },
                "false": { text: '停用', status: 'Default' },
            },
            width: 80,
            hideInSearch: true,
        },
    ];

    const adminModalTitle = "活动广告管理";

    // const initialValues = MockFormStore;

    const templateType = Form.useWatch('templateType', form);
    console.log("templateType", templateType);

    // const initialValues = useMemo(() => {
    //     // NOTICE: select and switch need initialValue if you want to select one
    //     const defaultFormValues = DefaultFormByTemplateType[templateType];
    //     return defaultFormValues;
    //
    // }, [templateType]);

    const initialValues = useMemo(() => {
        return {} as DeepPartial<IActivityAdsPageFormStore>;
    }, [showModalContent.isEdit]);

    useEffect(() => {

        if(!showModalContent.show) {
            form.setFieldsValue({});
        } else {
            if(!showModalContent.isEdit) {
                const defaultFormValues = DefaultFormByTemplateType[1];
                form.setFieldsValue(defaultFormValues);
            } else {
                form.setFieldsValue({});
            }
        }
    }, [showModalContent.show]);

    // NOTE: System reload EditChannelSetting
    const systemReloadEditUseCase = useCallback((currentFormData) => {
        // NOTICE: form
        // NOTE: form - menu
        // const targetMenu = currentRiskMenuData.filter(menu => menu.riskModelName === currentFormData.riskModelName)
        // const id = targetMenu && targetMenu[0] && targetMenu[0].id || undefined;

        // NOTE: form - main data
        form.setFieldsValue(currentFormData);
    }, [showModalContent.isEdit, currentFormData]);


    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if(showModalContent.isEdit && currentFormData) {
            systemReloadEditUseCase(currentFormData);
        }
    }, [showModalContent.isEdit, currentFormData]);


    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields) => {
        // console.log("onFieldsChange.changedFields[0].name[0]", changedFields[0].name[0])
        // NOTICE: change form field value

        // console.log(form.getFieldValue("ads"))
        // console.log("changedFields", changedFields);

        // NOTE: Template1
        if(changedFields[0].name[0] === "contents") {
            const originalValues = form.getFieldValue("contents");
            const index = changedFields[0].name[1];
            const key = changedFields[0].name[2];
            const key2 = changedFields[0].name[3];
            const value = changedFields[0].value;
            // console.log("index", index);
            // console.log("key", key);
            // console.log("key2", key2);
            // console.log("value", value);
            if(key2) {
                originalValues[index][key][key2] = value;
            } else if(typeof index !== "undefined" && typeof key !== "undefined"){
                originalValues[index][key] = value;
            }
            // NOTE: 同步 actionUrl 與 payload.actionUrl
            if(key === "actionUrl") {
                originalValues[index].payload.actionUrl = value;
            }

            // NOTE: 切換 action 將 actionUrl 原本值清空
            if(key === "action") {
                originalValues[index].actionUrl = "";
                originalValues[index].payload.action = value;
                originalValues[index].payload.actionUrl = "";
            }
            form.setFieldValue("contents", originalValues);
        }

        if(changedFields[0].name[0] === "templateType") {
            // const index = changedFields[0].name[1];
            // const key = changedFields[0].name[2];
            const value = changedFields[0].value;
            // console.log("templateType.value", value);
            // console.log("DefaultFormByTemplateType", DefaultFormByTemplateType);

            const defaultFormValues = DefaultFormByTemplateType[value];
            form.setFieldsValue(defaultFormValues);

            // NOTICE: Why onFieldsChange is triggered twice? #156 https://github.com/react-component/form/issues/156
            // modal.confirm({
            //     title: "切換版型會遺失目前的內容",
            //     // NOTICE: 得用下面寫法否則 editID 會找不到
            //     onOk:  () => {
            //         // console.log("defaultFormValues: ", defaultFormValues);
            //         // form.setFieldsValue(defaultFormValues);
            //     },
            //     // onOk: onDeleteModalOK,
            //     onCancel: () => {
            //
            //     },
            // });
        }
    }, []);

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [showModalContent.isEdit, editID]);

    // NOTE: user Edited ChannelSetting
    const userEditedChannelSettingUseCase = useCallback(() => {
        // const isValid = systemValidateChannelSettingUseCase();
        // if (!isValid) return;

        // NOTICE: need
        const fields = form.getFieldsValue();

        // NOTICE: MODE - Edit
        if (showModalContent.isEdit) {
            fields["id"] = editID;
        }

        // NOTE: Create or Edit
        const triggerAPI = (!showModalContent.isEdit ? triggerPost : triggerPut) as any;

        // console.log("fields", fields);

        // // NOTE: Request
        triggerAPI(fields).unwrap().then(() => {
            // console.log("responseData", responseData);

            // Reset Form
            form.resetFields();

            // Close Modal
            setShowModalContent({
                show: false,
                isEdit: false,
            });

            // Reset TableList
            triggerGetList && triggerGetList(null);
            // formSuccessCallback && formSuccessCallback();
        }).catch((error: CommonResponseError) => {
            modal.error({
                title: "Error",
                // NOTICE: 得用下面寫法否則 editID 會找不到
                onOk: () => {
                    //
                },
                // onOk: onDeleteModalOK,
                onCancel: () => {
                    //
                },
                content: error.data.message
            });
        });
    }, [showModalContent.isEdit, editID]);


    // NOTICE: UseCase
    // NOTE: User browse AllChannelSettings
    const userBrowseAllActivitiesUseCase = useCallback(() => {
        triggerGetList(null);
    }, []);

    useEffect(() => {
        userBrowseAllActivitiesUseCase();
    }, []);


    return (
        <AdminPage navigator={{
            ancestor: {
                path: "",
                breadcrumbName: "首页",
            },
            parent: {
                path: "",
                breadcrumbName: "导流管理",
            },
            self: {
                path: "",
                breadcrumbName: "活动广告管理"
            }
        }}>
            <>
                <AdminTable<ActivityModel>
                    tableHeaderColumns={columns}
                    tableDatasource={currentItemListData}
                    hasAddForm={true}
                    onAddCallback={onAddItem}
                    searchable={false}
                    rowKey="id"
                />

                <AdminFormCustomModal
                    title={adminModalTitle}
                    width={"1200px"}
                    showModalContent={showModalContent}
                    setShowModalContent={setShowModalContent}
                    onOk={onModalOk}
                    onCloseModal={onCloseModal}
                >
                    <ActivityAdsForm
                        form={form}
                        isEdit={showModalContent.isEdit}
                        id={editID}
                        initialValues={initialValues}
                        onFieldsChange={onFieldsChange}
                        onFinish={onFormFinish}
                        modal={modal}
                    />
                </AdminFormCustomModal>
                {/*NOTICE: Delete Modal*/}
                <div>{contextHolder}</div>
            </>
        </AdminPage>
    );
};
