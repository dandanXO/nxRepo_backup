import React, {useEffect, useState} from 'react';
import ProductTable from "../modules/product/components/ProductTable";
import {PageContainer} from '@ant-design/pro-components';
import {useProductFormModal} from "../modules/product/hooks/useProductFormModal";
import {ProductModal} from "../modules/product/components/ProductModal";
import ProductForm from "../modules/product/components/ProductForm";

const Product=() => {

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
    onAutoFinishedForm,
    onFormSubmit
  } = useProductFormModal({
    show: false,
    isEdit: false,
    // formRef,
  });

  useEffect(() => {
    triggerGetList(null);
  });

  return domLoaded ? (
    <PageContainer
      // loading
      header={{
        // title: '页面标题',
        ghost: true,
        breadcrumb: {
          routes: [
            {
              path: '',
              breadcrumbName: '首页',
            },
            {
              path: '',
              breadcrumbName: '产品管理 ',
            },
            {
              path: '',
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
          onMockFinish={onAutoFinishedForm}
          isEdit={productModalData.isEdit}
          onOk={onFormSubmit}
        >
          <ProductForm productModalData={productModalData} onFinish={onFinish} form={form} merchantList={merchantList} customAntFormFieldError={customAntFormFieldError} setCustomAntFormFieldError={setCustomAntFormFieldError} show={productModalData.show}/>
        </ProductModal>
      )}
    </PageContainer>
  ): null;
};
export default Product;
