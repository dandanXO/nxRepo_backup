import conf from 'conf';
import * as Sentry from "@sentry/react";
import {BrowserTracing} from "@sentry/tracing";
import Cookies from "js-cookie";
import hotkeys from "hotkeys-js";
// import ClipboardJS from "clipboard"
import html2canvas from "html2canvas";
import { detectIncognito } from "detectincognitojs";

console.log("[api-dlh-web] conf", conf);

export const Application = {
  isLocalhost: function () {
    return window.location.hostname === "localhost"
  },
  getEnvironmentName: function (){
    const envMachine = this.isLocalhost() ? "localhost" : "production";
    return `${envMachine}:${conf.country}`;
  }
}

const UserActions = {
  "select": `User Select`,
  "copy": `User Copy`,
  "copyColumnText": `User Copy Column Text`,
  "pasta": `User Pasta`,
  "cut": `User Cut`,
}
export const SentryModule = {
  enable: true,
  isMonitoring: false,
  getReplayConfig: function () {
    return {
      maskAllText: false,
      maskAllInputs: false,
      blockAllMedia: false,
    }
  },
  sendCopyColumnTextMessage: function (selectionContent) {
    // NOTE: message
    Sentry.captureMessage(UserActions.copyColumnText, {
      level: "info",
      tags: {
        userAction: "copyColumnText",
        selectContent: selectionContent,
      },
    })
  },
  init: function () {
    const envName = Application.getEnvironmentName();
    // console.log("[api-dlh-web][sentry] environment", envName);
    // console.log("[api-dlh-web][sentry] isLocalhost", Application.isLocalhost());

    const sentryConfig = {
      dsn: "https://c10ab5774259474a9832879e2c3bfeae@web.sijneokd.com/2",
      integrations: [new BrowserTracing(), new Sentry.Replay(this.getReplayConfig())],
      environment: envName,
      // Set tracesSampleRate to 1.0 to capture 100%
      // of transactions for performance monitoring.
      // We recommend adjusting this value in production
      tracesSampleRate: 1.0,
      // Session Replay
      replaysSessionSampleRate: 1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
      replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
    }
    if(!Application.isLocalhost()) {
      sentryConfig.release = appInfo.COMMITHASH;
    }

    if(this.enable) {
      Sentry.init(sentryConfig);
      console.log("[api-dlh-web] sentry.init");
    }
    // NOTICE: Tag: can search these
    // Tag values have a maximum length of 200 characters and they cannot contain the newline (\n) character.
    // NOTICE: Context: cannot search these
  },
  // NOTICE: 傳送任意訊息
  sendSelectionMessage: async function (selectionContent) {
    const that = this;
    const finalSelectionContent = selectionContent.replace(/\n/g, " ");
    // const detectIncognitoResult = await detectIncognito();
    // console.log("detectIncognitoResult.browserName", detectIncognitoResult.browserName);
    // console.log("detectIncognitoResult.isPrivate", detectIncognitoResult.isPrivate);

    Sentry.configureScope((scope) => {

      const login = JSON.parse(Cookies.get("loginInfo")).data;
      const getInfo = JSON.parse(Cookies.get("adminUser")).data;

      // NOTE: copy content
      if(finalSelectionContent.length > 200) {

        // NOTE: attachment
        const filePath = `Selection-${Application.getEnvironmentName()}-${login.phoneNo}-${new Date().toISOString()}.txt`;

        scope.addAttachment({
          data: finalSelectionContent,
          // attachmentType: "image/octet-stream",
          // contentType: "image/png",
          // contentType: "",
          filename: filePath,
        })

        // NOTE: breadcrumb
        // that.addBreadcrumb({
        //   category: "User Selection",
        //   message: filePath,
        // });

        // NOTE: message
        Sentry.captureMessage(UserActions.select, {
          level: "info",
          tags: {
            userAction: "select",
            selectContent: filePath,
            // ...that.getCommonTagsInfo(),
            // privateMode: detectIncognitoResult.isPrivate,
          },
        })
      } else {
        // that.addBreadcrumb({
        //   category: "User Selection",
        //   message: finalSelectionContent,
        // });

        // NOTE: message
        Sentry.captureMessage(UserActions.select, {
          level: "info",
          tags: {
            userAction: "select",
            selectContent: finalSelectionContent,
            // ...that.getCommonTagsInfo(),
            // privateMode: detectIncognitoResult.isPrivate,
          },
        })
      }
      scope.clearAttachments();
    })
  },
  // NOTE: 使用者選擇文字後 mouseup， (後續並不知道是否有利用右鍵進行複製)
  startToMonitorUserMouseSelection: function () {
    console.log("startToMonitorUserMouseSelection")
    const that = this;
    let isSelecting = false;
    let selection = null;

    function callback() {
      const selectionContent = document.getSelection().toString();
      console.log("[sentry][user] selectionContent", selectionContent)
      that.sendSelectionMessage(selectionContent).then(() => {

      })
    }

    function handleSelectStart(event) {
      // console.log(event);
      isSelecting = true;
    }

    function handleMouseUp(event) {
      // console.log(event, isSelecting);
      if (isSelecting && !window.getSelection().isCollapsed) {
        callback((selection = window.getSelection()));
        isSelecting = false;
      }
    }

    function handleSelectionChange(event) {
      // console.log('change', isSelecting);
      if (window.getSelection().isCollapsed && null !== selection) {
        callback((selection = null));
      }
    }

    window.addEventListener('selectstart', handleSelectStart);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('selectionchange', handleSelectionChange);

    // document.onselectionchange = () => {
    //   console.log(document.getSelection());
    // };

  },
  // stopToMonitorContextmenu: function () {
  //
  // },

  // NOTICE: 取得選擇的文字，並傳送
  // sendSelectText: async function (eventTitle) {
  //   // NOTICE: screenshot
  //   // this.screenshot();
  //
  //   // NOTICE: selection
  //   const selectionContent = window.getSelection().toString();
  //   // console.log("eventTitle", eventTitle);
  //   // console.log("selectionContent", selectionContent);
  //
  //   await this.sendSelectionMessage(eventTitle, selectionContent);
  // },

  settingUserInfo: function () {
    const login = JSON.parse(Cookies.get("loginInfo")).data;
    const getInfo = JSON.parse(Cookies.get("adminUser")).data;

    const userInfo = {
      // NOTE: 使用地區、工作站(真假)
      // country: 編譯給定的 ENV
      "user.regionId": getInfo.regionId,
      "user.stationId": getInfo.stationId,
      // IP: sentry 預設會紀錄
      // NOTE: 帳號授權資訊
      "user.passwordLogin": getInfo.passwordLogin,
      "user.googleAuthFlag": login.googleAuthFlag,
    }
    // console.log("userInfo", userInfo);
    // Sentry.setTags(userInfo);
    Sentry.setContext("Custom - User Info", userInfo)

    Sentry.setUser({
      // NOTE: 帳號個人資訊
      id: login.operatorId,
      username: login.phoneNo,
    });

    const adminUserInfo = {
      // NOTE: 商戶、部門、角色、催收部門、催收組別
      "admin.merchantId": login.merchantId,
      "admin.departmentId": getInfo.departmentId,
      "admin.deptManager": getInfo.deptManager,
      "admin.roleId": getInfo.roleId,
      "admin.role": login.role,
      "admin.collectTeamId": getInfo.collectTeamId,
      "admin.collectGroupId": getInfo.collectGroupId,
    }
    // console.log("adminUserInfo", adminUserInfo);
    // NOTE: replays didn't support setContext
    Sentry.setContext("Custom - Admin Info", adminUserInfo)
    // Sentry.setTags(adminUserInfo);
  },

  // NOTICE: 使用者選擇文字後，進行鍵盤複製
  startToMonitorUserKeyboard: function () {
    const windowsKeys = ['ctrl+c', 'ctrl+v', 'ctrl+x'];
    const macKeys = ['command+c', 'command+v', 'command+x'];

    const bindUserClipboard = {
      "windows": windowsKeys.join(","),
      "mac": macKeys.join(","),
    }

    const that = this;

    const processCopyAction = function () {
      // NOTICE: 再傳送鍵盤複製的事件
      // that.addBreadcrumb({
      //   category: "User Copy",
      //   message: `keyboard`,
      // });
      Sentry.captureMessage(UserActions.copy, {
        level: "info",
        tags: {
          userAction: "copy",
        },
        contexts: {
          device: "keyboard"
        }
      })
    }
    const processPasteAction = function () {
      // NOTICE: 傳送鍵盤貼上的事件
      // that.addBreadcrumb({
      //   category: "User Pasta",
      //   message: "keyboard",
      // });
      Sentry.captureMessage(UserActions.pasta, {
        level: "info",
        tags: {
          userAction: "pasta",
        },
        contexts: {
          device: "keyboard"
        }
      })
    }
    const processCutAction = function () {
      // NOTICE: 傳送鍵盤剪下的事件
      // that.addBreadcrumb({
      //   category: "User Cut",
      //   message: "keyboard",
      // });
      Sentry.captureMessage(UserActions.cut, {
        level: "info",
        tags: {
          userAction: "cut",
        },
        contexts: {
          device: "keyboard"
        }
      })
    }

    // hotkeys("*", function (event, handler){
    //   console.log("handler", handler);
    // });

    hotkeys([bindUserClipboard.windows, bindUserClipboard.mac].join(","), function (event, handler){
      // console.log("handler.key", handler.key);
      switch (handler.key) {
        case windowsKeys[0]:
        case macKeys[0]:
        {
          processCopyAction();
          break;
        }
        case windowsKeys[1]:
        case macKeys[1]:
        {
          processPasteAction();
          break;
        }
        case windowsKeys[2]:
        case macKeys[2]:
        {
          processCutAction();
          break;
        }
        default:
          break;
      }
    });

  },
  stopToMonitorUser: function () {

  },
  userLogin: function () {
    if(!Cookies.get("loginInfo") || !Cookies.get("adminUser")) {
      return;
    }

    if(!this.isMonitoring) {
      this.isMonitoring = true;
      this.settingUserInfo();
      this.startToMonitorUserMouseSelection();
      this.startToMonitorUserKeyboard();
    } else {
      console.log("register repeat!")
    }
  },
  userLogout: function () {
    Sentry.setUser(null);
  },
  getCommonTagsInfo: function () {
    const login = JSON.parse(Cookies.get("loginInfo")).data;
    // const detectIncognitoResult = await detectIncognito();
    return {
      "user.phoneNo": login.phoneNo,
    }
  },
  addBreadcrumb: function ({category, message, data, type}) {
    Sentry.addBreadcrumb({
      type,
      level: "info",
      // event_id?: string;
      category,
      message,
      data,
      // timestamp?: number;
    });
  },
  sendBreadcrumbAndEvent: function () {

  },
  screenshot: function (eventTitle) {
    // html2canvas(document.getElementById('capture')).then(function(canvas) {
    //   const screenShotData = canvas.toDataURL("image/png", 0.5).replace("image/png", "image/octet-stream");
    //   scope.addAttachment({
    //     data: screenShotData,
    //     // attachmentType: "image/octet-stream",
    //     // contentType: "image/png",
    //     contentType: "image/octet-stream",
    //     filename: `Copy-${Application.getEnvironmentName()}-Keyboard-${login.phoneNo}-${new Date().toISOString()}.png`,
    //   })
    //   scope.addAttachment({
    //   data: selection,
    //   attachmentType: "image",
    //   contentType: "text",
    //   filename: `Copy-${Application.getEnvironmentName()}-Keyboard-${login.phoneNo}-${new Date().toISOString()}.png`,
    //   })
    // });
  },
}
window.SentryModule = SentryModule;
