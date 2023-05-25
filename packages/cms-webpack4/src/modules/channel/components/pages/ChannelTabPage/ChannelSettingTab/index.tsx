import { AdminTable, ModalContent } from "../../../../../shared/components/common/AdminTable";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ProColumns } from "@ant-design/pro-components";
import {
    useCreateChannelMutation, useCreateTagMutation,
    useLazyGetAllChannelQuery,
    useLazyGetAllChannelSettingTagDropMenuQuery,
    useLazyGetAllRiskDropMenuQuery,
    useLazyGetChannelQuery, useUpdateChannelMutation
} from "../../../../service/ChannelApi";
import { FormInstance } from "antd";
import { AdminFormCustomModal } from "../../../../../shared/components/common/AdminFormCustomModal";
import { useForm } from "antd/es/form/Form";
import { ChannelSettingForm } from "./ChannelSettingForm";
import { CustomAntFormFieldError } from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import { Channel } from "../../../../domain/vo/Channel";
import { UpdateChannelRequest } from "../../../../service/request/UpdateChannelRequest";
import { ChannelSettingTagFormModal } from "../ChannelSettingTagTab/ChannelSettingTagFormModal";
import { useFormModal } from "../ChannelSettingTagTab/useFormModal";
import { ProColumnsOperationConstant } from "../../../../../shared/components/common/ProColumnsOperationConstant";

type ChannelListItemVO = Channel & {
    enabledTag?: string;

}
const i18n = {
    "ChannelSettingTabPage": {
        add: "添加渠道",
    }
};
interface ChannelSettingTabPageProps {
    active: boolean;
}
export const ChannelSettingTabPage = (props : ChannelSettingTabPageProps) => {

    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<ChannelListItemVO>[]>();

    // NOTICE: Action: Edit
    const [editID, setEditID] = useState<number>();

    // NOTICE: Action: Create or Edit
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTICE: Search
    const onFormSearch = useCallback((form: FormInstance) => {
        const fields = form.getFieldsValue();
        // console.log(form.getFieldsValue() )

        if(fields.publishId === "全部" || fields.publishId === "0") {
            fields.publishId = "";
        }
        // transform enable
        fields.enabled = {
            "all": "",
            "enable": "1",
            "disable": "0",
        }[fields.enabledTag];

        userBrowseAndSearchAllItemsUseCase(fields);

    }, []);

    const onFormResetCallback = useCallback(() => {
        userBrowseAndSearchAllItemsUseCase({});
    }, []);

    const [triggerGetAllChannelSettingTagDropMenu, { currentData: allChannelSettingTagDropMenuData, isLoading: isLoadingAllChannelSettingTagDropMenuData, isFetching: isFetchingAllChannelSettingTagDropMenuData }] = useLazyGetAllChannelSettingTagDropMenuQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    useEffect(() => {
        triggerGetAllChannelSettingTagDropMenu(null);
    }, []);

    // NOTICE: Use Case
    // NOTE: System is initializing ChannelSetting List
    const systemInitalizeListUseCase = useCallback(() => {
        const publishNameTags = {
            "0": {
                status: "Default",
                text: "全部"
            }
        };
        allChannelSettingTagDropMenuData.map((item) => {
            publishNameTags[item.id] = {
                status: "Default",
                text: item.name,
            };
        });

        const columns: ProColumns<ChannelListItemVO>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            userBrowseEditChannelSettingUseCase(record);
                        }}>修改</a>,
                    ];
                },
                width: ProColumnsOperationConstant.width["2"],
            },
            {
                key: 'id',
                title: '渠道ID',
                dataIndex: 'id',
            },
            { key: 'name', title: '渠道名称', dataIndex: 'name', initialValue: "" },
            { key: 'packageId', title: 'PackageID', dataIndex: 'packageId', initialValue: "", hideInSearch: true, },
            { key: 'downloadLink', title: '渠道链接', dataIndex: 'url', initialValue: "", hideInSearch: true, ellipsis: true, copyable: true },
            { key: 'modelName', title: '风控方案', dataIndex: 'modelName', initialValue: "" },
            { key: 'appName', title: '包名', dataIndex: 'appName', initialValue: "" },
            { key: 'publishId', title: '配置标签', dataIndex: 'publishId', hideInTable: true,
                valueType: 'select',
                initialValue: publishNameTags["0"].text,
                valueEnum: publishNameTags
            },
            {
                key: 'publishName', title: '配置标签', dataIndex: 'publishName', hideInSearch: true,
            },
            {
                key: 'enabledTag',
                title: '状态', dataIndex: 'enabledTag', valueType: 'select',
                initialValue: 'all',
                valueEnum: {
                    "all": { text: '全部', status: 'Default' },
                    "enable": { text: '启用', status: 'Success' },
                    "disable": { text: '停用', status: 'Default' },
                },
                width: 80,
            },
        ];
        setColumns(columns);
    }, [allChannelSettingTagDropMenuData]);

    useEffect(() => {
        if(allChannelSettingTagDropMenuData) systemInitalizeListUseCase();
    }, [allChannelSettingTagDropMenuData]);

    // NOTE: User browse AllItemsUsecase
    const userBrowseAndSearchAllItemsUseCase = useCallback((query) => {
        triggerGetList(query);
    }, []);

    useEffect(() => {
        if(props.active) {
            triggerGetAllChannelSettingTagDropMenu(null);
            userBrowseAndSearchAllItemsUseCase({});
        }
    }, [props.active]);


    // NOTE: GET list and item
    const [triggerGetList, { currentData: currentItemListData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllChannelQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [currentTableListData, setCurrentTableListData] = useState<ChannelListItemVO[]>();
    useEffect(() => {
        if(!currentItemListData) return;
        const data = currentItemListData.map(item => {
            return {
                ...item,
                enabledTag: item.enabled === 0 ? "disable" : "enable"
            };
        });
        setCurrentTableListData(data);
    }, [currentItemListData]);

    const [triggerGetAllRiskDropMenu, { currentData: allRiskDropMenuData, isLoading: isLoadingAllRiskDropMenuData, isFetching: isFetchingAllRiskDropMenuData }] = useLazyGetAllRiskDropMenuQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });




    // NOTE: User add Item
    const userAddItemUseCase = useCallback(() => {
        triggerGetAllRiskDropMenu(null);
        triggerGetAllChannelSettingTagDropMenu(null);

        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);

    const onAddItem = useCallback(() => {
        userAddItemUseCase();
    }, []);

    // NOTICE: Form
    const [form] = useForm();

    // NOTICE: Modal - Create, Edit
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form]);

    // Modal - Close
    const onCloseModal = useCallback(() => {
        form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {
            enabled: true
        } as DeepPartial<{}>;
    }, []);

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields, allFields) => {
        // userEditingChannelSettingUseCase(changedFields);
    }, []);

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [showModalContent.isEdit, editID]);

    const userEditedChannelSettingUseCase = useCallback(() => {
        // const isValid = systemValidateChannelSettingUsecase();
        // if(!isValid) return;

        // NOTICE: need
        let fields = form.getFieldsValue();

        // NOTICE: MODE - Edit
        if(showModalContent.isEdit) {
            fields = {
                id: editID,
                modelId: fields.modelId,
                name: fields.name,
                enabled: fields.enabled,
                publishId: fields.publishId,
            } as UpdateChannelRequest;
        }
        fields["enabled"] = fields.enabled ? 1 : 0;

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
            });

            // Reset TableList
            triggerGetList({});

        });
    }, [showModalContent.isEdit, editID]);

    // NOTE: POST , PUT and DELETE
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateChannelMutation();
    const [triggerPut, { data: putData, isLoading: isPutLoading, isSuccess: isPutSuccess }] = useUpdateChannelMutation();

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>();

    // NOTE: User browse EditChannelSetting
    const userBrowseEditChannelSettingUseCase = useCallback((record: ChannelListItemVO) => {
        triggerGetAllRiskDropMenu(null);
        triggerGetAllChannelSettingTagDropMenu(null);

        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        });
        triggerGet({
            id: record.id,
        });
    }, []);
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetChannelQuery();

    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if(showModalContent.isEdit && currentFormData) {
            systemReloadEditChannelSettingUseCase(currentFormData);
        }
    }, [showModalContent.isEdit, currentFormData]);

    // NOTE: System reload EditChannelSetting
    const systemReloadEditChannelSettingUseCase = useCallback((currentFormData) => {
        // NOTE: form - main data
        form.setFieldsValue(currentFormData);
    }, [showModalContent.isEdit, currentFormData]);



    // NOTICE: 新增渠道標籤
    const [showTagModalContent, setShowTagModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });
    const [tagForm] = useForm();
    const [triggerPostTag, { data: postTagData, isLoading: isPostTagLoading , isSuccess: isPostTagSuccess }] = useCreateTagMutation();
    const {
        // form
        formInitialValues: tagFormInitialValues,
        onFormFieldsChange: onTagFormFieldsChange,
        onFormFinish: onTagFormFinish,
        customAntFormFieldError: customAntTagFormFieldError,
        // modal
        onModalOk: onTagModalOk,
        onCloseModal: onCloseTagModal,
    } = useFormModal({
        // NOTE: other need
        showModalContent: showTagModalContent,
        setShowModalContent: setShowTagModalContent,
        form: tagForm,
        //
        editID: null,
        triggerGetList: null,
        triggerPost: triggerPostTag,
        triggerPut: null,
        formSuccessCallback: () => {
            setTimeout(() => {
                triggerGetAllChannelSettingTagDropMenu(null);
            }, 2000);
        }
    });

    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<ChannelListItemVO>
                hasAddForm={true}
                tableHeaderColumns={columns}
                tableDatasource={currentTableListData}
                loading={isGetListFetching}
                addText={i18n.ChannelSettingTabPage.add}
                onAddCallback={onAddItem}
                setShowModalContent={setShowModalContent}
                isSearchFromClient={false}
                onFormSearchCallback={onFormSearch}
                onFormResetCallback={onFormResetCallback}
            />
            <AdminFormCustomModal
                title={"渠道配置"}
                showModalContent={showModalContent}
                setShowModalContent={setShowModalContent}
                onOk={onModalOk}
                onCloseModal={onCloseModal}
            >
                <ChannelSettingForm
                    isEdit={showModalContent.isEdit}
                    form={form}
                    initialValues={formInitialValues}
                    onFieldsChange={onFormFieldsChange}
                    onFinish={onFormFinish}
                    customAntFormFieldError={customAntFormFieldError}
                    // NOTE: data
                    dataForAllRiskDropMenuData={allRiskDropMenuData}
                    dataForAllChannelSettingTagDropMenuData={allChannelSettingTagDropMenuData}
                    setShowTagModalContent={() => setShowTagModalContent({
                        show: true,
                        isEdit: false,
                    })}
                />
            </AdminFormCustomModal>


            {/*NOTICE: 新增渠道標籤*/}
            <ChannelSettingTagFormModal
                // modal
                showModalContent={showTagModalContent}
                setShowModalContent={setShowTagModalContent}
                onModalOk={() => {
                    onTagModalOk();
                }}
                onCloseModal={onCloseTagModal}
                form={tagForm}
                formInitialValues={tagFormInitialValues}
                onFormFieldsChange={onTagFormFieldsChange}
                onFormFinish={onTagFormFinish}
                customAntFormFieldError={customAntTagFormFieldError}
            />
        </>
    );
};
