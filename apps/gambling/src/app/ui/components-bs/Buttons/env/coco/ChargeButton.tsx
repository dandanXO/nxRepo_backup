import styled from "styled-components"
import {environment} from "../../../../../../environments/environment";

export const ChargeButton = styled.button`
  cursor: pointer;
  background: linear-gradient(180deg,var(--primary-main-from) 0%,var(--primary-main-to) 100%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  padding: 14px 48px;
  font-weight: medium;
`

