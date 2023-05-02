import React from "react";
import {StylesConfig} from "react-select";

export const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    padding:'0px 10px',
    border: 0,
    borderRadius: 0,
    borderBottom: "1px solid #aaaaaa",
    span: {
      width: 0
    }
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      border: 0
    }
  }
}
