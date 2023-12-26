import styled from "styled-components";

export const CheckInButton = styled.button.attrs({
  className: 'py-1 px-4 rounded-lg bg-medium text-sm text-white',
})`
  background: linear-gradient(90deg,var(--button-deposit-from),var(--button-deposit-to));
`;
