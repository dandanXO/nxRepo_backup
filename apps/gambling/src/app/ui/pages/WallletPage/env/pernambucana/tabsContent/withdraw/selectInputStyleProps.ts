export const selectInputStyleProps = (isMobile: boolean) => {

  return {
    control: (baseStyle:any, states:any) => {
      return {
        ...baseStyle,
        background: 'var(--input-background)',
        // borderColor: (states.menuIsOpen || states.isFocused) ? 'var(--varient)' : 'var(--main-primary-main)',
        borderColor: 'var(--input-border)',
        color: 'var(--input-text-color)',
        padding: '6px',
        borderRadius: '8px',
        outline: 'none',
        boxShadow: "none",
        backgroundClip: isMobile ? 'padding-box,border-box' : '',
        backgroundOrigin: isMobile ? 'padding-box,border-box' : '',
        // backgroundImage: isMobile ?'linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C)':'',
        '&:hover': {
          // borderColor: 'none',
        },
        '&:focus': {
          ...baseStyle,
          borderColor: 'var(--input-focus-border)',
          border: 'solid 1px'
          // backgroundImage: isMobile ?'linear-gradient(180deg,#133f23,#090B0F),linear-gradient(90deg,#FFF600,#4FFB0C':'',
        }
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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        borderColor: 'var(--input-border)',
        background: isFocused ? 'var(--input-focus-background)' : 'var(--input-background)',
        color: 'var(--input-text-color)',
        marginTop: '-5px',
        marginBottom: '-5px',
        ':active': {
          ...styles[':active'],
          backgroundColor: isSelected ? 'var(--input-focus-background)' : 'var(--input-background)',
          borderColor: 'var(--input-border)',
        },
      };
    },
    singleValue: (provided:any, state:any) => ({
      ...provided,
      color: 'var(--main-primary-main)',
    })
  }
}