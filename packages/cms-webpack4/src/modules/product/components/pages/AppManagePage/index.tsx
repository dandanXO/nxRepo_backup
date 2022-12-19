import {AdminTable, ModalContent} from "../../../../shared/components/AdminTable";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {FormInstance} from "antd";
import {AdminFormCustomModal} from "../../../../shared/components/AdminFormCustomModal";
import {useForm} from "antd/es/form/Form";
import {CustomAntFormFieldError} from "../../../../shared/utils/validation/CustomAntFormFieldError";
import AdminPage from "../../../../shared/components/AdminPage";
import {AppConfigurationListItem} from "../../../service/appManage/domain/AppConfigurationListItem";
import {
    useCreateAppConfigurationMutation,
    useDeleteAppConfigurationMutation,
    useLazyGetAllAppConfigurationQuery,
    useLazyGetAppConfigurationQuery,
    useUpdateAppConfigurationMutation
} from "../../../service/appManage/AppManageApi";
import {ProColumnsOperationConstant} from "../../../../shared/components/ProColumnsOperationConstant";
import {AppManageForm} from "./AppManageForm";
import {ChannelTagVO} from "../../../../channel/domain/vo/ChannelTagVO";
import {Modal} from "antd/es";

const i18n = {
    "AppManagePage": {
        add: "添加",
        modalTitle: "APP配置",
    }
}
export const idCardOcrList = [
    "NONE",
    "ACCUAUTH",
    "ADV_IQA",
    "ADV_IQC",
    "GCT",
]
export const liveDetectList = [
    "NONE",
    "ACCUAUTH",
    "ADVANCE",
    "GCT",
]
export const taxCardOcrList = [
    "NONE",
    "ACCUAUTH",
    "ADV_IQA",
    "ADV_IQC",
    "GCT",
]

export const AppManagePage = () => {
    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<AppConfigurationListItem>[]>()

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

        userBrowseAndSearchAllItemsUseCase(fields);

    }, [])

    const onFormResetCallback = useCallback(() => {
        userBrowseAndSearchAllItemsUseCase({});
    }, [])


    const [triggerDelete, { data: deleteData, isLoading: isDeleteLoading, isSuccess: isDeleteSuccess }] = useDeleteAppConfigurationMutation();

    const [modal, contextHolder] = Modal.useModal();

    const onDeleteModalOK = useCallback((editID: number) => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUseCase(editID)
    }, [])

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUseCase = useCallback((editID: number) => {
        // NOTE:
        triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            triggerGetList(null);
        })
    }, []);

    const onDeleteModalCancel = useCallback(() => {

    }, [])


    const userBrowseDeleteChannelSettingUseCase = useCallback((record: AppConfigurationListItem) => {
        modal.confirm({
            title: "确认要删除此笔数据吗?",
            // NOTICE: 得用下面寫法否則 editID 會找不到
            onOk: () => onDeleteModalOK(record.id),
            // onOk: onDeleteModalOK,
            onCancel: onDeleteModalCancel,
        });
    }, [])

    // NOTICE: Use Case
    // NOTE: System is initializing ChannelSetting List
    const systemInitalizeListUsecase = useCallback(() => {
        const columns: ProColumns<AppConfigurationListItem>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            userBrowseEditChannelSettingUseCase(record);
                        }}>修改</a>,
                        <a key="deletable" onClick={() => {
                            userBrowseDeleteChannelSettingUseCase(record)
                        }}>刪除</a>,
                    ]
                },
                width: ProColumnsOperationConstant.width["2"],
            },
            { key: 'appName', title: 'APP名称', dataIndex: 'appName', initialValue: "" },
            { key: 'packageId', title: 'PackageID', dataIndex: 'packageId', initialValue: "", hideInSearch: true,},
            { key: 'createTime', title: '创建时间', dataIndex: 'createTime', initialValue: "", hideInSearch: true},
            { key: 'updateTime', title: '更新时间', dataIndex: 'updateTime', initialValue: "", hideInSearch: true,},
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
    const [triggerGetList, { currentData: currentItemListData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllAppConfigurationQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });
    const [currentTableListData, setCurrentTableListData] = useState<AppConfigurationListItem[]>();
    useEffect(() => {
        if(!currentItemListData) return;
        const data = currentItemListData.map(item => {
            return {
                ...item,
            }
        })
        setCurrentTableListData(data);
    }, [currentItemListData])

    // const [triggerGetAllRiskDropMenu, { currentData: allRiskDropMenuData, isLoading: isLoadingAllRiskDropMenuData, isFetching: isFetchingAllRiskDropMenuData }] = useLazyGetAllRiskDropMenuQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });

    // const [triggerGetAllChannelSettingTagDropMenu, { currentData: allChannelSettingTagDropMenuData, isLoading: isLoadingAllChannelSettingTagDropMenuData, isFetching: isFetchingAllChannelSettingTagDropMenuData }] = useLazyGetAllChannelSettingTagDropMenuQuery({
    //     pollingInterval: 0,
    //     refetchOnFocus: false,
    //     refetchOnReconnect: false
    // });


    // NOTE: User add Item
    const userAddItemUseCase = useCallback(() => {
        // triggerGetAllRiskDropMenu(null);
        // triggerGetAllChannelSettingTagDropMenu(null);

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
        form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    // Form - Initial Data
    const formInitialValues = useMemo(() => {
        // NOTE: select and switch need initialValue if you want to select one
        return {
            showNbfc: true,
            loginFirst: true,
            kycFirst: false,
            showPermission: true,
            showTermAndCondition: true,
            showPartnership: false,
            taxCardOcr: taxCardOcrList[0],
            liveDetect: liveDetectList[0],
            idCardOcr: idCardOcrList[0],
        } as DeepPartial<{}>;
    }, [])

    // Form - onFieldsChange
    const onFormFieldsChange = useCallback((changedFields, allFields) => {
        // userEditingChannelSettingUseCase(changedFields);
    }, [])

    // Form - Finish
    const onFormFinish = useCallback(() => {
        userEditedChannelSettingUseCase();
    }, [showModalContent.isEdit, editID])

    const userEditedChannelSettingUseCase = useCallback(() => {
        // const isValid = systemValidateChannelSettingUsecase();
        // if(!isValid) return;

        // NOTICE: need
        let fields = form.getFieldsValue();

        // NOTICE: MODE - Edit
        if(showModalContent.isEdit) {
            fields['id'] = editID;
            delete fields['packageId'];
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
            triggerGetList({});

        })
    }, [showModalContent.isEdit, editID])

    // NOTE: POST , PUT and DELETE
    const [triggerPost, { data: postData, isLoading: isPostLoading , isSuccess: isPostSuccess }] = useCreateAppConfigurationMutation();
    const [triggerPut, { data: putData, isLoading: isPutLoading, isSuccess: isPutSuccess }] = useUpdateAppConfigurationMutation();

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // NOTE: User browse EditChannelSetting
    const userBrowseEditChannelSettingUseCase = useCallback((record: AppConfigurationListItem) => {
        // triggerGetAllRiskDropMenu(null);
        // triggerGetAllChannelSettingTagDropMenu(null);

        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        })
        triggerGet({
            id: record.id,
        });
    }, []);
    const [triggerGet , { data: previousData, currentData: currentFormData, isLoading: isGetLoading, isFetching: isGetFetching, isSuccess: isGetSuccess }] = useLazyGetAppConfigurationQuery();

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
        <AdminPage
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: "",
                    breadcrumbName: "APP配置",
                },
                self: {
                    path: "",
                    breadcrumbName:"APP配置"
                }
            }}
        >
            <>
                {/*NOTICE: List Table*/}
                <AdminTable<AppConfigurationListItem>
                    hasAddForm={true}
                    tableHeaderColumns={columns}
                    tableDatasource={currentTableListData}
                    loading={isGetListFetching}
                    addText={i18n.AppManagePage.add}
                    onAddCallback={onAddItem}
                    setShowModalContent={setShowModalContent}
                    onFormSearchCallback={onFormSearch}
                    onFormResetCallback={onFormResetCallback}
                    isSearchFromClient={true}
                    onSearchClick={(searchInputKeys: any) => {
                        // console.log("searchInputKeys", searchInputKeys);
                        let temp = currentTableListData;
                        Object.keys(searchInputKeys).map(key => {
                            let searchInputValue = searchInputKeys[key]
                            if(searchInputValue !== "") {
                                temp = temp.filter(item => item[key] === searchInputValue);
                            }
                        })
                        return temp;
                    }}
                />
                <AdminFormCustomModal
                    width={"600px"}
                    title={i18n.AppManagePage.modalTitle}
                    showModalContent={showModalContent}
                    setShowModalContent={setShowModalContent}
                    onOk={onModalOk}
                    onCloseModal={onCloseModal}
                >
                    <AppManageForm isEdit={showModalContent.isEdit} form={form} initialValues={formInitialValues} onFieldsChange={onFormFieldsChange} onFinish={onFormFinish}
                                   taxCardOcrList={taxCardOcrList} idCardOcrList={idCardOcrList} liveDetectList={liveDetectList}/>
                </AdminFormCustomModal>

                {/*NOTICE: Delete Modal*/}
                <div>{contextHolder}</div>
            </>
        </AdminPage>
    )
}
