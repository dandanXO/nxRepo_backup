import styled from "styled-components";
import cx from "classnames";
import {environment} from "../../../../../../environments/environment";

const StyledMoneyButton = styled.div.attrs((props) => ({
  className: cx("flex flex-row justify-center items-center", props.className)
}))<{
  className?: string;
}>`
  position: absolute;
  right: -10px;
  top: -1%;
  width: 104px;
  height: 78px;
  background: linear-gradient(90deg, var(--dashboard-block2-gradient-from), var(--dashboard-block2-gradient-to));
  //box-shadow: 0 2px 4px rgba(0,0,0,.5), 0 1px #880c00, inset 0 1px 3px rgba(255,255,255,.5);
  border-radius: 10px;
  //display: flex;
  //justify-content: center;
  //align-items: center;
  color: #f7fe00;
  line-height: 21px;
  border-color: 2px solid var(--dashboard-block2);
  //text-shadow: 0px 1px 0px #7D0403;
  //margin-top: -15px;
`

type IMoneyButton = {
  money: number;
}
export const MoneyButton = (props: IMoneyButton) => {
  return (
    <StyledMoneyButton>
      <img alt="money" className={'w-[36px] h-[36px]'} src={`assets/${environment.uVersion}/icon_36.png`}/>
      <span
        className={"ml-2 font-bold text-lg money-value text-[var(--dashboard-block2)]"}
        style={{
          textShadow: '3px 0 0 white, -3px 0 0 white, 0 1.5px 0 white, 0 -1.5px 0 white' /* 增加阴影的偏移值以使阴影比字体更大 */
        }}
      >{props.money}</span>
    </StyledMoneyButton>
  )
}
