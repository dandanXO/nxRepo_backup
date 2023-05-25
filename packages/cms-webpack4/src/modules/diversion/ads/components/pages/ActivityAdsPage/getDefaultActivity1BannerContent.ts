export const getDefaultActivity1BannerContent = (index: number) => ({
    action: "APPLY_LOAN",
    actionUrl: "",
    payload: {
        // isBrand: false,
        title: "優惠名稱" + index,
        description1: "- 3.5%",
        description2: "原利息35%",
        actionName: "點我借款 >",
    },
});
