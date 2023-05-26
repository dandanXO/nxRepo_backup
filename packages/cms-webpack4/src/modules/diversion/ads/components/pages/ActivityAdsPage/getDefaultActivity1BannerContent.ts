export const getDefaultActivity1BannerContent = (
    index: number,
): {
    action: string;
    actionUrl: string;
    payload: {
        title: string;
        description1: string;
        description2: string;
        actionName: string;
    };
} => ({
    action: 'APPLY_LOAN',
    actionUrl: '',
    payload: {
        // isBrand: false,
        title: '優惠名稱' + index,
        description1: '- 3.5%',
        description2: '原利息35%',
        actionName: '點我借款 >',
    },
});
