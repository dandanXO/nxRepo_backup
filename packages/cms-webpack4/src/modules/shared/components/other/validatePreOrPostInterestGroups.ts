
function equalRangeBelow100(str: string, min = 0, max = 100) {
    return Number(str) < min || Number(str) > max;
}
export const validateValue = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : equalRangeBelow100(value) ? "请输入0-100间数字" : '';
};

export const validateNum = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : Number(value) < 1 ? "请输入大于1的整数" : '';
};
export const validateplusAmount = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : Number(value) < 0 ? "请输入大于0的整数" : '';
};
export const validatePreOrPostInterestGroups = (groups) => {
    const validateErrors = groups?.map((field, index) => {
    
        const numError = validateNum(field?.num, "请输入起始期数");
        const preInterestError = validateValue(field?.preInterest, "请输入前置利息");
        const postInterestError = validateValue(field?.postInterest, "请输入後置利息");
        const plusAmounteError = validateplusAmount(field?.plusAmount, "请输入提額金额");

        const isOver100 = Number(field?.preInterest) + Number(field?.postInterest) > 100;

        return {
            num: {
                validateStatus: numError ? 'error' : '',
                help: numError,
                value: field?.num,
            },
            preInterest: {
                validateStatus: isOver100 || preInterestError ? 'error' : '',
                help: isOver100 ? "前置利息＋后置利息不得超过100%" : preInterestError,
                value: field?.preInterest,
            },
            postInterest: {
                validateStatus: isOver100 || postInterestError ? 'error' : '',
                help: isOver100 ? "前置利息＋后置利息不得超过100%" : postInterestError,
                value: field?.postInterest,
            },
            plusAmount: {
                validateStatus: plusAmounteError ? 'error' : '',
                help: plusAmounteError,
                value: field?.plusAmount,
            },
        };
    });

    const finalMap = {};
    if (validateErrors) {
        Object.keys(validateErrors).map((key, index) => {
            finalMap[key] = {
                ...finalMap[key],
                ...validateErrors[key]
            };
        });
    }
    return finalMap;

};