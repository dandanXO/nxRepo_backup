import { GetCouponApplicableList } from '../../../api/userService/GetCouponApplicableListResponse';
import { renderByCountry } from '../../../modules/i18n';
import { IndiaCountry } from '../../../../../../../libs/shared/domain/src/country/IndiaCountry';
import { PakistanCountry } from '../../../../../../../libs/shared/domain/src/country/PakistanCountry';
import IndiaCoupon from './i18n/IndiaCoupon';
import PakistanCoupon from './i18n/PakistanCoupon';
export type ICouponProps = GetCouponApplicableList & {
  status?: string;
  onClick?: () => void;
  buttonText?: string;
};

const Coupon = (props: ICouponProps) => {
  
  return (
     renderByCountry(
        {
          [IndiaCountry.country]: (
            <IndiaCoupon {...props} />
          ),
          [PakistanCountry.country]: (
            <PakistanCoupon {...props} />
          ),
        },
        <IndiaCoupon {...props} />
      )

  );
};

export default Coupon;
