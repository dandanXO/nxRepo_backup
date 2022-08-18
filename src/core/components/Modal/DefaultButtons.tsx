import React from "react";
import styled from "styled-components";
// import styledTypescript from 'styled-components-ts'

const getButtonAllColorStyle = (colorName: string) => {
    let css = "";
    switch (colorName) {
        case "green":
            css = `
                border-color: #5ee030;
                background-color: #52d344;    
            
                /* Status */
                :hover {
                    border-color: #4abb3e;
                    background-color: #4abb3e;                            
                }
                :active {
                    border-color: #43e9a3;
                    background-color: #44a939;                            
                }
            `;
            break;
        case "red":
            css = `
                /* Border */
                border: 1px solid #f03e2e;
            

                /* Background */
                background-color: #ff5243;
                /* Status */
                :hover {
                    background-color: #ff1400;
                }
                :active {
                    border: 1px solid #af3025;
                    background-color: #bd1204;        
                }
            `;
            break;
        case "gray":
            css = `
                /* Border */
                border: 1px solid #657189;    
            
                /* Background */
                background-color: #fff;
                
                :hover {
                    border-color: #3ebdf0;        
                    background-color: #3ac0f8;
                    /* Text */
                    color: #fff;
                }
            
                :active {
                    border-color: #30b3e9;        
                    background-color: #30b3e9;
                    /* Text */
                    color: #fff;
                }

                /* Text */
                color: #585858;
            `;
            break;
    }
    return css;
};

interface StyledlessButtonProps {
    className?: string;
    onClick?: () => void;
    children?: React.ReactNode;
    color?: string;
}
const StyledlessButton = (props: StyledlessButtonProps) => (
    <div className={props.className} onClick={props.onClick}>
        {props.children}
    </div>
);

interface ButtonProps extends StyledlessButtonProps {}

/*${getButtonAllColorStyle("red")};*/
const ConfirmButton = styled(StyledlessButton)<ButtonProps>`
    /* Display */   
    flex: 1;
  
    /* Margin */
    //margin-right: 5px;

    /* Border */
    border-radius: 10px;

    //width: 113px;
    height: 48px;

    /* Text */
    line-height: 48px;
    text-align: center;
    font-weight: 600;
    // font-family: ${(props) => props.theme.custom.fontfamily};
    /* Other */
    cursor: pointer;
    /*background: ${(props) => props.theme.custom.button.primary.text};*/
    padding: 0 20px;
`;

ConfirmButton.displayName = "ConfirmButton";

//${getButtonAllColorStyle("green")};
const NotificationButton = styled(ConfirmButton)<ButtonProps>`
  background: ${(props) => props.theme.custom.button.alert.background};
    /* width: 113px; */
`;
NotificationButton.displayName = "NotificationButton";

const CancelButton = styled(ConfirmButton)<ButtonProps>`
    // ${getButtonAllColorStyle("gray")};
`;
CancelButton.displayName = "CancelButton";

const CustomColorButton = styled(ConfirmButton)<ButtonProps>`
    // ${props => getButtonAllColorStyle(props.color)};
`;

export { ConfirmButton, NotificationButton, CancelButton, CustomColorButton };


