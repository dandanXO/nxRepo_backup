import styled from 'styled-components';

const sizeProps: {
  [key: string]: string;
} = {
  small: '4px 12px',
  large: '14px',
};
interface buttonPropsStyle {
  styleType?: 'primary' | 'secondary' | 'link' | 'info' | 'ghost';
  size?: string;
}
export default styled.button<buttonPropsStyle>`
  color: ${(props) =>
    props.styleType
      ? props.theme.button[props.styleType].text
      : props.theme.button["primary"].text};
  background: ${(props) =>
    props.styleType
      ? props.theme.button[props.styleType].main
      : props.theme.button["primary"].main};
  padding: ${(props) =>
    props.styleType === 'link'
      ? 0
      : sizeProps[props.size ? props.size : 'large']};
  border: ${(props) => props.styleType === "ghost" ? `1px solid ${props.theme.button[props.styleType].border}` : "none"};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.fontSize[16]};
  width: 100%;
`;
