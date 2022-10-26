import {AdminTable, ModalContent} from "../../../../../shared/components/AdminTable";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {
    useCreateChannelMutation,
    useLazyGetAllChannelQuery,
    useLazyGetAllChannelSettingTagDropMenuQuery,
    useLazyGetAllRiskDropMenuQuery,
    useLazyGetChannelQuery
} from "../../../../api/ChannelApi";
import {FormInstance} from "antd";
import {AdminFormCustomModal} from "../../../../../shared/components/AdminFormCustomModal";
import {useForm} from "antd/es/form/Form";
import {ChannelSettingForm} from "./ChannelSettingForm";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";
import {Channel} from "../../../../api/dto/Channel";

type ChannelListItemVO = Channel & {
    enabledTag?: string;
}
const i18n = {
    "ChannelSettingTabPage": {
        add: "添加渠道",
    }
}
export const ChannelSettingTabPage = () => {
    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<ChannelListItemVO>[]>()

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

        // transform enable
        fields.enabled = {
            "all": "",
            "enable": "1",
            "disable": "0",
        }[fields.enabledTag]

        userBrowseAndSearchAllItemsUseCase(fields);

    }, [])

    // NOTICE: Use Case
    // NOTE: System is initializing ChannelSetting List
    const systemInitalizeListUsecase = useCallback(() => {
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
                    ]
                }
            },
            {
                key: 'id',
                title: '渠道ID',
                dataIndex: 'id',
            },
            { key: 'name', title: '渠道名称', dataIndex: 'name', initialValue: "" },
            { key: 'packageId', title: 'PackgeID', dataIndex: 'packageId', initialValue: "", hideInSearch: true, },
            { key: 'downloadLink', title: '链接', dataIndex: 'url', initialValue: "", hideInSearch: true, },
            { key: 'modelName', title: '风控方案', dataIndex: 'modelName', initialValue: "" },
            { key: 'appName', title: '包名', dataIndex: 'appName', initialValue: "" },
            { key: 'publishId', title: '配置标签', dataIndex: 'publishId', initialValue: "" },
            {
                key: 'enabledTag',
                title: '状态', dataIndex: 'enabledTag', valueType: 'select',
                initialValue: 'all',
                valueEnum: {
                    "all": { text: '全部', status: 'Default' },
                    "enable": { text: '启用', status: 'Success' },
                    "disable": { text: '停用', status: 'Default' },
                }
            },
        ];
        setColumns(columns);
    }, []);

    useEffect(() => {
        systemInitalizeListUsecase();
    }, [])

    // NOTE: User browse AllItemsUsecase
    const userBrowseAndSearchAllItemsUseCase = useCallback((query) => {
        triggerGetList(query);
    }, [])

    useEffect(() => {
        userBrowseAndSearchAllItemsUseCase({})
    }, []);


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
            }
        })
        setCurrentTableListData(data);
    }, [currentItemListData])

    const [triggerGetAllRiskDropMenu, { currentData: allRiskDropMenuData, isLoading: isLoadingAllRiskDropMenuData, isFetching: isFetchingAllRiskDropMenuData }] = useLazyGetAllRiskDropMenuQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [triggerGetAllChannelSettingTagDropMenu, { currentData: allChannelSettingTagDropMenuData, isLoading: isLoadingAllChannelSettingTagDropMenuData, isFetching: isFetchingAllChannelSettingTagDropMenuData }] = useLazyGetAllChannelSettingTagDropMenuQuery({
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
        userAddItemUseCase()
    }, [])

    // NOTICE: Form
    const [form] = useForm()

    // NOTICE: Modal - Create, Edit
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form])

    // Modal - Close
    const onCloseModal = useCallback(() => {
        setCustomAntFormFieldError({});
    }, []);

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {
            enabled: true
        } as DeepPartial<{}>;
    }, [])

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields, allFields) => {
        // userEditingChannelSettingUsecase(changedFields);
    }, [])

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [editID])

    const userEditedChannelSettingUseCase = useCallback(() => {
        // const isValid = systemValidateChannelSettingUsecase();
        // if(!isValid) return;

        // NOTICE: need
        const fields = form.getFieldsValue();

        // NOTICE: MODE - Edit
        if(showModalContent.isEdit) {
            fields["id"] = editID;
        }

        // NOTE: Create or Edit
        // const triggerAPI = !showModalContent.isEdit ? triggerPost : triggerPut;
        const triggerAPI = triggerPost

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
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateChannelMutation();


    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // NOTE: User browse EditChannelSetting
    const userBrowseEditChannelSettingUseCase = useCallback((record: ChannelListItemVO) => {
        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        })
        triggerGet({
            id: record.id,
        });
    }, []);
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetChannelQuery();

    // NOTE: Form - Mode: edit (Set form fields from data)
    useEffect(() => {
        if(showModalContent.isEdit && currentFormData) {
            systemReloadEditChannelSettingUseCase(currentFormData)
        }
    }, [showModalContent.isEdit, currentFormData])

    // NOTE: System reload EditChannelSetting
    const systemReloadEditChannelSettingUseCase = useCallback((currentFormData) => {
        // NOTE: form - main data
        form.setFieldsValue(currentFormData)
    }, [showModalContent.isEdit, currentFormData])

    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<ChannelListItemVO>
                tableHeaderColumns={columns}
                tableDatasource={currentTableListData}
                loading={isGetListFetching}
                addText={i18n.ChannelSettingTabPage.add}
                onAddCallback={onAddItem}
                setShowModalContent={setShowModalContent}
                isSearchFromClient={false}
                onFormSearchCallback={onFormSearch}
            />
            <AdminFormCustomModal
                title={"渠道配置"}
                showModalContent={showModalContent}
                setShowModalContent={setShowModalContent}
                form={form}
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
                    dataForAllRiskDropMenuData={allRiskDropMenuData}
                    dataForAllChannelSettingTagDropMenuData={allChannelSettingTagDropMenuData}
                />
            </AdminFormCustomModal>
        </>
    )
}
