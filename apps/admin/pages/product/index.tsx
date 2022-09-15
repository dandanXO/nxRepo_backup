import { useState, useEffect } from 'react';
import Table from "./table";

import { PageContainer, ProCard } from '@ant-design/pro-components';

export default () => {
  const [domLoaded, setDomLoaded] = useState(false);

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
        <Table/>
      </PageContainer>

    </div>
  ): null;
};
