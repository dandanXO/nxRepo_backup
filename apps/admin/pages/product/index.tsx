import { useState, useEffect } from 'react';
import Table from "./table";

import { PageContainer, ProCard } from '@ant-design/pro-components';
import ProductModal from './ProductModal';
export interface ProductModalType {
    setProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}
 const Product=() => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(true);
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
        <Table setProductModalVisible={setProductModalVisible}/>
        {productModalVisible && <ProductModal setProductModalVisible={setProductModalVisible}/>}
      </PageContainer>

    </div>
  ): null;
};
export default Product;
