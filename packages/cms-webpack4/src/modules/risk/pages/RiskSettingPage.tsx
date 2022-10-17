import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import AdminPage, {AdminTAbleTemplateRef, ModalContent} from "../templates/AdminPage";
import {ProColumns} from "@ant-design/pro-components";
import {GetProductListResponseProduct} from "../../product/api/types/getProductList";
import {useProductFormModal} from "../../product/hooks/useProductFormModal";
import useAutoLogin from "../../shared/hooks/useAutoLogin";
import ProductForm from "../../product/components/ProductForm";
import {ProductModal} from "../../product/components/ProductModal";
import AdminFormModal from "../templates/AdminFormModal";
import AdminFormTemplate from "../templates/AdminForm";
import RiskSettingForm from "../organisms/RiskSettingForm";
import {
    RiskManageList,
    useLazyGetRiskManageListQuery,
    useLazyGetRiskManageQuery,
    useLazyGetRiskModelMenuQuery
} from "../api/RiskApi";
import {useLazyGetProductManageListQuery} from "../../product/api/ProductApi";
import {useForm} from "antd/es/form/Form";


import {GetRiskManageResponse, } from "../api/RiskApi";
import RiskSettingModal from "../organisms/RiskSettingModal";
import {FormInstance} from "antd";

export type FormResponseData = GetRiskManageResponse;

const RiskSettingPage = () => {
    // useAutoLogin();

    // NOTE: UI Loading
    const [loading, setLoading] = useState(false);

    // NOTICE:
    const pageTemplateRef = useRef<AdminTAbleTemplateRef>();
    console.log("pageTemplateRef", pageTemplateRef);

    // NOTE: Fetch
    const [triggerGetList, { currentData, isLoading, isFetching }] = useLazyGetRiskManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);

    const onFormFinish = useCallback(() => {
        triggerGetList(null);
    }, [])

    useEffect(() => {
        setLoading(isFetching);
    }, [isFetching])

    // NOTE: Edit
    const [editID, setEditID] = useState<number>();

    // NOTE: Table
    const columns = useMemo(() => {
        const columns: ProColumns<RiskManageList>[] = [
            {
                key: 'option',
                title: '操作',
                valueType: 'option',
                render: (text, record, _, action) => {
                    return [
                        <a key="editable" onClick={() => {
                            console.log("record", record);
                            setEditID(record.id);
                            pageTemplateRef.current.setShowModalContent({
                                show: true,
                                isEdit: true,
                            })
                        }}>修改</a>,
                    ]
                }
            },
            {
                key: 'id',
                dataIndex: 'id',
                hideInSearch: true,
                hideInTable: true,
                // NOTICE:
                // tooltip: "",
                // ellipsis: false,
                // copyable: true,
                // hideInSearch: false,
                // hideInTable: false,
                // hideInForm: false,
                // hideInDescriptions: false,
                // onFilter: true,
                // disable: true,
            },
            { key: 'modelName', title: '风控名称', dataIndex: 'modelName', initialValue: "" },
            {
                key: 'enabled',
                title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all',
                valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    true: { text: '启用', status: 'Success' },
                    false: { text: '停用', status: 'Default' },
                }
            },
            { key: 'createTime', title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
            { key: 'updateTime', title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
        ];
        return columns;

    }, [pageTemplateRef.current]);

    // NOTICE: Form
    const [form] = useForm()

    // NOTICE: Modal
    // NOTE: autoComplete
    const onAutoCompleteTemplate = useCallback(() => {
        const mockRequest = {
            enabled: true,
            firstLoan: [
                {providerRank: 'A', balance: '4000'},
                {providerRank: 'B', balance: '3000'},
                {providerRank: 'C', balance: '2000'},
                {providerRank: 'D', balance: '1000'},
                {providerRank: 'E', balance: '0'}
            ],
            modelName: String(new Date().getTime()),
            remark: "remark",
            repeatLoan: [
                {providerRank: 'A', balance: '8000'},
                {providerRank: 'B', balance: '6000'},
                {providerRank: 'C', balance: '4000'},
                {providerRank: 'D', balance: '2000'},
                {providerRank: 'E', balance: '0'},
            ],
            riskModelName: 1,
            useRcQuota: true
        }
        form.setFieldsValue(mockRequest)
    }, [form])

    // NOTE: OK
    const onOk = useCallback(() => {
        form.submit();
    }, [form])



    // NOTE: Post | PUT Data
    return (
        <AdminPage<GetProductListResponseProduct>
            ref={pageTemplateRef}
            loading={loading}
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首页",
                },
                parent: {
                    path: "",
                    breadcrumbName: "风控管理",
                },
                self: {
                    path: "",
                    breadcrumbName:"风控配置"
                }
            }}
            searchable={false}
            onSearchClick={(props: RiskManageList) => {
                // const {productName, enabled} = props;
                // const searchedListData = productListData
                //     .filter(i => productName === "" ? i :  i.productName.toLowerCase().indexOf(productName.toLowerCase()) > -1)
                //     .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                return [];
            }}
            tableHeaderColumns={columns}
            tableDatasource={currentData}
            modalContent={(showModalContent: ModalContent, setShowModalContent: React.Dispatch<React.SetStateAction<ModalContent>>) => {
                return (
                    <RiskSettingModal
                        showModalContent={showModalContent}
                        setShowModalContent={setShowModalContent}
                        form={form}
                        onOk={onOk}
                        onAutoCompleteTemplate={onAutoCompleteTemplate}
                        editID={editID}
                        setLoading={setLoading}
                        loading={loading}
                        onFormFinish={onFormFinish}
                    />
                )
            }}
        />
    )
}
export default RiskSettingPage;
