import styled from "styled-components";

interface InputContainerProps {
    width?: number;
    upperLabelType: boolean;
    isFocus?: boolean;
}

const upperLabelType = (labelType: boolean) => {
    if(labelType) {
        return `
            flex-direction: column;
            align-items: flex-start;
        `
    } else {
        return `        
            // flex-direction: row;
            align-items: center;     
            // justify-content: space-between;               
        `
    }
}
const isFocus = (isFocus: boolean) => {
    if(isFocus) {
        return `        
        `;
    } else {
        return `
            justify-content: center;            
        `;
    }

}
export const InputContainer = styled.label<InputContainerProps>`   
    position: relative;
    //width: ${props => props.width ?? "auto" }px;
    display: flex;
    border: 1px solid #aaaaaa;
    border-radius: 9px;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    height: 42.5px;
    ${(props) => upperLabelType(props.upperLabelType)}
    ${(props) => isFocus(props.isFocus)};
`;
