import {IListItemType} from "../IListItemType";

export const getDropdownButtonColor = (state: IListItemType, disabled: boolean, theme = "early") => {
  // return getGeneralDropdownButtonColor(state, disabled, theme);
  return getXuJieDropdownButtonColor(state, disabled, theme)
};

const getGeneralDropdownButtonColor = (state: IListItemType, disabled: boolean, theme = "early") => {
  if (disabled)
    return `
          border-color: ${theme === "early" ? "rgba(0, 0, 0, 0.13)" : "rgba(255, 255, 255, 0.13)"};
          color: ${theme === "early" ? "#a3a3a3" : "none"};
      `;
  if (state !== "hover" && state !== "open") {
    // common
    return `
          color: #5e5e5e;
          background: rgba(255, 255, 255, 0.2);
          border-color: #a8a8a8;
      `;
  } else if (state === "hover") {
    return `
          //color
          color: #52c8f9;
          background-color: rgba(255,255,255,0);
          border-color: #52c8f9;
          // box-shadow: 1px 1px 4px #52c8f9, -1px -1px 4px #52c8f9;
      `;
  } else if (state === "open") {
    return `
          border-color: #35bff8;
          background-color: #36a9fb;
          color: #ffffff;
      `;
  } else {
    return `

      `;
  }
};

const getXuJieDropdownButtonColor = (state: IListItemType, disabled: boolean, theme = "early") => {
  return `
        color: #aaaaaa;
        background: rgba(255, 255, 255, 0.2);
        border-color: #aaaaaa;
    `
};
