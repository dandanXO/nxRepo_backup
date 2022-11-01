import repay_icon from './SVG/repay_icon.svg';
import success_icon from './SVG/success_icon.svg';
import general_success_icon from './ic_apply_complete.svg'
import styled from 'styled-components';

const StyledlessRepayICON = (props: any) => (
  <img className={props.className} src={repay_icon} />
);
const StyledlessSuccessICON = (props: any) => (
  <img className={props.className} src={success_icon} />
);

const GeneralStyledlessSuccessICON = (props: any) => (
  <img className={props.className} src={general_success_icon} />
);


const RepayICON = styled(StyledlessRepayICON)`
  width: 20px;
  margin-right: 10px;
`;

const OrangeSuccessICON = styled(StyledlessSuccessICON)`
  width: 120px;
`;

const GeneralSuccessICON = styled(GeneralStyledlessSuccessICON)`
  width: 120px;
`;
export { RepayICON, OrangeSuccessICON, GeneralSuccessICON };
