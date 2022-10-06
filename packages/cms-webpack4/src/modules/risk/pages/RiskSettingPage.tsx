import React, {useEffect, useMemo, useRef, useState} from "react";
import AdminPageTemplate, {AdminTAbleTemplateRef} from "../templates/AdminPageTemplate";
import {ProColumns} from "@ant-design/pro-components";
import {GetProductListResponseProduct} from "../../product/api/types/getProductList";
import {useProductFormModal} from "../../product/hooks/useProductFormModal";
import useAutoLogin from "../../shared/hooks/useAutoLogin";
import ProductForm from "../../product/components/ProductForm";
import {ProductModal} from "../../product/components/ProductModal";
import AdminFormModalTemplate from "../templates/AdminFormModalTemplate";
import AdminFormTemplate from "../templates/AdminFormTemplate";
import RiskSettingForm from "../organisms/RiskSettingForm";

const RiskSettingPage = () => {
    // useAutoLogin();

    const pageTemplateRef = useRef<AdminTAbleTemplateRef>();
    console.log("pageTemplateRef", pageTemplateRef);

    // hook
    const {
        productModalData,
        form, handleCloseModal, merchantList,
        onFinish, setCustomAntFormFieldError,
        customAntFormFieldError,
        triggerGetList, productListData,
        onAutoFinishedForm,
        onFormSubmit
    } = useProductFormModal({
        show: false,
        isEdit: false,
    });

    // useHook
    useEffect(() => {
        triggerGetList(null);
    }, []);

    // Require
    const columns = useMemo(() => {
        const columns: ProColumns<GetProductListResponseProduct>[] = [
            {
                title: '操作',
                valueType: 'option',
                key: 'option',
                render: (text, record, _, action) => [
                    <a key="editable" onClick={() => {
                        pageTemplateRef.current.setShowModalContent({
                            show: true,
                            isEdit: true,
                        })
                    }}>修改</a>,
                ],
            },
            { title: '风控名称', dataIndex: 'productName', initialValue: "" },
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

    }, []);


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
            onSearchClick={(props) => {
                const {productName, enabled} = props;
                const searchedListData = productListData
                    .filter(i => productName === "" ? i :  i.productName.toLowerCase().indexOf(productName.toLowerCase()) > -1)
                    .filter(i => enabled === "all" ? i : i.enabled.toString() === enabled);
                return searchedListData;
            }}
            tableHeaderColumns={columns}
            tableDatasource={productListData}
            modalContent={(showModalContent, setShowModalContent) => {
                return (
                    <AdminFormModalTemplate
                        show={showModalContent.show}
                        isEdit={showModalContent.isEdit}
                        hasAddForm={true}
                        hasEditForm={true}
                        addTitle={"添加风控配置"}
                        editTitle={"修改风控配置"}
                        handleCloseModal={() => setShowModalContent({
                            show: false,
                            isEdit: false,
                        })}
                        onOk={onFormSubmit}
                        // onMockFinish={onAutoFinishedForm}

                    >
                        <RiskSettingForm/>
                    </AdminFormModalTemplate>
                )
            }}
        />
    )
}
export default RiskSettingPage;
