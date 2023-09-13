import { environment } from 'apps/app/src/environments/environmentModule/environment';
import CouponImageSource from '../../../../assets/coupon.png';
import { AllCountryIdentityName } from 'libs/shared/domain/src/country/enum/AllCountryIdentityName';
import MexicoCoupon from './i18n/MexicoCoupon.svg';
import PhilippinesCoupon from './i18n/PhilippinesCoupon.png';

import { NativeAppInfo } from '../../../persistant/nativeAppInfo';

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
    couponImage = require(`../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_coupon.png`)
  } catch (error) {
    couponImage = defaultCouponImage; 
  }

  const imageOnError = (event:any) => {
    event.currentTarget.src = defaultCouponImage;
  };

  return <img src={couponImage || defaultCouponImage} onError={imageOnError}  alt="coupon" />;
};

export default CouponModalContentAndroidWebviewPage;




