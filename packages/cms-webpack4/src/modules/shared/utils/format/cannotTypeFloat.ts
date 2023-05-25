export const cannotTypeFloat = (value: string) => {
    return value.replace(/^(\d+)\.(\d)*$/,'$1');
};
