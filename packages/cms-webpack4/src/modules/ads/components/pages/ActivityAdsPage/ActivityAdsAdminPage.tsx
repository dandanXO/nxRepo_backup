import AdminPage from "../../../../shared/components/AdminPage";
import {AdminTable, ModalContent} from "../../../../shared/components/AdminTable";
import {ProColumns} from "@ant-design/pro-components";
import {ActivityBannerResponse} from "../../../service/types";
import React, {useCallback, useState} from "react";
import {AdsTemplateData} from "../../../data/AdsTemplateData";
import {AdsScenarioData} from "../../../data/AdsScenarioData";
import {ProColumnsOperationConstant} from "../../../../shared/components/ProColumnsOperationConstant";
import {AdminFormCustomModal} from "../../../../shared/components/AdminFormCustomModal";
import {useForm} from "antd/es/form/Form";
import {CustomAntFormFieldError} from "../../../../shared/utils/validation/CustomAntFormFieldError";
import {ActivityAdsEditPage} from "./ActivityAdsEditPage";

type IUseAdminTable = {
    // get
}
const useAdminTable = (props: IUseAdminTable) => {

}
export const ActivityAdsAdminPage = () => {

    const columns: ProColumns<ActivityBannerResponse<any, any>, "text">[] = [
        {
            key: 'option',
            title: '操作',
            valueType: 'option',
            render: (text, record, _, action) => {
                return [
                    <a key="editable" onClick={() => {
                        // userBrowseEditChannelSettingUseCase(record);
                    }}>修改</a>,<a key="deletable" onClick={() => {
                        // userBrowseDeleteChannelSettingUseCase(record)
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
    // Modal - OK
    const onModalOk = useCallback(() => {
        form.submit();
    }, [form])

    // Modal - Close
    const onCloseModal = useCallback(() => {
        form.resetFields();
        setCustomAntFormFieldError({});
    }, []);


    const adminModalTitle = "廣告管理";

    const onAddActivity = useCallback(() => {
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
                <AdminTable<ActivityBannerResponse<any, any>> tableHeaderColumns={columns} tableDatasource={[
                    {
                        name: "1",
                        templateType: 1,
                        sort: 1,
                        scenario: "DEFAULT",
                        enabled: false,
                    }
                    ]}
                  hasAddForm={true}
                    onAddCallback={onAddActivity}
                />
                <AdminFormCustomModal
                    width={"1200px"}
                    showModalContent={showModalContent} setShowModalContent={setShowModalContent} onOk={onModalOk} onCloseModal={onCloseModal} title={adminModalTitle}>
                    <ActivityAdsEditPage/>
                </AdminFormCustomModal>
            </>
        </AdminPage>
    )
}
