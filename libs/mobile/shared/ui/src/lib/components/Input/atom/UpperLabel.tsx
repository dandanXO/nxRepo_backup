import styled from 'styled-components';

interface Label {
  for?: string;
}
// NOTICE: LeftInputStyle
export const UpperFilledLabel = styled.label<Label>`
  font-weight: 300;
  //position: absolute;
  //top: -20px;
  //left: 20px;
  color: #aaaaaa;
  //line-height: 22px;
  position: relative;
  top: 10px;
  height: 22px;
`;

export const UpperDefaultLabel = styled.label<Label>`
  font-weight: 300;
  //position: absolute;
  //top: -20px;
  //left: 20px;
  color: #aaaaaa;
  line-height: 22px;
`;

// NOTICE: RightInputStyle
export const LeftDefaultLabel = styled.label<Label>`
  //flex: 1 0 auto; //default
  flex: 0 0 auto;
  font-size: 17px;
`;
