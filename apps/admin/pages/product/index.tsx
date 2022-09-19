import { useState, useEffect } from 'react';
import Table from "./table";

import { PageContainer, ProCard } from '@ant-design/pro-components';
import {useProductFormModal} from "./useProductFormModal";

const Product=() => {
  const [domLoaded, setDomLoaded] = useState(false);

  const {ProductFormModal, productModalData, setProductModalData} = useProductFormModal({
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
        {productModalData.show && <ProductFormModal/>}
      </PageContainer>

    </div>
  ): null;
};
export default Product;
