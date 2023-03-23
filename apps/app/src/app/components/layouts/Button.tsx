import cx from "classnames";

interface Props {
  text?: string;
  bgColor?: string;
}
export const Button = (props: Props) => {
  return (
    <div className={cx("rounded-lg p-2 text-white text-center shadow-lg shadow-gray-400", props.bgColor)}>{props.text}</div>
  )
}
