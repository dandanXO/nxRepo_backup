import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";
import cx from "classnames";

export const Container = styled.div.attrs((props) => ({
  className: cx(
    "w-[90vh] max-w-[350px] rounded-2xl flex flex-col items-center relative",
    "bg-[black] text-white",
    props.className
  ),
}))<{
  className?: string;
}>`
  //width: 100%;
  //height: 100%;
  background-image: url(assets/${environment.assetPrefix}/ad_bg_1.png);
  //background-size: 100% auto;
  background-size: cover;
  border-radius: 20px;
  padding: 16px;
`;
