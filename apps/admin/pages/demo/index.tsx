import { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { DatePicker } from 'antd';
import DemoTable from "../../../cms/src/app/components/domo-table/demo-table";

// Module not found: Can't resolve 'ReactDOM'
import { ProForm, ProFormText } from '@ant-design/pro-components';

import { EllipsisOutlined } from '@ant-design/icons';
import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Button, Dropdown, Menu } from 'antd';

export default () => {

  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return domLoaded ? (
    <div>
      {/*Test*/}
      {/*<div>*/}
      {/*  <DatePicker/>*/}
      {/*  <ProForm*/}
      {/*    onFinish={async (values) => {*/}
      {/*      console.log(values);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <ProFormText name="name" label="姓名" />*/}
      {/*  </ProForm>*/}
      {/*</div>*/}

      {/*Page*/}
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
                breadcrumbName: '產品管理',
              },
              {
                path: '',
                breadcrumbName: '商戶管理',
              },
            ],
          },
        }}
        // footer={[
        //   <Button key="3">重置</Button>,
        //   <Button key="2" type="primary">
        //     提交
        //   </Button>,
        // ]}
      >
        <DemoTable/>
      </PageContainer>

    </div>
  ): null;
};
