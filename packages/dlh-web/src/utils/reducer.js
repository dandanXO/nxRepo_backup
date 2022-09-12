export const stateTypes = {
    pagination: 'pagination',
    tableData: 'tableData',
    visible: 'visible',
    disabled: 'disabled',
    isAble: 'isAble'

}

export function createPageInitState (base, type, isModel = false) {
    switch (type) {
        case stateTypes.pagination:
            const isVisible = isModel ? { [`${base}Visible`]: false } : {};
            return {
                [`${base}Data`]: {
                    data: [],
                    pagination: {},
                },
                [`${base}Loading`]: false,
                ...isVisible

            }
        case stateTypes.tableData:
            return {
                [`${base}Data`]: [],
                [`${base}Loading`]: false,
                ...isVisible
            };
        case stateTypes.visible:
            return {
                [`${base}Visible`]: false
            };
        case stateTypes.disabled:
            return {
                [`${base}Disabled`]: false
            };
        case stateTypes.isAble:
            return {
                [`is${base}`]: false
            };
        default:
            return {
                [`${base}`]: ''
            };
    }

}