export const maxOneUnitFloatReplacer = (value: string): string => {
    return value.replace(/^(\d+)\.(\d).*$/, '$1.$2');
};
