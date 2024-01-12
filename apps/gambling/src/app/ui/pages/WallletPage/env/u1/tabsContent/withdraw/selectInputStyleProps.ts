export const selectInputStyleProps = (isMobile: boolean) => {
  return {
    control: (baseStyle: any, states: any) => {
      return {
        ...baseStyle,
        background: 'var(--background-textfields)',
        borderColor: 'var(--primary-assistant)',
        color: 'white',
        padding: isMobile ? '2px' : '8px',
        borderRadius: '10px',
        outline: 'none',
        boxShadow: 'none',
        backgroundClip: isMobile
          ? 'padding-box,border-box'
          : '',
        backgroundOrigin: isMobile
          ? 'padding-box,border-box'
          : '',
        '&:hover': {
          // borderColor: 'none',
        },
        '&:focus': {
          ...baseStyle,
          borderColor: 'var(--primary-assistant)',
          border: 'solid 1px',
        },
      };
    },
    valueContainer: (style: any, state: any) => ({
      ...style,
      color: 'white',
    }),
    //@ts-ignore
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',
    }),
    //@ts-ignore
    option: (
      styles: any,
      { data, isDisabled, isFocused, isSelected }: any
    ) => {
      return {
        ...styles,
        borderColor: 'var(--input-border)',
        background: isFocused
          ? 'linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%)'
          : 'var(--background-textfields)',
        color: 'var(--input-text-color)',
        marginTop: '-5px',
        marginBottom: '-5px',
      };
    },
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: 'var(--main-primary-main)',
    }),
  }
}