import styled from "styled-components";
import {InputStatus, InputValidStatus} from "../type";

const getStatusColor = (
    validStatus: InputValidStatus,
    keyStatus: InputStatus,
    prevValidStatus: InputValidStatus,
    runValid: boolean,
    skinType: string,
    // isInsidePopup?: boolean
    isThemeControlledByComponent?: boolean,
    themeType?: "early" | "night"
) => {
    if (!runValid) {
        // 沒有驗證
        if (keyStatus === "Idle") {
            return `
                // border-color: ${skinType === "early" ? "#c3c3c3" : "#8d8f99"};
            `;
        } else if (keyStatus === "Hover") {
            return `                                
                // border-color: #52c8f9;
            `;
        } else if (keyStatus === "Focus") {
            return `                                
                // border-color: #52c8f9;                
            `;
        } else if (keyStatus === "KeyDown") {
            return `                                
                // border-color: #52c8f9;                
            `;
        }
    } else {
        // console.log("validStatus", validStatus);
        // console.log("keyStatus", keyStatus);
        const getColor = (theme: string) => {
            return theme === "early" ? "#c3c3c3" : "#8d8f99";
        };
        const fontColor = getColor(skinType);
        if (validStatus === "ReadyForValid") {
            // 準備要驗證
            if (keyStatus === "Focus") {
                return `                    
                    // border-color: #52c8f9;
                `;
            } else if (keyStatus === "Hover") {
                return `                                                                                    
                    // border-color: #52c8f9;
                `;
            } else if (keyStatus === "Idle") {
                return `
                    // border-color: ${fontColor};
                `;
            }
        } else if (validStatus) {
            const getValidColor = (theme: string, isThemeControlledByComponent?: boolean, themeType?: string) => {
                return isThemeControlledByComponent
                    ? themeType === "early"
                        ? "#439a02"
                        : "#75cd2d"
                    : theme === "early"
                    ? "#439a02"
                    : "#75cd2d";
            };
            const validColor = getValidColor(skinType, isThemeControlledByComponent, themeType);
            // 驗證成功
            if (keyStatus === "Idle") {
                return `                  
                    // color: ${validColor};
                    // border-color: ${validColor}
                `;
            } else if (keyStatus === "Hover" || keyStatus === "Focus" || keyStatus === "KeyDown") {
                return `                  
                    // color: ${validColor};
                    // border-color: ${validColor}
                `;
            }
        } else if (!validStatus) {
            // 驗證失敗
            return `
                // color: #ff5243;
                // background-color: rgba(255, 82, 67, 0.17);
                border-color: #FC465E;
                // :hover, :focus {
                //     border-color: #ff5243;
                }
            `;
        }
    }
};

export interface StyledInputProps {
    validStatus: InputValidStatus;
    prevValidStatus: InputValidStatus;
    keyStatus: InputStatus;
    runValid: boolean;
    isThemeControlledByComponent?: boolean;
    themeType?: "early" | "night";
}

export const StyledTopInput = styled.input<StyledInputProps>`
    /* self */
    box-sizing: border-box;

    //display: block;
    margin: 0;

    //border-width: 1px;
    //border-style: solid;
    border-radius: 9px;

    background: ${props =>
        props.isThemeControlledByComponent
            ? props.themeType === "early"
                ? "rgba(255, 255, 255, 0.5)"
                : "rgba(255, 255, 255, 0.25)"
            : props.theme.mode === "early"
            ? "rgba(255, 255, 255, 0.5)"
            : "rgba(255, 255, 255, 0.25)"};

    //padding: 2px 14px;
    // Append icon
    //padding: ${props => (!props.runValid ? "2px 14px 2px 14px" : "2px 34px 2px 14px")};

    //padding: 40px 20px 20px 20px;
  
    //min-height: 28px;
    //height: 49px;
    //width: 100%;
  
    //font-size: 15px;
    //line-height: 28px;
    cursor: text;
    
    // NOTICE:
    border: 1px solid #aaaaaa;
    background: #ffffff;
    font-weight: 600;
    font-size: 16px;
    color: #101010;
  
  // normal
    /*
    color: ${props =>
        props.isThemeControlledByComponent
            ? props.themeType === "early"
                ? "#5e5e5e"
                : "#e2e2e2"
            : props.theme.mode === "early"
            ? "#5e5e5e"
            : "#e2e2e2"};
    */
  
  &[type="search"] {
        box-sizing: border-box;
        appearance: none;
        -webkit-appearance: none;
    }

    //NOTICE: Disabled 統一在這控制
    :disabled {
        background-color: ${props =>
            props.isThemeControlledByComponent
                ? props.themeType === "early"
                    ? "rgba(191, 191, 191, 0.34)"
                    : "rgba(192, 192, 192, 0.35)"
                : props.theme.mode === "early"
                ? "rgba(191, 191, 191, 0.34)"
                : "rgba(192, 192, 192, 0.35)"};

      /*
        border-color: ${props =>
            props.isThemeControlledByComponent
                ? props.themeType === "early"
                    ? "rgba(191, 191, 191, 0.34)"
                    : "rgba(192, 192, 192, 0)"
                : props.theme.mode === "early"
                ? "rgba(191, 191, 191, 0.34)"
                : "rgba(192, 192, 192, 0)"};
      */
      
        cursor: not-allowed;

        :hover {
            border-color: #d2d2d2;
        }

        :focus {
            border-color: #d2d2d2;
        }

        color: ${props =>
            props.isThemeControlledByComponent
                ? props.themeType === "early"
                    ? "#999999"
                    : "#010101"
                : props.theme.mode === "early"
                ? "#999999"
                : "#010101"};
    }

    :disabled ~ label {
        display: initial;
        position: absolute;
        top: -8px;
        bottom: 0;
        left: 0;
        right: 0;
        background: transparent;
        height: 28px;
        cursor: not-allowed;
    }

    :focus {
        outline: none;
    }

    ${props =>
        getStatusColor(
            props.prevValidStatus === "ReadyForValid" ? "ReadyForValid" : props.validStatus,
            props.keyStatus,
            props.prevValidStatus,
            props.runValid,
            props.theme.mode,
            props.isThemeControlledByComponent,
            props.themeType
        )}

    border: 0;
`;

export const StyledInput2 = styled(StyledTopInput)`
    padding: 15px;
    font-weight: 400;
    
    text-align: right;
    color: #101010;


`;
// In firefox, disabled input won't fire click event, so add a mask here.
export const StyledLabel = styled.label`
    display: none;
`;
// ${props => getStatusColor(props.prevValidStatus === "" ? "ReadyForValid" : props.validStatus, props.keyStatus, props.prevValidStatus, props.runValid)}
