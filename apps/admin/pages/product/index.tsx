import React, {useCallback, useEffect, useState} from 'react';
import moment from "moment"
import Table from "../../component/table";
import {PageContainer} from '@ant-design/pro-components';
import {useProductFormModal} from "../../component/useProductFormModal";
import {ProductModal} from "../../component/useProductFormModal/ProductModal";
import {FormInstance} from "antd/es";

const formRef = React.createRef();

const Product=() => {
  const [domLoaded, setDomLoaded] = useState(false);
  // const formRef = React.useRef<FormInstance>();

  // const [triggerTableGetList, setTriggerTableGetList] = useState();
  const {
    productModalData, setProductModalData,
    form, handleCloseModal, merchantList,
    uploadFiles, onFinish, setCustomAntFormFieldError,
    customAntFormFieldError, productFormData,
    setTriggerFetchTableList,
    triggerGetList, productListData
  } = useProductFormModal({
    show: false,
    isEdit: false,
    formRef,
  });

  useEffect(() => {
    setDomLoaded(true);
  }, []);



  return domLoaded ? (
    <div>
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
        <Table triggerGetList={triggerGetList} productListData={productListData} setProductModalData={setProductModalData} />

        {/*{productModalData.show && <ProductFormModal/>}*/}
        {productModalData.show && <ProductModal
          // ref={formRef}
          show={productModalData.show}
          setCustomAntFormFieldError={setCustomAntFormFieldError}
          customAntFormFieldError={customAntFormFieldError}
          productModalData={productModalData}
          handleCloseModal={handleCloseModal}
          onFinish={onFinish}
          form={form}
          merchantList={merchantList}
          uploadFiles={uploadFiles}
          onMockFinish={() => {
            form.setFieldsValue({
              // "merchantId": 2,
              // "productName": "1",
              // "adminUsername": "2",
              // "adminPassword": "************",
              // "logo": "https://unsplash.com/s/photos/photo",
              "amountRangeLow": "4000",
              "amountRangeHigh": "5000",
              "interestRangeLow": "6",
              "interestRangeHigh": "7",
              "termRangeLow": "8",
              "termRangeHigh": "9",
              "approveRate": "10",
              "approveTime": "50",
              "approveTimeUnit": "mins",
              "csEmail": "service@gmail.com",
              "csTime": [
                moment("2022-09-18T16:00:07.842Z", 'h:mm:ss'),
                moment("2022-09-18T23:00:00.281Z", 'h:mm:ss'),
              ],
              "loanTerm": "13",
              "maxAmount": "140000",
              "extensible": true,
              "extensibleOverdueDays": "15",
              "preInterestRate": "16",
              "postInterestRate": "17",
              "dailyRate": "18",
              "extensionRate": "19",
              "overdueRate": "20",
              "productInterestRatePairs": [
                {
                  "num": "21",
                  "preInterest": "22",
                  "postInterest": "23"
                }
              ],
              "top": false,
              "tags": [
                "小額",
                "借貸",
                "快速"
              ],
              "templateType": 1,
              "weight": "1",
              "enabled": false
            })
          }}
        />}
      </PageContainer>

    </div>
  ): null;
};
export default Product;
