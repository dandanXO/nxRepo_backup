import React from "react";
import {CommonRegularSVGICON} from "../../SVGIcon";
import {CheckboxCheckSVGICON, CheckboxDisableFalseSVGICON, CheckboxDisableTureSVGICON} from "./CheckboxICON";
import {withTheme} from "styled-components";

interface CheckboxSVGICONProps {
    size?: string;
    check?: boolean;
    hover: boolean;
    disabled?: boolean;
    // REFACTORING:
    theme?: {
        mode: "early" | "night";
    };
}

const CheckboxSVGICON: React.FC<CheckboxSVGICONProps> = props => {
    const {size, check, hover, disabled} = props;
    const finalSize = size !== "big" ? 19 : 28;
    const finalDisabled = disabled ? "pointer" : "not-allowed";

    const lightTheme = props.theme && props.theme.mode === "early" || true;

    // 沒有點擊
    if (!check) {
        // 沒有點擊/沒有禁用
        if (!disabled) {
            if (!hover) {
                // 沒有點擊/沒有禁用Normal
                return (
                    <CommonRegularSVGICON
                        fill="#a8a8a8"
                        size={finalSize}
                        style={{
                            cursor: finalDisabled,
                        }}
                    />
                );
            } else {
                // 沒有點擊/沒有禁用Hover
                return (
                    <CommonRegularSVGICON
                        fill="#52c8f9"
                        size={finalSize}
                        style={{
                            cursor: finalDisabled,
                        }}
                    />
                );
            }
        } else {
            // 沒有點擊/有禁用
            return (
                <CheckboxDisableFalseSVGICON
                    fill={lightTheme ? "#5e5e5e" : "#ffffff"}
                    size={finalSize}
                    style={{
                        cursor: finalDisabled,
                    }}
                    fillOpacity={lightTheme ? "0.1" : "0.1"}
                />
            );
        }
    } else {
        // 有點擊/禁用
        if (disabled) {
            return (
                <CheckboxDisableTureSVGICON
                    checkFill={lightTheme ? "#a9b1b7" : "rgba(253, 252, 254, 0.1)"}
                    fill={lightTheme ? "rgba(0, 0, 0, 0.7)" : "rgba(254, 253, 253, 0.8)"}
                    size={finalSize}
                    style={{
                        cursor: finalDisabled,
                    }}
                />
            );
        } else {
            // 有點擊/沒有禁用
            return (
                <CheckboxCheckSVGICON
                    fill="#36a9fb"
                    size={finalSize}
                    style={{
                        cursor: finalDisabled,
                    }}
                />
            );
        }
    }
};

const WithThemeCheckboxSVGICON = withTheme(CheckboxSVGICON);
export default WithThemeCheckboxSVGICON;
