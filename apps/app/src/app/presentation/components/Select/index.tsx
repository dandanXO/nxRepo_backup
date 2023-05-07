import Select, { StylesConfig } from 'react-select';

const selectStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    padding: '0px 10px',
    border: 0,
    borderRadius: 0,
    borderBottom: '1px solid #aaaaaa',
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
};

const CustomSelect = (props: any) => {
  const selectStylesTypes = {
    standard: selectStyles,
    outlined: '',
    '': '',
  }[props?.type as string];

  return <Select styles={props?.type ? selectStylesTypes : ''} {...props} />;
};

export default CustomSelect;
