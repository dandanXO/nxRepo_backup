import AdminPage from "../../../../shared/components/AdminPage";
import {AdminTable, ModalContent} from "../../../../shared/components/AdminTable";
import {ProColumns} from "@ant-design/pro-components";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {AdsTemplateData} from "../../../data/AdsTemplateData";
import {AdsScenarioData} from "../../../data/AdsScenarioData";
import {ProColumnsOperationConstant} from "../../../../shared/components/ProColumnsOperationConstant";
import {AdminFormCustomModal} from "../../../../shared/components/AdminFormCustomModal";
import {useForm} from "antd/es/form/Form";
import {CustomAntFormFieldError} from "../../../../shared/utils/validation/CustomAntFormFieldError";
import {ActivityAdsForm} from "./ActivityAdsForm";
import {MockActivityBannerResponseData3} from "../../../service/mock/MockActivityBannerResponseData3";
import {useDeleteTagMutation} from "../../../../channel/service/ChannelApi";
import {ActivityModel, useLazyGetActivitiesQuery} from "../../../service/AdsApi";
import {Modal} from "antd/es";
import {IActivityAdsPageFormStore} from "../../../types/IAdsFormStore";
import {Form} from "antd";

type IUseAdminTable = {
    triggerGetList: any;
    triggerDelete: any;
}
const useAdminFormModal = (props: IUseAdminTable) => {

    // NOTICE: Action: Create or Edit
    // NOTE: Modal
    const [showModalContent, setShowModalContent] = useState<ModalContent>({
        show: false,
        isEdit: false,
    });

    // NOTICE: Form
    const [form] = useForm()

    const [editID, setEditID] = useState<number>();

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    // NOTICE: Modal - Create, Edit
    const [modal, contextHolder] = Modal.useModal();
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form])

    // Modal - Close
    const onCloseModal = useCallback(() => {
        form.resetFields();
        setCustomAntFormFieldError({});
    }, []);

    const onAddItem = useCallback(() => {
        userAdd()
    }, [])


    // NOTE: User add ChannelSetting
    const userAdd = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);


    // NOTE: User browse EditChannelSetting
    //     userBrowseEditChannelSettingUseCase
    const onEditItem = useCallback((record: ActivityModel) => {
        // triggerGetAllRiskDropMenu(null);
        // triggerGetAllChannelSettingTagDropMenu(null);

        setEditID(record.id);
        setShowModalContent({
            show: true,
            isEdit: true,
        })
        // triggerGet({
        //     id: record.id,
        // });
        props.triggerGetList({
            id: record.id,
        })
    }, []);

    // NOTICE: Modal - Delete
    const [showDeleteModal, setShowDeletedModal] = useState(false);

    const onDeleteModalOK = useCallback((editID: number) => {
        // NOTICE: need dependency array
        userDeleteChannelSettingUseCase(editID)
    }, [])

    // NOTE: User delete ChannelSetting
    const userDeleteChannelSettingUseCase = useCallback((editID: number) => {
        // NOTE:
        props.triggerDelete({
            id: editID,
        }).unwrap().then(() => {
            setShowDeletedModal(false);
            props.triggerGetList(null);
        })
    }, []);

    const onDeleteModalCancel = useCallback(() => {
        setShowDeletedModal(false);
    }, [])

    // userBrowseDeleteChannelSettingUseCase
    const onDeleteItem = useCallback((record: ActivityModel) => {
        modal.confirm({
            title: "确认要删除此笔数据吗?",
            // NOTICE: 得用下面寫法否則 editID 會找不到
            onOk: () => onDeleteModalOK(record.id),
            // onOk: onDeleteModalOK,
            onCancel: onDeleteModalCancel,
        });
    }, [])


    return {
        showModalContent,
        setShowModalContent,
        onModalOk,
        onCloseModal,

        modal,
        editID,
        form,
        onAddItem,
        onEditItem,
        onDeleteItem,
        contextHolder,

    }
}

// const MockFormStore = MockActivityBannerResponseData1;
// const MockFormStore = MockActivityBannerResponseData2;
// const MockFormStore = MockActivityBannerResponseData3;


const DefaultFormByTemplateType = {
    "1": {
        templateType: 1,
        enabled: true,
        scenario: "DEFAULT",
        sort: 0,
        contents: [
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    title: "新人福利",
                    priceUnit: "PKR",
                    price: "5,000",
                    description: "新人大禮包",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "APPLY_LOAN",
                    actionUrl: "",
                    actionName: "點我借款 >",
                    title: "利息優惠1",
                    description1: "- 1.0%",
                    description2: "原利息15%",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "POP_URL",
                actionUrl: "http://google.com",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "",
                    actionName: "點我借款 >",
                    title: "利息優惠2",
                    description1: "- 2.0%",
                    description2: "原利息25%",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>,
    "2": {
        templateType: 2,
        enabled: true,
        scenario: "DEFAULT",
        sort: 0,
        contents: [
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionName: "立即查看",
                    actionUrl: "",
                    title1: "最快3分鐘",
                    title2: "放款率最高",
                    priceUnit: "PKR",
                    price: "5,000",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "http://google.com",
                    actionName: "立即申請",
                    title: "信用500以上 秒下款",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "POP_URL",
                actionUrl: "http://google.com",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "http://google.com",
                    actionName: "立即申請",
                    title: "憑信用卡秒下50000元",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>,
    "3": {
        templateType: 3,
        enabled: true,
        scenario: "DEFAULT",
        sort: 0,
        contents: [
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "APPLY_LOAN",
                    actionUrl: "",
                    actionName: "立即查看",
                    title: "新人福利",
                    description1: "99%",
                    description2: "成功放款率",
                },
            },
            {
                // NOTICE: REFACTOR
                action: "APPLY_LOAN",
                actionUrl: "",
                payload: {
                    // NOTICE: REFACTOR
                    action: "POP_URL",
                    actionUrl: "",
                    actionName: "立即申請",
                    title: "利息優惠",
                    description1: "-3.5%",
                    description2: "原利息35%",
                },
            },
        ],
    } as DeepPartial<IActivityAdsPageFormStore>
}

export const ActivityAdsAdminPage = () => {

    // NOTE: GET list and item
    const [triggerGetList, {
        currentData: currentItemListData,
        isLoading: isGetListLoading,
        isFetching: isGetListFetching
    }] = useLazyGetActivitiesQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    const [triggerDelete, {
        data: deleteData,
        isLoading: isDeleteLoading,
        isSuccess: isDeleteSuccess
    }] = useDeleteTagMutation();

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
        triggerGetList,
        triggerDelete,
    });


    const columns: ProColumns<ActivityModel, "text">[] = [
        {
            key: 'option',
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => {
                return [
                    <a key="editable" onClick={() => {
                        // userBrowseEditChannelSettingUseCase(record);
                        onEditItem(record);
                    }}>修改</a>,<a key="deletable" onClick={() => {
                        // userBrowseDeleteChannelSettingUseCase(record)
                        onDeleteItem(record);
                    }}>刪除</a>,
                ]
            },
            width: ProColumnsOperationConstant.width["2"],
        },
        {
            key: 'id',
            title: 'ID',
            dataIndex: 'id',
            hideInSearch: true,
        },
        { key: 'name', title: '广告名称', dataIndex: 'name', initialValue: "" },
        {
            key: 'scenario',
            title: '目标场景', dataIndex: 'enabled', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                [AdsScenarioData[0]['value']]: { text: AdsScenarioData[0].name},
                [AdsScenarioData[1]['value']]: { text: AdsScenarioData[1].name},
                [AdsScenarioData[2]['value']]: { text: AdsScenarioData[2].name},
                [AdsScenarioData[3]['value']]: { text: AdsScenarioData[3].name},
                [AdsScenarioData[4]['value']]: { text: AdsScenarioData[4].name},

            },
            width: 80,
        },
        {
            key: 'templateType',
            title: '模板选择', dataIndex: 'enabled', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                "1": { text: AdsTemplateData[0].name},
                "2": { text: AdsTemplateData[1].name},
                "3": { text: AdsTemplateData[2].name},
            },
            width: 80,
        },
        {
            key: 'enabled',
            title: '状态', dataIndex: 'enabled', valueType: 'select',
            initialValue: 'all',
            valueEnum: {
                "all": { text: '全部', status: 'Default' },
                "enable": { text: '启用', status: 'Success' },
                "disable": { text: '停用', status: 'Default' },
            },
            width: 80,
        },
    ]




    const adminModalTitle = "廣告管理";

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
        // return {
        //     templateType: 1,
        //     enabled: true,
        //     scenario: "DEFAULT",
        //     sort: 0,
        // } as DeepPartial<IActivityAdsPageFormStore>
        const defaultFormValues = DefaultFormByTemplateType[1];
        return defaultFormValues;
    }, []);

    // useEffect(() => {
    //     const defaultFormValues = DefaultFormByTemplateType[1];
    //     form.setFieldValue("ads", defaultFormValues);
    // }, [])


    // NOTE: onFieldsChange
    const onFieldsChange = useCallback((changedFields, allFields) => {
        // console.log("onFieldsChange")
        // NOTICE: change form field value
        const originalValues = form.getFieldValue("ads");
        // console.log(form.getFieldValue("ads"))
        // console.log("changedFields", changedFields);

        // NOTE: Template1
        if(changedFields[0].name[0] === "contents") {
            const index = changedFields[0].name[1];
            const key = changedFields[0].name[2];
            const value = changedFields[0].value;
            originalValues[index][key] = value;
            // console.log("originalValues", originalValues)
            form.setFieldValue("contents", originalValues);
            // console.log("after", form.getFieldValue("contents"));
        }

        if(changedFields[0].name[0] === "templateType") {
            const index = changedFields[0].name[1];
            const key = changedFields[0].name[2];
            const value = changedFields[0].value;
            console.log("templateType.value", value);
            console.log("DefaultFormByTemplateType", DefaultFormByTemplateType);
            const defaultFormValues = DefaultFormByTemplateType[value];

            // NOTICE: Why onFieldsChange is triggered twice? #156 https://github.com/react-component/form/issues/156
            // modal.confirm({
            //     title: "切換版型會遺失目前的內容?",
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
    }, [])

    // NOTICE: Form.3 onFinish
    const onFinish = useCallback(() => {}, []);


    // NOTICE: UseCase
    // NOTE: User browse AllChannelSettings
    const userBrowseAllActivitiesUseCase = useCallback(() => {
        triggerGetList(null);
    }, [])

    useEffect(() => {
        userBrowseAllActivitiesUseCase()
    }, [])

    return (
        <AdminPage navigator={{
            ancestor: {
                path: "",
                breadcrumbName: "首页",
            },
            parent: {
                path: "",
                breadcrumbName: "廣告管理",
            },
            self: {
                path: "/activity-ads-admin",
                breadcrumbName:"廣告管理"
            }
        }}>
            <>
                <AdminTable<ActivityModel> tableHeaderColumns={columns} tableDatasource={currentItemListData}
                    hasAddForm={true}
                    onAddCallback={onAddItem}
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
                        onFinish={onFinish}
                    />
                </AdminFormCustomModal>
                {/*NOTICE: Delete Modal*/}
                <div>{contextHolder}</div>
            </>
        </AdminPage>
    )
}
