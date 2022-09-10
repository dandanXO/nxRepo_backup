import React from 'react';
import { CommonRegularSVGICON } from '../../SVGIcon';
import {
  RadioCheckSVGICON,
  RadioDisabledTrueSVGICON,
  RadioDisableFalseSVGICON,
} from './RadioICON';
import { useTheme } from 'styled-components';

//NOTICE:
// const primaryColor = "#f58b10";

interface RadioICONProps {
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  hover: boolean;
  size: 'small' | 'big';
  // theme: {
  //     mode: "early" | "night";
  // };
}

const RadioICON: React.FC<RadioICONProps> = ({
  checked,
  defaultChecked,
  hover,
  size,
  disabled,
}) => {
  const theme = useTheme();
  const primaryColor = (theme as any).custom.radio.primary;
  const secondary = (theme as any).custom.radio.secondary;
  // NOTICE:
  // theme.mode = "early";
  // const lightTheme = theme.mode === "early";
  const lightTheme = 'early';
  const finalSize = size === 'small' ? 19 : 28;
  const finalDisabled = !disabled ? 'pointer' : 'not-allowed';
  // 沒有點擊
  if (!checked && !defaultChecked) {
    // 沒有點擊/沒有禁用
    if (!disabled) {
      if (!hover) {
        // NOTE: 沒有點擊/沒有禁用/Normal
        return (
          <CommonRegularSVGICON
            fill={secondary}
            size={finalSize}
            style={{
              cursor: finalDisabled,
            }}
          />
        );
      } else {
        // NOTE: 沒有點擊/沒有禁用/Hover
        return (
          <CommonRegularSVGICON
            fill={primaryColor}
            size={finalSize}
            style={{
              cursor: finalDisabled,
            }}
          />
        );
      }
    } else {
      // NOTE: 沒有點擊/有禁用
      return (
        <RadioDisableFalseSVGICON
          fill={lightTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(254, 253, 253, 0.8)'}
          size={finalSize}
          style={{
            cursor: finalDisabled,
          }}
        />
      );
    }
  } else {
    // NOTE: 有點擊/禁用
    if (disabled) {
      return (
        <RadioDisabledTrueSVGICON
          radioFill={lightTheme ? '#c1c6cd' : 'rgba(253, 252, 254, 0.1)'}
          fill={lightTheme ? 'rgba(0, 0, 0, 0.7)' : 'rgba(254, 253, 253, 0.8)'}
          size={finalSize}
          style={{
            cursor: finalDisabled,
          }}
        />
      );
    } else {
      // NOTE: 有點擊/沒有禁用
      return (
        <RadioCheckSVGICON
          fill={primaryColor}
          radioFill={primaryColor}
          size={finalSize}
          style={{
            cursor: finalDisabled,
          }}
        />
      );
    }
  }
};
// const WithThemeRadioICON = withTheme();
// export default WithThemeRadioICON;
export default RadioICON;
