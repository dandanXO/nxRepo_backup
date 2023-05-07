import { useState } from 'react';
import { Tags } from '../../components/Tag';
import { Page } from '../../components/layouts/Page';

const MyCouponListPage = () => {
  const [listStatus, setListStatus] = useState(0);
  return (
    <Page className="flex flex-col">
      <div
        className={`flex flex-row py-3 px-5 justify-between sticky top-[0px] bg-white`}
      >
        <Tags
          items={['Usable', 'Used', 'Expired']}
          layoutType={2}
          style={` text-sm mx-1`}
        />

        {/* {['Usable', 'Used', 'Expired'].map((i,index) => <Tag layoutType={2}
                    key={i} onClick={() => setListStatus(index)} text={i}
                    active={index === listStatus} style={` text-sm mx-1`} />)} */}
      </div>
      123
    </Page>
  );
};

export default MyCouponListPage;
