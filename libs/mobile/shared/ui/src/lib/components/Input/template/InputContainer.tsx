import styled from 'styled-components';

interface InputContainerProps {
  width?: number;
  upperLabelType: boolean;
  isFocus?: boolean;
  disabled?: boolean;
  outlineType?: string;
}

const upperLabelType = (upperLabelType: boolean) => {
  if (upperLabelType) {
    return `
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;
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
  //width: ${(props) => props.width ?? 'auto'}px;
  display: flex;

  // Border
  border:${(props) => props.outlineType === 'standard' ? 'none' : 'solid 1px #aaaaaa'};
  border-bottom: 1px solid #aaaaaa;
  border-radius: ${(props) => props.outlineType === 'standard' ? '0' : '9px'};

  // Padding
  padding: 10px 20px;
  
  // Content
  height: 49px;
  box-sizing: border-box;
  background-color: #fff;
  ${(props) => upperLabelType(props.upperLabelType)}
  ${(props) => isFocus(props.isFocus ? props.isFocus : false)};
  // ${(props) => (props.disabled ? 'background: gray' : '')};
`;
