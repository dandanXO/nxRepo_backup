import i18next from 'i18next';
import { Modal } from '@frontend/mobile/shared/ui';

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
