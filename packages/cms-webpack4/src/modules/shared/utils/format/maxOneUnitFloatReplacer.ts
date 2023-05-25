export const maxOneUnitFloatReplacer = (value) => {
    return value.replace(/^(\d+)\.(\d).*$/,'$1.$2');
};
