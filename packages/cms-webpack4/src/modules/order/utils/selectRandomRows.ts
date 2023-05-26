export const selectRandomRows = (list: any[], randomValue: string | number, rowKey: string): any[] => {

    if (list === undefined) return;
    const listLength = list?.length;
    const selectLength = Number(listLength * Number(randomValue) / 100).toFixed();
    if (Number(selectLength) === 0) return;
    const selectArray = [];
    const rowKeyList = list.map(i => i[rowKey]);

    for (let i = 0; i < Number(selectLength); i++) {
        const randomSelect = Math.random() * rowKeyList.length | 0;
        if (selectArray.includes(rowKeyList[randomSelect])) {
            i--;
        } else {
            selectArray.push(rowKeyList[randomSelect]);
        }
    }

    return selectArray;
};
