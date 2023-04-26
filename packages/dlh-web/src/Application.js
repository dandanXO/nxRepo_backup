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
  init: function () {
    if(Application.isLocalhost()) {
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
        // this.startToMonitorClipboard();
        this.startToMonitorContextmenu();
      }
      // NOTICE: Tag: can search these
      // Tag values have a maximum length of 200 characters and they cannot contain the newline (\n) character.
      // NOTICE: Context: cannot search these



    }

  },
  userLogin: function () {
    if(!Cookies.get("loginInfo") || !Cookies.get("adminUser")) {
      return;
    }

    this.startToMonitorUser();

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
  userLogout: function () {
    Sentry.setUser(null);
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
  getCommonTagsInfo: async function () {
    const login = JSON.parse(Cookies.get("loginInfo")).data;
    // const detectIncognitoResult = await detectIncognito();
    return {
      "user.phoneNo": login.phoneNo,
    }
  },
  // NOTICE: 傳送訊息
  sendMessage: async function (eventTitle, selectionContent) {
    const that = this;
    const copyContent = selectionContent.replace(/\n/g, " ");

    const detectIncognitoResult = await detectIncognito();
    // console.log("detectIncognitoResult.browserName", detectIncognitoResult.browserName);
    // console.log("detectIncognitoResult.isPrivate", detectIncognitoResult.isPrivate);

    Sentry.configureScope((scope) => {

      const login = JSON.parse(Cookies.get("loginInfo")).data;
      const getInfo = JSON.parse(Cookies.get("adminUser")).data;

      // NOTE: copy content
      if(selectionContent.length > 200) {

        // NOTE: attachment
        // const copyStringFilePath = `Copy-${Application.getEnvironmentName()}-Keyboard-${login.phoneNo}-${new Date().toISOString()}.txt`;
        const copyStringFilePath = `Copy-Keyboard-${Application.getEnvironmentName()}-${login.phoneNo}-${new Date().toISOString()}.txt`;

        scope.addAttachment({
          data: copyContent,
          // attachmentType: "image/octet-stream",
          // contentType: "image/png",
          // contentType: "",
          filename: copyStringFilePath,
        })

        // NOTE: message
        Sentry.captureMessage(eventTitle, {
          tags: {
            action: "keyboard-copy",
            ...that.getCommonTagsInfo(),
            privateMode: detectIncognitoResult.isPrivate,
            copyContent: copyStringFilePath,
          },
          level: "info",
        })
      } else {
        // NOTE: message
        Sentry.captureMessage(eventTitle, {
          tags: {
            action: "keyboard-copy",
            ...that.getCommonTagsInfo(),
            privateMode: detectIncognitoResult.isPrivate,
            copyContent: copyContent,
          },
          level: "info",
        })
      }
      scope.clearAttachments();
    })
  },

  // NOTICE: 取得選擇的文字，並傳送
  collectCopy: async function (eventTitle) {
    // NOTICE: screenshot
    this.screenshot();

    // NOTICE: selection
    const selectionContent = window.getSelection().toString();
    // console.log("eventTitle", eventTitle);
    // console.log("selectionContent", selectionContent);

    await this.sendMessage(eventTitle, selectionContent);
  },

  // NOTICE: 使用者選擇文字後，進行鍵盤複製
  startToMonitorUser: function () {
    const windowsKeys = ['ctrl+c', 'ctrl+v', 'ctrl+x'];
    const macKeys = ['command+c', 'command+v', 'command+x'];

    const bindUserClipboard = {
      "windows": windowsKeys.join(","),
      "mac": macKeys.join(","),
    }

    // const userActions = {
    //   "copy": `Copy-Keyboard-${Application.getEnvironmentName()}`,
    //   "pasta": `Pasta-Keyboard-${Application.getEnvironmentName()}`,
    //   "cut": `Cut-Keyboard-${Application.getEnvironmentName()}`,
    // }
    const userActions = {
      "copy": `Copy-Keyboard`,
      "pasta": `Pasta-Keyboard`,
      "cut": `Cut-Keyboard`,
    }

    if(!this.isMonitoring) {
      this.isMonitoring = true;

      // hotkeys("*", function (event, handler){
      //   console.log("handler", handler);
      // });

      const that = this;

      hotkeys(bindUserClipboard.windows, function (event, handler){
        // console.log("handler.key", handler.key);
        switch (handler.key) {
          case windowsKeys[0]:
          {
            // NOTICE: 先傳送選擇到的文字的事件
            that.collectCopy(userActions.copy).then(() => {

              // NOTICE: 再傳送鍵盤複製的事件
              Sentry.captureMessage(userActions.copy, {
                tags: {
                  action: "keyboard-copy",
                },
                level: "info",
              })

            });

            break;
          }
          case windowsKeys[1]:
          {
            // NOTICE: 傳送鍵盤貼上的事件
            Sentry.captureMessage(userActions.pasta, {
              tags: {
                action: "keyboard-pasta",
              },
              level: "info",
            })
            break;
          }
          case windowsKeys[2]:
          {
            // NOTICE: 傳送鍵盤剪下的事件
            Sentry.captureMessage(userActions.cut, {
              tags: {
                action: "keyboard-cut",
              },
              level: "info",
            })
            break;
          }
          default:
            break;
        }
      });
      hotkeys(bindUserClipboard.mac, function (event, handler){
        switch (handler.key) {
          case macKeys[0]:
            that.collectCopy(userActions.copy).then(() => {});
            break;
          case macKeys[1]:
            Sentry.captureMessage(userActions.pasta, {
              tags: {
                action: "keyboard-pasta",
              },
              level: "info",
            })
            break;
          case macKeys[2]:
            Sentry.captureMessage(userActions.cut, {
              tags: {
                action: "keyboard-pasta",
              },
              level: "info",
            })
            break;
          default:
            break;
        }
      });
    } else {
      // console.log("register repeat!")
    }

  },
  stopToMonitorUser: function () {

  },

  // NOTICE: 使用者選擇文字後，並不知道之後是否有利用右鍵進行複製
  startToMonitorContextmenu: function () {
    const that = this;

    function callback() {
      const selectionContent = document.getSelection().toString();
      // const eventTitle = `SelectThenMouseup-${Application.getEnvironmentName()}`;
      const eventTitle = `SelectThenMouseup`;
      that.sendMessage(eventTitle, selectionContent).then(() => {

      })
    }

    let isSelecting = false;
    let selection = null;

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


  // startToMonitorClipboard: function () {
  //   // const userActions = {
  //   //   "copy": `Copy-${Application.getEnvironmentName()}-Clipboard`,
  //   //   "pasta": `Pasta-${Application.getEnvironmentName()}-Clipboard`,
  //   //   "cut": `Cut-${Application.getEnvironmentName()}-Clipboard`,
  //   // }
  //
  //   // document.addEventListener('copy', (e) => {
  //   //   console.log("e.clipboardData.getData", e.clipboardData.getData("text"))
  //   //   console.log("copy.e", e);
  //   //   console.log("copy.target", e.target);
  //   //   console.log("copy.target.innerText", e.target.innerText);
  //   //   console.log("copy.target.innerHTML", e.target.innerHTML);
  //   //   if(e && e.target && e.target.innerText) {
  //   //     const data = {
  //   //       tags: {
  //   //         action: "clipboard-copy",
  //   //         // NOTICE: Tag values have a maximum length of 200 characters and they cannot contain the newline (\n) character.
  //   //         // copyContent: String(e.target),
  //   //         copyContent: e.target.innerText,
  //   //       },
  //   //       level: "warning",
  //   //     }
  //   //     console.log("data", data);
  //   //     Sentry.captureMessage(userActions.copy, data);
  //   //   }
  //   //
  //   // })
  //
  //   // document.addEventListener('paste', (e) => {
  //     // console.log("paste.e", e);
  //     // console.log("paste.target", e.target);
  //     // console.log("paste.target.innerText", e.target.innerText);
  //     // console.log("paste.target.innerHTML", e.target.innerHTML);
  //     // if(e && e.target && e.target.innerText) {
  //     //   Sentry.captureMessage(userActions.pasta, {
  //     //     tags: {
  //     //       action: "clipboard-pasta",
  //     //       // NOTICE: Tag values have a maximum length of 200 characters and they cannot contain the newline (\n) character.
  //     //       // pastaContent: JSON.stringify(e.target.innerText),
  //     //       // pastaContent: String(e.target),
  //     //       pastaContent: e.target.innerText,
  //     //     },
  //     //     level: "info",
  //     //   });
  //     // }
  //   // })
  // },
  // stopToMonitorClipboard: function () {
  //   // document.removeEventListener('copy');
  //   // document.removeEventListener('paste');
  // },
}
window.SentryModule = SentryModule;
