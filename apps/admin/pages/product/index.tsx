import { useState, useEffect } from 'react';
import Table from "./table";

import { PageContainer, ProCard } from '@ant-design/pro-components';
import ProductModal from './ProductModal';
import ProductEditModal from "./ProductEditModal";
export interface ProductModalType {
    setProductModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProductEditModalVisible {
  visible: boolean;
  productID: number;
}

const Product=() => {
  const [domLoaded, setDomLoaded] = useState(false);
  const [productModalVisible, setProductModalVisible] = useState(false);
  const [productEditModalVisible, setProductEditModalVisible] = useState<ProductEditModalVisible>({
    visible: false,
    productID: undefined
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
        <Table setProductModalVisible={setProductModalVisible} setProductEditModalVisible={setProductEditModalVisible}/>
        {productModalVisible && <ProductModal setProductModalVisible={setProductModalVisible}/>}
        {productEditModalVisible.visible && <ProductEditModal setProductEditModalVisible={setProductEditModalVisible}/>}
      </PageContainer>

    </div>
  ): null;
};
export default Product;
