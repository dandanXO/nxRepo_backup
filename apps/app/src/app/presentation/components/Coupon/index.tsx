import { MexicoCountry } from '../../../../../../../libs/shared/domain/src/country/MexicoCountry';

import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import { PhilippinesCountry } from '../../../../../../../libs/shared/domain/src/country/PhilippinesCountry';
import { GetCouponApplicableList } from '../../../api/userService/GetCouponApplicableListResponse';
import { renderByCountry } from '../../../modules/i18n';
import IndiaCoupon from './i18n/IndiaCoupon';
import PakistanCoupon from './i18n/PakistanCoupon';
import PhilippinesCoupon from './i18n/PhilippinesCoupon';

export type ICouponProps = GetCouponApplicableList & {
  status?: string;
  onClick?: () => void;
  buttonText?: string;
};

const Coupon = (props: ICouponProps) => {
  return renderByCountry(
    {
      [IndiaCountry.country]: <IndiaCoupon {...props} />,
      [PakistanCountry.country]: <PakistanCoupon {...props} />,
      [MexicoCountry.country]: <PakistanCoupon {...props} />, // PK 跟 MX 的長一樣，暫時先放pk的
      [PhilippinesCountry.country]: <PhilippinesCoupon {...props} />,
    },
    <IndiaCoupon {...props} />
  );
};

export default Coupon;
