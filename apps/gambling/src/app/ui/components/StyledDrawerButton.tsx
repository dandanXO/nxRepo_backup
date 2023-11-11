import styled from "styled-components";
import cx from "classnames";

type IStyledDrawerButton = {
  className?: string;
  // hover: boolean;
}
export const StyledDrawerButton = styled.button.attrs<IStyledDrawerButton>(props => ({
  className: cx("text-base !font-bold md:!h-[50px]", props.className, {
    // "text-transparent": props.hover,

  })
}))`

  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 55px;
  box-sizing: border-box;

  background: #069D5C;
  margin-top: 12px;
  font-weight: 600;

  padding: 4px 14px;
  border-radius: 8px;
  box-shadow: inset 0 0 3rem 0.1rem rgba(255,255,255,.08);
`
