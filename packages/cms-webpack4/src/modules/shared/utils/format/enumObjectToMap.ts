export const enumObjectToMap = (object) => {
    let enumMapList = new Map().set('', { text: '不限' });
    Object.entries(object).map(i => {
        return enumMapList.set(i[0], i[1]);
    })
    return enumMapList;
}