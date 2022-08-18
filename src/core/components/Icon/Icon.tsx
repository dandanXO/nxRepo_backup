import repay_icon from "./SVG/repay_icon.svg";
import styled from "styled-components";
const StyledlessRepayICON = (props: any) => <img className={props.className} src={repay_icon}/>

const RepayICON = styled(StyledlessRepayICON)`
  width: 20px;
  margin-right: 10px;
`;

export {
    RepayICON
}
