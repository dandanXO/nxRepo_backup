import { NativeAppInfo } from 'apps/app/src/app/persistant/nativeAppInfo';
import defaultVipIcon from '../../../../components/images/VipIcon.svg';

const VipIcon = () => {
  let icon;
  try {
    icon = require(`../../../../../../environments/themeModule/${NativeAppInfo.environment}/v${NativeAppInfo.uiVersion}/ic_vip_card.png`);
  } catch (error) {
    icon = defaultVipIcon; 
  }

  return icon
}

export default VipIcon;