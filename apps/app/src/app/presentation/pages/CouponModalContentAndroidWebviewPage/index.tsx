import { environment } from 'apps/app/src/environments/environmentModule/environment';
import CouponImageSource from '../../../../assets/coupon.png';
import { AllCountriesEnum } from 'libs/shared/domain/src/country/AllCountry';
import { AllCountryIdentityName } from 'libs/shared/domain/src/country/enum/AllCountryIdentityName';
import MexicoCoupon from './i18n/MexicoCoupon.svg';
import PhilippinesCoupon from './i18n/PhilippinesCoupon.png';

const CouponModalContentAndroidWebviewPage = () => {
  const couponImage = {
    [AllCountryIdentityName.IN]: CouponImageSource,
    [AllCountryIdentityName.PK]: CouponImageSource,
    [AllCountryIdentityName.BN]: CouponImageSource,
    [AllCountryIdentityName.MX]: MexicoCoupon,
    [AllCountryIdentityName.PH]: PhilippinesCoupon,
  }[environment.country]

  return <img src={couponImage ? couponImage : CouponImageSource} />;
};

export default CouponModalContentAndroidWebviewPage;
