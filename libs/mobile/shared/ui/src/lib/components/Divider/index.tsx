import styled from 'styled-components';

interface dividerPropsStyle {
  styleType?: 'wide' | 'narrow';
}
export default styled.div<dividerPropsStyle>`
  width: 100%;
  border-top: solid 1px ${({ theme }) => theme.color.gray200};
  margin: ${(props) => (props.styleType === 'narrow' ? '0px' : '16px 0px')};
`;
