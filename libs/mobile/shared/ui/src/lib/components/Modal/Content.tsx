import styled from 'styled-components';

const Content = styled.div`
  /* Display */
  //display: table;
  /* Margin */
  //margin: 10px;
  /* NOTICE: 最大尺寸 */
  max-width: 320px;
  //height: 80px;
  /* Padding */
  padding: 10px;
  /* Text */
  text-align: center;
  //text-shadow: 1px 0 4px #191a1b;
  color: ${(props) => props.theme.custom.text.secondary};
  // font-family: ${(props) => props.theme.custom.fontfamily};
  font-size: 14px;
  font-weight: 300;
  /* Text - Content */
  word-break: break-word;
  line-height: 25px;
`;
Content.displayName = 'Content';
export default Content;
