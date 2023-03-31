const onClickToDoLoan = () => {
    console.log("window.SyncTask.doQuickLoanApply()");
    // window.SyncTask.doQuickLoanApply();
    // @ts-ignore
    window["SyncTask"] &&
    // @ts-ignore
    window["SyncTask"]["doQuickLoanApply"] &&
    // @ts-ignore
    window["SyncTask"]["doQuickLoanApply"]();
}
const onClickToPopup = (url: string) => {
    console.log("onClickToPopup.url:", url);
    // window.SyncTask.thematicActivitiesPopup("https://www.google.com/");
    // @ts-ignore
    window["SyncTask"] &&
    // @ts-ignore
    window["SyncTask"]["thematicActivitiesPopup"] &&
    // @ts-ignore
    window["SyncTask"]["thematicActivitiesPopup"](url);
}
export  const onClickToAction = (event: {action: "POP_URL" | "APPLY_LOAN" | undefined; actionUrl: string | undefined;}) => {
    if(event.action === "POP_URL") {
        onClickToPopup(event.actionUrl || "");
    } else if(event.action === "APPLY_LOAN") {
        onClickToDoLoan();
    }
}
