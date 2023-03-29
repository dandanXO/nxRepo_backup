import cx from "classnames";
import {TestingProps} from "../../modules/TestingProps";

type Props = {
  text?: string;
  bgColor?: string;
  onClick?: () => void;
} & TestingProps;

export const Button = (props: Props) => {
  return (
    <div onClick={props.onClick} data-testing-id={props.dataTestingID} className={cx("rounded-lg p-2 text-white text-center shadow-md shadow-gray-400", props.bgColor)}>{props.text}</div>
  )
}
