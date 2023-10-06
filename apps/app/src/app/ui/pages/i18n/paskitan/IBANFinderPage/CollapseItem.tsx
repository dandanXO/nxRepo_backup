import {RiArrowDownSLine} from '@react-icons/all-files/ri/RiArrowDownSLine';
import {RiArrowUpSLine} from '@react-icons/all-files/ri/RiArrowUpSLine';
import {ReactElement, useState} from 'react';

import Divider from '../../../../core-components/Divider';

interface ICollapseItemProps {
  title: string;
  content: ReactElement;
  isCollapse: boolean;
}

const CollapseItem = ({ title, content, isCollapse }: ICollapseItemProps) => {
  const [collapse, setCollapse] = useState(isCollapse);
  return (
    <div>
      <div className="flex items-center justify-between " onClick={() => setCollapse(!collapse)}>
        <div className="text-sm font-bold">{title}</div>
        <div className="text-xl">{collapse ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</div>
      </div>
      <Divider />
      {collapse && (
        <div className="my-4">
          <div className="bg-[#F6F6F6] p-4">{content}</div>
        </div>
      )}
    </div>
  );
};

export default CollapseItem;
