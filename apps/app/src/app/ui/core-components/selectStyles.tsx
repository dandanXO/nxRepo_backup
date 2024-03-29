import { StylesConfig } from 'react-select';

export const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    padding: '0px 10px',
    border: 0,
    borderRadius: 0,
    borderBottom: `1px solid ${window.theme?.input?.outline ?? '#aaaaaa'}`,
    span: {
      width: 0,
    },
    textAlign: 'left',
  }),
  //@ts-ignore
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      border: 0,
      color: isSelected ? '#fff' : '#000',
      backgroundColor: isSelected ? styles.backgroundColor : null,
    };
  },
  dropdownIndicator: (styles) => ({
    ...styles,
    width: '60px',
    justifyContent: 'end',
  }),
};
