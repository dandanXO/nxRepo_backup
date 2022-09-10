import styled from 'styled-components';

/* eslint-disable-next-line */
export interface MobileSharedUiProps {}

const StyledMobileSharedUi = styled.div`
  color: pink;
`;

export function MobileSharedUi(props: MobileSharedUiProps) {
  return (
    <StyledMobileSharedUi>
      <h1>Welcome to MobileSharedUi!</h1>
    </StyledMobileSharedUi>
  );
}

export default MobileSharedUi;
