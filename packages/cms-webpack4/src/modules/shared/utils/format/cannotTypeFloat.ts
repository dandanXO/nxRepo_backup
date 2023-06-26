export const cannotTypeFloat = (value: string): string => {
    return value.replace(/^(\d+)\.(\d)*$/, '$1');
};
