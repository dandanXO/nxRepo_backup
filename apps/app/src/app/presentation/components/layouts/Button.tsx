import cx from "classnames";
import {TestingProps} from "../../../modules/TestingProps";
import { TailSpin } from 'react-loading-icons'

type Props = {
  text: string;
  className?: string;
  onClick?: () => void;
  loading?: boolean;
} & TestingProps;

export const Button = (props: Props) => {
  return (
    <div
      onClick={props.onClick}
      data-testing-id={props.dataTestingID}
      // shadow-md shadow-gray-400
      className={cx("rounded-md p-2 text-center", props.className)}
    >
      {props.text}
      {props.loading && <TailSpin height={25} className={"inline-block"}/>}
    </div>
  )
}
