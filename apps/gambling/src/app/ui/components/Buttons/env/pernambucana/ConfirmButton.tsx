import styled from "styled-components";

export const ConfirmButton = styled.button<{
  disable?: boolean;
}>`
  margin-right: 118px;

  box-shadow: 0 2px #036a02, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 25px;
  background: linear-gradient(180deg,var(--btn-gradient1-from) 0%,var(--btn-gradient1-to) 100%);
  width: 140px;
  height: 40px;
  font-size: 18px;
  color: #247855;

  justify-self: flex-end;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //text-shadow: 0 1px 3px #036A02;
  transition: all .1s ease-in-out;

`
