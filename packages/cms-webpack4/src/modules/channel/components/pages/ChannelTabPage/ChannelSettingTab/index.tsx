import {AdminTable, ModalContent} from "../../../../../shared/components/AdminTable";
import {ChannelTagVO} from "../ChannelSettingTagTab/formData";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {ProColumns} from "@ant-design/pro-components";
import {useLazyGetAllChannelQuery, useLazyGetAllTagQuery} from "../../../../api/ChannelApi";
import {MssChannelListItem} from "../../../../api/dto/ChannelDTO";
import {FormInstance} from "antd";
import {AdminFormCustomModal} from "../../../../../shared/components/AdminFormCustomModal";
import {useForm} from "antd/es/form/Form";
import {ChannelSettingForm} from "./ChannelSettingForm";
import {CustomAntFormFieldError} from "../../../../../shared/utils/validation/CustomAntFormFieldError";

const i18n = {
    "ChannelSettingTabPage": {
        add: "添加渠道",
    }
}
export const ChannelSettingTabPage = () => {
    // NOTICE: Action: List
    // NOTE: Table
    const [columns, setColumns] = useState<ProColumns<MssChannelListItem>[]>()

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
        }[fields.enabled]

        userBrowseAllItemsUsecase(fields);

    }, [])

    // NOTICE: Use Case
    // NOTE: System is initializing ChannelSetting List
    const systemInitalizeListUsecase = useCallback(() => {
        const columns: ProColumns<MssChannelListItem>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        // <a key="editable" onClick={() => {
                        //     userBrowseEditChannelSettingUsecase(record);
                        // }}>修改</a>,
                        // <a key="deletable" onClick={() => {
                        //     userBrowseDeleteChannelSettingUsecase(record)
                        // }}>刪除</a>,
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
            { key: 'downloadLink', title: '链接', dataIndex: 'downloadLink', initialValue: "", hideInSearch: true, },
            { key: 'modelName', title: '风控方案', dataIndex: 'modelName', initialValue: "" },
            { key: 'appName', title: '包名', dataIndex: 'appName', initialValue: "" },
            { key: 'publishId', title: '配置标签', dataIndex: 'publishId', initialValue: "" },
            {
                key: 'enabled',
                title: '状态', dataIndex: 'enabled', valueType: 'select',
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
    const userBrowseAndSearchAllItemsUsecase = useCallback((query) => {
        triggerGetList(query);
    }, [])

    useEffect(() => {
        userBrowseAndSearchAllItemsUsecase({})
    }, []);


    // NOTE: GET list and item
    const [triggerGetList, { currentData: currentItemListData, isLoading: isGetListLoading, isFetching: isGetListFetching }] = useLazyGetAllChannelQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // NOTE: User add Item
    const userAddItem = useCallback(() => {
        setEditID(undefined);
        setShowModalContent({
            show: true,
            isEdit: false,
        });
    }, []);

    const onAddItem = useCallback(() => {
        userAddItem()
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
        // userEditedChannelSetting();
    }, [editID])

    // Form - Validation
    const [customAntFormFieldError, setCustomAntFormFieldError] = useState<CustomAntFormFieldError>()

    return (
        <>
            {/*NOTICE: List Table*/}
            <AdminTable<MssChannelListItem>
                tableHeaderColumns={columns}
                tableDatasource={currentItemListData}
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
                />

            </AdminFormCustomModal>
        </>
    )
}
