import { NativeAppInfo } from 'apps/app/src/app/application/nativeAppInfo';
import defaultVipIcon from '../../images/VipIcon.svg';

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
