import styled from "styled-components";

interface InputContainerProps {
    width?: number;
    labelType?: string
}

const rightLabel = (labelType: string) => {
    if(labelType === "top") return `        
        flex-direction: column;
        align-items: flex-start;                
        padding-top: 3px;
        padding-bottom: 3px;
    `;
    return `        
        flex-direction: row;
        align-items: center;     
        justify-content: space-between;               
    `
}
export const InputContainer = styled.label<InputContainerProps>`
    position: relative;
    //width: ${props => props.width ?? "auto" }px;

    display: flex;
    border: 1px solid #aaaaaa;
    border-radius: 9px;
    padding-left: 20px;
    ${(props) => rightLabel(props.labelType)}
`;
