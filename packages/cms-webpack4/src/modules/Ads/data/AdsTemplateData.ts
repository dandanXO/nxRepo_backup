export const AdsTemplateData = [
    {id: 1, name: "样板1"},
    {id: 2, name: "样板2"},
    {id: 3, name: "样板3"},
]

export const getDefaultActivityBannerContent = (index: number) => ({
    action: "APPLY_LOAN",
    actionUrl: "",
    payload: {
        isBrand: false,
        title: "優惠名稱" + index,
        description1: "- 3.5%",
        description2: "原利息35%",
        actionName: "點我借款 >",
    },
})
