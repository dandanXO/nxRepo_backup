import { useState, useEffect } from 'react';
import moment from "moment"
import Table from "./table";
import { PageContainer, ProCard } from '@ant-design/pro-components';
import {ProductFormModal, ProductModal, useProductFormModal} from "./useProductFormModal";
import {GetAvailableMerchantResponse} from "../../types/getAvailbaleMerchant";



const Product=() => {
  const [domLoaded, setDomLoaded] = useState(false);

  const {ProductFormModal, productModalData, setProductModalData, form, handleCloseModal, merchantList, uploadFiles, onFinish} = useProductFormModal({
    show: false,
    isEdit: false,
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
                breadcrumbName: '首頁',
              },
              {
                path: '',
                breadcrumbName: '產品管理 ',
              },
              {
                path: '',
                breadcrumbName: '產品管理',
              },
            ],
          },
        }}
      >
        <Table setProductModalData={setProductModalData}/>
        {/*{productModalData.show && <ProductFormModal/>}*/}
        {productModalData.show && <ProductModal
          productModalData={productModalData}
          handleCloseModal={handleCloseModal}
          onFinish={onFinish}
          form={form}
          merchantList={merchantList}
          uploadFiles={uploadFiles}
          onMockFinish={() => {
            form.setFieldsValue({
              "merchantId": 2,
              "productName": "1",
              "adminUsername": "2",
              "adminPassword": "3",
              "logo": "https://unsplash.com/s/photos/photo",
              "amountRangeLow": "4",
              "amountRangeHigh": "5",
              "interestRangeLow": "6",
              "interestRangeHigh": "7",
              "termRangeLow": "8",
              "termRangeHigh": "9",
              "approveRate": "10",
              "approveTime": "11",
              "approveTimeUnit": "mins",
              "csEmail": "12@gmail.com",
              "csTime": [
                moment("2022-09-18T16:00:07.842Z", 'h:mm:ss'),
                moment("2022-09-18T23:00:00.281Z", 'h:mm:ss'),
              ],
              "loanTerm": "13",
              "maxAmount": "14",
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
              "top": true,
              "tags": [
                "24",
                "25",
                "26"
              ],
              "templateType": 2,
              "weight": "25",
              "enabled": true
            })
          }}
        />}
      </PageContainer>

    </div>
  ): null;
};
export default Product;
