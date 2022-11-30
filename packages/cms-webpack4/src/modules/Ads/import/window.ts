interface Window {
  // NOTICE: 與 APP 的交互
  SyncTask: {
    doQuickLoanApply: () => void;
      thematicActivitiesPopup:  (url: string) => void;
    doExecuteSyncContactsTask:  () => void;
    recommendBannerIsNotEmpty:  () => void;
  }
  theme?:any;
}

