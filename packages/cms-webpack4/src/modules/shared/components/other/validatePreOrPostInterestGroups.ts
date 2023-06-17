
function equalRangeBelow100(str: string, min: number = 0, max: number = 100) {
    return Number(str) < min || Number(str) > max
}
export const validateValue = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : equalRangeBelow100(value) ? "请输入0-100间数字" : '';
}

export const validateNum = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : Number(value) < 1 ? "请输入大于1的整数" : '';
}
export const validateplusAmount = (value, errorText) => {
    return value !== 0 && !value ? errorText
        : isNaN(value) ? "请输入數字"
            : Number(value) < 0 ? "请输入大于等于0的数值" : '';
}

const genErrors = (field) => {
    const numError = validateNum(field?.num, "请输入起始期数");
    const preInterestError = validateValue(field?.preInterest, "请输入前置利息");
    const postInterestError = validateValue(field?.postInterest, "请输入後置利息");
    const plusAmountError = validateplusAmount(field?.plusAmount, "请输入提額金额");

    const isOver100 = Number(field?.preInterest) + Number(field?.postInterest) > 100;

    return {
        errors: {
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
                validateStatus: plusAmountError ? 'error' : '',
                help: plusAmountError,
                value: field?.plusAmount,
            },
        },
        hasError: (numError || preInterestError || postInterestError || plusAmountError) !== '' || isOver100
    }
}

const convertErrorsArrayToMap = (errors) => {
    const resultMap = {}
    Object.keys(errors).map((key, index) => {
        resultMap[key] = {
            ...resultMap[key],
            ...errors[key]
        };
    })
    return resultMap
}

export const validatePreOrPostInterestGroups = (groups, isMultiGroup = false, multiGroupName = '') => {
    let hasError = false
    const validateErrors = isMultiGroup
        ? groups?.map((part) => part[multiGroupName]?.map((field) => {
            const result = genErrors(field)
            hasError = result.hasError || hasError
            return result.errors
        }))
        : groups?.map((field, index) => {
            const result = genErrors(field)
            hasError = result.hasError || hasError
            return result.errors
        });
    let validateMap = {}
    if (validateErrors) {
        validateMap = isMultiGroup ? convertErrorsArrayToMap(validateErrors.map((part) => convertErrorsArrayToMap(part))) : convertErrorsArrayToMap(validateErrors)
    }

    return { validateMap, hasError }

}
