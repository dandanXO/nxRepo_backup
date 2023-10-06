import { environment } from 'apps/app/src/environments/environmentModule/environment';
import { AllCountryIdentityName } from 'libs/shared/domain/src/country/enum/AllCountryIdentityName';

import { NativeAppInfo } from '../../../application/nativeAppInfo';
import CouponImageSource from '../../components/images/coupon.png';
import MexicoCoupon from './i18n/MexicoCoupon.svg';
import PhilippinesCoupon from './i18n/PhilippinesCoupon.png';

const CouponModalContentAndroidWebviewPage = () => {
  const defaultCouponImage = {
    [AllCountryIdentityName.IN]: CouponImageSource,
    [AllCountryIdentityName.PK]: CouponImageSource,
    [AllCountryIdentityName.BN]: CouponImageSource,
    [AllCountryIdentityName.MX]: MexicoCoupon,
    [AllCountryIdentityName.PH]: PhilippinesCoupon,
  }[environment.country];

  let couponImage;

  try {
    couponImage = require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_coupon.png`);
  } catch (error) {
    couponImage = defaultCouponImage;
  }

  const imageOnError = (event: any) => {
    event.currentTarget.src = defaultCouponImage;
  };

  return (
    <img
      src={couponImage || defaultCouponImage}
      onError={imageOnError}
      alt="coupon"
    />
  );
};

export default CouponModalContentAndroidWebviewPage;
