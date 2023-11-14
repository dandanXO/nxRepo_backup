import styled from "styled-components";
import {ITabItem} from "../../TabItem";
import {environment} from "../../../../../../environments/environment";
import howToActiveImg from "./howto-tab-active.png"
import howToInactiveImg from "./howto-tab-inactive.png"
import dataActiveImg from "./data-tab-active.png";
import dataInactiveImg from "./data-tab-inactive.png";

const StyledTabItemNoICON = styled.button<ITabItem>`
  //min-width: 96px;
  //min-height: 35px;
  color: #6c7083;
  ${(props) => {
  if (props.pureColor === true) {
    if (!props.active) {
      return `
          color: var(--white);
        `;
    } else {
      return `
          color: var(--main-primary-varient);
          // border: 1px solid var(--white);
        `
    }
  }
}};
  ${(props) => {
    if (!props.pureColor) {
      return props.active && `
          // background: ${props.background ? props.background : `url("assets/${environment.assetPrefix}/select_btn.png")`};
          // background-size: 100% 100%;
          // background-position:  center;
          color: #ffffff;
          &:after {
            display: block;
            content: "";
            width: 40px;
            height: 3px;
            bottom: 0px;
            transform: translateX(50%) translateX(-50%);
            transition-duration: 0.3s;
            background: #0691f5;
            box-shadow: 0 0 10px #0272c2;
            margin: auto;
          }
        `;
    } else {
      if (props.active) {
        return `
            // background: linear-gradient(90deg, var(--btn-gradient1-from), var(--btn-gradient1-to));
            // border-radius: 8px;
          `;
      } else {
        return `
            background: var(--assistant);
            // border-radius: 8px;
          `
      }

    }
  }}
`;


export const StyledTabItem = (props: ITabItem) => {
  return (
      <StyledTabItemNoICON
        pureColor={props.pureColor}
        name={props.name}
        active={props.active}
        className={props.className}
        size={props.size}
        onClick={props.onClick}
        background={props.background}
      >
        <div className={"flex flex-row"}>
          {props.mode === "howto" ? (
            // <img alt={"howto"} className={"w-[20px] h-[20px] pr-2"} src={props.active ? howToActiveImg : howToInactiveImg}/>
            <img alt={"howto"} className={"h-[20px] pr-2"} src={props.active ? howToActiveImg : howToInactiveImg}/>
          ): props.mode === "data" ? (
            // <img alt={"data"} className={"w-[20px] h-[20px] pr-2"} src={props.active ? dataActiveImg : dataInactiveImg}/>
            <img alt={"data"} className={"h-[20px] pr-2"} src={props.active ? dataActiveImg : dataInactiveImg}/>
          ): null}
          {props.children}
        </div>
      </StyledTabItemNoICON>
  )
}
