interface Window {
  // NOTICE: 與 APP 的交互
  SyncTask: {
    doQuickLoanApply: () => void;
    ThematicActivitiesPopup:  (url: string) => void;
    doExecuteSyncContactsTask:  () => void;
    recommendBannerIsNotEmpty:  () => void;
  }
  theme?:any;
}

