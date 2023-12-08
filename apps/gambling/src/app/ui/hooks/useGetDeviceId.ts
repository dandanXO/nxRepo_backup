import {AppLocalStorage} from "../../persistant/localstorage";
import {AppLocalStorageKey} from "../../persistant/AppLocalStorageKey";
import {v4 as uuidv4} from "uuid";
import * as Sentry from "@sentry/browser";

export const useGetDeviceId = (phoneNumber: string, type: "login" | "register") => {
  const deviceId = AppLocalStorage.getItem(AppLocalStorageKey.deviceId);
  let finalDeviceId = deviceId;
  const customDeviceId = `CUSTOM_DEVICE_ID_${phoneNumber}_${Date.now()}`;
  if(!deviceId) {
    try {
      const newDeviceId = uuidv4();
      finalDeviceId = newDeviceId;
      Sentry.captureMessage("DeviceId Initialize Error, so generate new", {
        level: 'fatal',
        tags: {},
        extra: {
          original_deviceId: deviceId,
          new_deviceId: newDeviceId,
          type: type,
        }
      });
    } catch (e) {
      console.log(e);
      finalDeviceId = customDeviceId;
      Sentry.captureException(e, );
    }
  }
  AppLocalStorage.setItem(AppLocalStorageKey.deviceId, finalDeviceId || customDeviceId);
  return {
    deviceId: finalDeviceId || customDeviceId
  }
}
