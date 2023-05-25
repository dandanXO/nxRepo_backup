import { ProSchemaValueEnumMap } from "@ant-design/pro-components";

export const enumObjectToMap = (object: unknown): ProSchemaValueEnumMap => {
    const enumMapList = new Map().set('', { text: '不限' });
    Object.entries(object).map(i => {
        return enumMapList.set(i[0], i[1]);
    });
    return enumMapList;
};
