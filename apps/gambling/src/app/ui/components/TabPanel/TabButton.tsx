import styled from "styled-components";
import {environment} from "../../../../environments/environment";

type ITabButton = {
  active?: boolean;
}
export const TabButton = styled.button<ITabButton>`
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //height: 100%;
  cursor: pointer;
  width: 350px;
  height: 56px;
  margin-right: 8px;
  color: ${(props) =>
    props.active
      ? "rgba(22, 255, 143, 1)"
      : "#fff"};

  background: ${(props) =>
    props.active
      ? `url('assets/${environment.uVersion}/btn_invite_friend.png') center center no-repeat`
      : ""};

  @media (max-width: 768px) {
    background: ${(props) =>
      props.active
        ? `url('assets/${environment.uVersion}/btn_invite_friend_h5.png') center center no-repeat`
        : ""};
  }
`


export const TabTextConVidar = styled.div`
  padding: 10px 30px;
  //color: #fff;
  //background: url("assets/${environment.uVersion}/btn_green01.png") center center no-repeat;
  //width: 150px;
  //height: 60px;
  //border-radius: 10px;
  //margin-top: 10px; /* 垂直調整10px */
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
`

export const TabTextDados = styled.div`
  padding: 10px 30px;
  //color: #fff;
  //background: url("assets/${environment.uVersion}/icon_yellow.png") center center no-repeat;
  //width: 150px;
  //height: 60px;
  //border-radius: 10px;
  //margin-top: 10px; /* 垂直調整10px */
  //-webkit-background-clip: text;
  //-webkit-text-fill-color: transparent;
`
