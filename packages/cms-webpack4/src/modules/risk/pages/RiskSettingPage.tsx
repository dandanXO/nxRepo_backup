import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import AdminPageTemplate, {AdminTAbleTemplateRef, ModalContent} from "../templates/AdminPageTemplate";
import {ProColumns} from "@ant-design/pro-components";
import {GetProductListResponseProduct} from "../../product/api/types/getProductList";
import {useProductFormModal} from "../../product/hooks/useProductFormModal";
import useAutoLogin from "../../shared/hooks/useAutoLogin";
import ProductForm from "../../product/components/ProductForm";
import {ProductModal} from "../../product/components/ProductModal";
import AdminFormModalTemplate from "../templates/AdminFormModalTemplate";
import AdminFormTemplate from "../templates/AdminFormTemplate";
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

    const pageTemplateRef = useRef<AdminTAbleTemplateRef>();
    console.log("pageTemplateRef", pageTemplateRef);

    // hook
    // const {
    //     productModalData,
    //     form, handleCloseModal, merchantList,
    //     onFinish, setCustomAntFormFieldError,
    //     customAntFormFieldError,
    //     triggerGetList, productListData,
    //     onAutoFinishedForm,
    //     onFormSubmit
    // } = useProductFormModal({
    //     show: false,
    //     isEdit: false,
    // });
    const [triggerGetList, { currentData, isLoading, isFetching }] = useLazyGetRiskManageListQuery({
        pollingInterval: 0,
        refetchOnFocus: false,
        refetchOnReconnect: false
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);

    // Edit
    const [editID, setEditID] = useState<number>();

    // Require
    const columns = useMemo(() => {
        const columns: ProColumns<RiskManageList>[] = [
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
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
            { title: '风控名称', dataIndex: 'modelName', initialValue: "" },
            {
                title: '状态', dataIndex: 'enabled', valueType: 'select', initialValue: 'all',
                valueEnum: {
                    all: { text: '全部', status: 'Default' },
                    true: { text: '启用', status: 'Success' },
                    false: { text: '停用', status: 'Default' },
                }
            },
            { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
            { title: '更新时间', dataIndex: 'updateTime', valueType: 'dateTime' },
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
                {missing: 'A', balance: '4000'},
                {missing: 'B', balance: '3000'},
                {missing: 'C', balance: '2000'},
                {missing: 'D', balance: '1000'},
                {missing: 'E', balance: '0'}
            ],
            modelName: "20221007",
            remark: "remark",
            repeatLoan: [
                {missing: 'A', balance: '8000'},
                {missing: 'B', balance: '6000'},
                {missing: 'C', balance: '4000'},
                {missing: 'D', balance: '2000'},
                {missing: 'E', balance: '0'},
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


    // const isEdit = useMemo(() => {
        const isEdit = pageTemplateRef.current && pageTemplateRef.current.showModalContent.isEdit;
        // console.log("isEdit", isEdit);
        // return isEdit;
    // }, [pageTemplateRef.current])



    // const isShow = useMemo(() => {
        const isShow = pageTemplateRef.current && pageTemplateRef.current.showModalContent.show;
        // console.log("isShow", isShow);
        // return isShow;
    // }, [pageTemplateRef.current])



    // NOTE: Post | PUT Data
    return (
        <AdminPageTemplate<GetProductListResponseProduct>
            ref={pageTemplateRef}
            navigator={{
                ancestor: {
                    path: "",
                    breadcrumbName: "首頁",
                },
                parent: {
                    path: "",
                    breadcrumbName: "風控管理",
                },
                self: {
                    path: "",
                    breadcrumbName:"風控配置"
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
                    />
                )
            }}
        />
    )
}
export default RiskSettingPage;
