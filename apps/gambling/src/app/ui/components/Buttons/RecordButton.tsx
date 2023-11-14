import {useState} from "react";
import cx from "classnames";
import styled from "styled-components";

const StyledRecordButton = styled.button.attrs<{ className?: string; }>((props) => ({
  className: cx(props.className, "text-transparent"),
}))`
  width: 115px;
  height: 40px;
  border-radius: 10px;
  background: transparent;
  margin-right: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #6c7083;

  letter-spacing: 0;
  font-size: 16px;

`
export type IRecordButton = {
  name?: string;
  active: boolean;
  className?: string;
  // size?: "normal" | "big",
  onClick?: () => void;
  children?: React.ReactNode;
}
export const RecordButton = (props: IRecordButton) => {
  const [hover, setHover] = useState(false);
  return (
    <StyledRecordButton
      onClick={() => props.onClick && props.onClick()}
      className={cx({
        // "w-[114px] text-xl": props.size === "big",
      })}
      // active={props.active}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <div
        className={cx(props.className, "text-white", {
          // "text-transparent": props.active || hover,
          "font-bold": props.active || hover,
          "font-medium": props.active || hover,
          "border-b-[1px] border-main-secondary-main ": props.active,
          "text-main-secondary-main": props.active || hover,
        })}
      >{props.children}</div>
    </StyledRecordButton>
  )
}
