import { RiArrowDownSLine } from '@react-icons/all-files/ri/RiArrowDownSLine';
import { RiArrowUpSLine } from '@react-icons/all-files/ri/RiArrowUpSLine';

type ICardCollapseSection = {
  collapse: boolean;
};
export const CardCollapseSection = (props: ICardCollapseSection) => {
  return (
    <div className={'flex flex-row items-center justify-center '}>
      <div className={'text-ctext-secondary mr-2 text-xs'}>{props.collapse ? 'collapse' : 'expand'}</div>
      <div className={'w-2.5'}>
        {props.collapse ? (
          <RiArrowUpSLine className="fill-ctext-secondary" />
        ) : (
          <RiArrowDownSLine className="fill-ctext-secondary" />
        )}
      </div>
    </div>
  );
};
