export enum AndroidPage {
  LOGIN = "LOGIN",
  AUTH = "AUTH"
}

interface Window {
  // NOTICE: 與 APP 的交互
  SyncTask: {
    doQuickLoanApply: () => void;
    thematicActivitiesPopup:  (url: string) => void;
    doExecuteSyncContactsTask:  () => void;
    recommendBannerIsNotEmpty:  () => void;
  }
  theme?:any;
  IndexTask: {
    uploadKycBackgroundData: (uploaded: boolean) => void;
    navToPage:  (androidPage: AndroidPage) => void;
  },
  // CallbackTask: {
  //   onUploadKycBackgroundData: (uploaded: boolean) => void;
  // }
  onUploadKycBackgroundData: (uploaded: boolean) => void;
}

