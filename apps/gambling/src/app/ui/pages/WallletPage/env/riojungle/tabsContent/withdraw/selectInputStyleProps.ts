
import useBreakpoint from "apps/gambling/src/app/ui/hooks/useBreakpoint";

export const SelectInputStyleProps = () => {
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  return {
    control: (baseStyle: any, states: any) => {
      return {
        ...baseStyle,
        background: '#333',
        color: '#fff',
        padding: isTablet ? '8px 10px' : '10px',
        borderRadius: '8px',
        outline: 'none',
        boxShadow: 'none',
        border: 'solid 1px #808080',
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
          border: 'solid 2px #8547EB',

        },
      };
    },
    valueContainer: (style: any, state: any) => ({
      ...style,
      color: 'white',
      padding: 0,
      margin: 0
    }),
    //@ts-ignore
    indicatorSeparator: (provided) => ({
      ...provided,
      display: 'none',

    }),
    dropdownIndicator: (base: any) => ({
      ...base,
      paddingTop: '0px',
      paddingBottom: '0px'
    }),
    //@ts-ignore
    option: (
      styles: any,
      { data, isDisabled, isFocused, isSelected }: any
    ) => {
      return {
        ...styles,
        borderColor: '#808080',
        color: isFocused || isSelected ? '#fff' : '#B3B3B3',
        marginTop: '-5px',
        marginBottom: '-5px',
        ':active': {
          ...styles[':active'],
          backgroundColor: isSelected ? 'red' : 'blue',
          borderColor: 'var(--input-border)',
        },
        background:
          isFocused // 聚焦时的颜色
            ? '#4D4D4D' :
            isSelected
              ? '#808080' // 被选中的颜色
              : '#333', // 默认颜色
      };
    },
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: '#fff',
    }),
  }
}