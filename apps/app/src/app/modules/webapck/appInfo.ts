interface IAppInfo {
  VERSION: string;
  COMMITHASH: string;
  BRANCH: string;
  UI_VERSION: string;
}

declare let AppInfo: IAppInfo;
