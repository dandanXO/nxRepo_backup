import styled from "styled-components";
import Login from "../../../../pageTemplate/header/env/coco/login.png";

export const LoginButton = styled.button`
  width: 197px;
  height: 47px;
  background-image: url(${Login});
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    opacity: 0.9;
  }
`
