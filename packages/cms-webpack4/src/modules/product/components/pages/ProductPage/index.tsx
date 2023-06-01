import { itemRender } from '../../../../shared/components/common/itemRender';
import ProductForm from './ProductForm';
import { ProductModal } from './ProductModal';
import ProductTable from './ProductTable';
import { useProductFormModal } from './hooks/useProductFormModal';
import { PageContainer } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { message } from "antd";

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
        productRiskList,
        modal,
        onFinish,
        setCustomAntFormFieldError,
        customAntFormFieldError,
        isPutProductSuccess,
        isPostProductCreateSuccess,
        triggerGetList,
        productListData,
        // onAutoFinishedForm,
        onFormSubmit,
        contextHolder,
    } = useProductFormModal({
        show: false,
        isEdit: false,
        // formRef,
    });

  const [messageAPI, messageContextHolder] = message.useMessage();

  useEffect(() => {
      if(isPutProductSuccess || isPostProductCreateSuccess){
          messageAPI.success('已储存');
      }
  }, [isPutProductSuccess, isPutProductSuccess]);

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
      {messageContextHolder}
      <ProductTable triggerGetList={triggerGetList} productListData={productListData} setProductModalData={setProductModalData} />

      {productModalData.show && (
        <ProductModal
          show={productModalData.show}
          handleCloseModal={handleCloseModal}
          // onMockFinish={onAutoFinishedForm}
          isEdit={productModalData.isEdit}
          onOk={onFormSubmit}
        >
          <ProductForm modal={modal}
                       productModalData={productModalData}
                       onFinish={onFinish}
                       form={form}
                       merchantList={merchantList}
                       productRiskList={productRiskList}
                       customAntFormFieldError={customAntFormFieldError}
                       setCustomAntFormFieldError={setCustomAntFormFieldError}
                       show={productModalData.show}
            />
        </ProductModal>
      )}
        <div>{contextHolder}</div>
    </PageContainer>
  ) : null;
};
