import { Modal } from '@frontend/mobile/shared/ui';
import i18next from 'i18next';
import { getThemeConfigByCountry } from '../../modules/theme/getThemeConfigByCountry';
import { environment } from '../../../environments/environment';
import theme from '../../../environments/theme/india/v55/tailwind.theme';
// const customColors = require("../../../environments/theme/india/v55/tailwind.colors");

// NOTICE: 下面得 import 雖然 app.tsx 已經impoert
window.theme = getThemeConfigByCountry(environment.country);
// window.theme.button.primary.main = customColors.primary.main;
window.theme.button.primary.main = theme['primary_main'];

// window.theme.button.primary.text = customColors.primary.variant;
// window.theme.button.secondary.main = customColors.secondary.main;
// window.theme.button.secondary.text = customColors.secondary.variant;

export const alertModal = (message: string, title?: string) => {
  // console.log("message", message);
  // console.log("i18next.t(\"modal.Confirm\")", i18next.t("modal.Confirm"))
  // console.log("window.theme.3", window.theme);
  if (typeof message !== 'string') {
    message = String(message);
  }

  // if(typeof message === "string") {
  Modal.alert({
    show: true,
    mask: true,
    theme: window.theme,
    title: title || (i18next.t('modal.Error') as string),
    content: message,
    confirmText: i18next.t('modal.Confirm') as string,
    maskClosable: true,
    enableClose: false,
    enableIcon: false,
  });
  // }
};
