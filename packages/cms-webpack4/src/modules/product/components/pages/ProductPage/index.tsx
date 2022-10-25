import React, {useEffect, useState} from 'react';
import ProductTable from "./ProductTable";
import {PageContainer} from '@ant-design/pro-components';
import {useProductFormModal} from "./hooks/useProductFormModal";
import {ProductModal} from "./ProductModal";
import ProductForm from "./ProductForm";

export const ProductPage = () => {

  const [domLoaded, setDomLoaded] = useState(false);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const {
    productModalData, setProductModalData,
    form, handleCloseModal, merchantList,
    onFinish, setCustomAntFormFieldError,
    customAntFormFieldError,
    triggerGetList, productListData,
    // onAutoFinishedForm,
    onFormSubmit,
      enableLoanAmount,
      enableReLoanAmount,
      setEnableLoanAmount,
      setEnableReLoanAmount,
  } = useProductFormModal({
    show: false,
    isEdit: false,
    // formRef,
  });

  useEffect(() => {
    triggerGetList(null);
  }, []);

  return domLoaded ? (
    <PageContainer
      // loading
      header={{
        breadcrumb: {
          routes: [
            {
                // TODO:
              path: '/product',
              breadcrumbName: '首页',
            },
            {
              path: '/product',
              breadcrumbName: '产品管理 ',
            },
            {
              path: '/product',
              breadcrumbName: '产品管理',
            },
          ],
        },
      }}
    >
      <ProductTable triggerGetList={triggerGetList} productListData={productListData} setProductModalData={setProductModalData} />

      {productModalData.show && (
        <ProductModal
          show={productModalData.show}
          handleCloseModal={handleCloseModal}
          // onMockFinish={onAutoFinishedForm}
          isEdit={productModalData.isEdit}
          onOk={onFormSubmit}
        >
          <ProductForm productModalData={productModalData}
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
    </PageContainer>
  ): null;
};
