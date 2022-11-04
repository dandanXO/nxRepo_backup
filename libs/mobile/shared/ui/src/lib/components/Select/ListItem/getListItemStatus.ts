// NOTE: 不同狀態的顏色
import {IListItemType} from "../IListItemType";
import {getXuJieListItemStatus} from "../layoutSkin/ListItem/getXuJieListItemStatus";

export const getListItemStatus = (state: IListItemType) => {
  // return getGeneralListItemStatus(state);
  return getXuJieListItemStatus();
};

const getGeneralListItemStatus = (state: IListItemType) => {
  if (state === "normal") {
    return `
            background-color: transparent;
        `;
  } else if (state === "hover") {
    return `
            background-color: rgba(0, 0, 0, 0.24);
            color: #52c8f9;
        `;
  } else if (state === "select") {
    return `
            color: #52c8f9;
        `;
  } else {
    return ``
  }
};

