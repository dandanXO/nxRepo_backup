import { AndroidAppInfo } from './IWindow';
import { environment } from '../../../environments/environment';
import { alertModal } from '../../api/base/alertModal';

// export let androidAPPInfo: AndroidAppInfo = window.AppInfoTask && window.AppInfoTask.getAppInfo && window.AppInfoTask.getAppInfo()
// alertModal(JSON.stringify(androidAPPInfo));
//
// // NOTICE: app team dev packageId 都是 com.ind.kyc.application
// // NOTE: only H5 environment
// if(!androidAPPInfo) {
//   if(environment.country === "in") {
//     androidAPPInfo = {
//       domain: "india-api-dev.com",
//       environment: "india",
//       packageId: "com.ind.kyc.application",
//       appName: "dev_in",
//       uiVersion: "55",
//       token: "",
//     }
//   } else if(environment.country === "pk") {
//     androidAPPInfo = {
//       domain: "india-api-dev.com",
//       environment: "pakistan",
//       packageId: "com.pak.app.yesloan.android",
//       appName: "dev_in",
//       uiVersion: "15",
//       token: "",
//     }
//   } else {
//     new Error("appInfo is undefined");
//   }
// } else {
//   // NOTICE: 印度 v55, 巴基斯坦 v56 的 uiVersion 是寫死成 1 的
//   // NOTICE: 巴基斯坦 v56, uiVersion 則是變動的
//   if(androidAPPInfo.uiVersion === "1") {
//     if(androidAPPInfo.packageId === "com.ind.kyc.application") {
//       androidAPPInfo.environment = "india";
//       androidAPPInfo.uiVersion = "55"
//
//     } else if(androidAPPInfo.packageId === "com.pak.app.yesloan.android") {
//       androidAPPInfo.environment = "pakistan";
//       androidAPPInfo.uiVersion = "15"
//     }
//   }
// }
// console.log("[app] androidAPPInfo", JSON.parse(JSON.stringify(androidAPPInfo)));
