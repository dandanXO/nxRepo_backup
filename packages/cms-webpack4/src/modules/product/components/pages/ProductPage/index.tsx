import { itemRender } from '../../../../shared/components/common/itemRender';
import ProductForm from './ProductForm';
import { ProductModal } from './ProductModal';
import ProductTable from './ProductTable';
import { useProductFormModal } from './hooks/useProductFormModal';
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';

export const ProductPage = (): JSX.Element => {
    const [domLoaded, setDomLoaded] = useState(false);
    useEffect(() => {
        setDomLoaded(true);
    }, []);

    const {
        productModalData,
        setProductModalData,
        form,
        handleCloseModal,
        merchantList,
        onFinish,
        setCustomAntFormFieldError,
        customAntFormFieldError,
        triggerGetList,
        productListData,
        // onAutoFinishedForm,
        onFormSubmit,
        enableLoanAmount,
        enableReLoanAmount,
        setEnableLoanAmount,
        setEnableReLoanAmount,
        contextHolder,
    } = useProductFormModal({
        show: false,
        isEdit: false,
        // formRef,
    });

    return domLoaded ? (
        <PageContainer
            // loading
            header={{
                breadcrumb: {
                    itemRender: itemRender,
                    routes: [
                        {
                            // TODO:
                            path: '/',
                            breadcrumbName: '首页',
                        },
                        {
                            path: null,
                            breadcrumbName: '产品管理 ',
                        },
                        {
                            path: null,
                            breadcrumbName: '产品管理',
                        },
                    ],
                },
            }}
        >
            <ProductTable
                triggerGetList={triggerGetList}
                productListData={productListData}
                setProductModalData={setProductModalData}
            />

            {productModalData.show && (
                <ProductModal
                    show={productModalData.show}
                    handleCloseModal={handleCloseModal}
                    // onMockFinish={onAutoFinishedForm}
                    isEdit={productModalData.isEdit}
                    onOk={onFormSubmit}
                >
                    <ProductForm
                        productModalData={productModalData}
                        onFinish={onFinish}
                        form={form}
                        merchantList={merchantList}
                        customAntFormFieldError={customAntFormFieldError}
                        setCustomAntFormFieldError={setCustomAntFormFieldError}
                        show={productModalData.show}
                        enableLoanAmount={enableLoanAmount}
                        enableReLoanAmount={enableReLoanAmount}
                        setEnableLoanAmount={setEnableLoanAmount}
                        setEnableReLoanAmount={setEnableReLoanAmount}
                    />
                </ProductModal>
            )}
            <div>{contextHolder}</div>
        </PageContainer>
    ) : null;
};
