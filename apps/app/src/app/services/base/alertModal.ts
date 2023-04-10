import { Modal } from "@frontend/mobile/shared/ui";
import i18next from "i18next";
import {getThemeConfig} from "../../modules/theme/getThemeConfig";
import {environment} from "../../../environments/environment";

// NOTICE: 下面得 import 雖然 app.tsx 已經impoert
window.theme = getThemeConfig(environment.country);

export const alertModal = (message: string) => {
  console.log("message", message);
  console.log("i18next.t(\"modal.Confirm\")", i18next.t("modal.Confirm"))
  console.log("window.theme.3", window.theme);
  Modal.alert({
    show: true,
    mask: true,
    theme: window.theme,
    title: i18next.t("modal.Error") as string,
    content: message,
    confirmText: i18next.t("modal.Confirm") as string,
    maskClosable: true,
    enableClose: false,
    enableIcon: false,
  });
}
