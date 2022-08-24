import styled from "styled-components";

interface InputContainerProps {
    width?: number;
    upperLabelType: boolean;
    isFocus?: boolean;
}

const upperLabelType = (upperLabelType: boolean) => {
    if (upperLabelType) {
        return `
            flex-direction: column;
            align-items: flex-start;
        `;
    } else {
        return `        
            // flex-direction: row;
            align-items: center;     
            // justify-content: space-between;       
            justify-content: space-between;                                
        `;
    }
};
const isFocus = (isFocus: boolean) => {
    if (isFocus) {
        return `        
        `;
    } else {
        return `
                        
        `;
    }
};
export const InputContainer = styled.label<InputContainerProps>`
    position: relative;
    //width: ${(props) => props.width ?? "auto"}px;
    display: flex;
    // Border
    border: 1px solid #aaaaaa;
    border-radius: 9px;
    // Padding
    padding: 10px 20px;
    // Content
    height: 42.5px;
    //
    ${(props) => upperLabelType(props.upperLabelType)}
    ${(props) => isFocus(props.isFocus ? props.isFocus : false)};
`;
