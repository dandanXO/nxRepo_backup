import styled from "styled-components";

export const Item = styled.div.attrs({
  className: "relative w-full flex flex-row justify-between text-left item-center",
})`
  //width: 94%;
  //position: relative;
  margin-bottom: 16px;
  margin-top: 10px;
  background-color: rgba(242, 255, 221, 0.5);
  border: 1px solid var(--main-primary-main);
  //box-shadow: 0 2px #0148f9, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 8px;
  padding: 10px 20px;

  text-shadow: 0px 1px 0px #042A85;
`
