import styled from "styled-components";
import cx from "classnames";
import {useState} from "react";


export type ITabs = {
  children: React.ReactElement[];
  className?: string;
}
export const Tabs = (props: ITabs) => {
  return (
    <section className={cx("flex flex-row ", props.className)}>
      {props.children}
    </section>
  )
}

export type ITabItem = {
  name?: string;
  active: boolean;
  className?: string;
  size?: "normal" | "big" | "auto",
  onClick?: () => void;
}

export const StyledTabItem = styled.button<ITabItem>`
  min-width: 85px;
  min-height: 45px;
  ${(props) => {
    return props.active && `
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAAnCAYAAAD5Lu2WAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ4OCwgMjAyMC8wNy8xMC0yMjowNjo1MyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIyLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjM3ODFCQ0QwNjk5NTExRUVCRTIzODQzNTU1MDI2MDE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjM3ODFCQ0QxNjk5NTExRUVCRTIzODQzNTU1MDI2MDE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Mzc4MUJDQ0U2OTk1MTFFRUJFMjM4NDM1NTUwMjYwMTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Mzc4MUJDQ0Y2OTk1MTFFRUJFMjM4NDM1NTUwMjYwMTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5Z5YuJAAAKDUlEQVR42qxb23Id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');
      background-size: 100% 100%;
      background-position:  center;
    `;
  }}
`;

export const TabItem = (props: ITabItem) => {
  const [hover, setHover] = useState(false);
  return (
    <StyledTabItem
      onClick={() => props.onClick && props.onClick()}
      className={cx({
        "w-[114px] text-xl": props.size === "big",
        "w-full": props.size === "auto",
      }, props.className)}
      active={props.active}
      onMouseOver={() => {
        setHover(true);
      }}
      onMouseOut={() => {
        setHover(false)
      }}
    >
      <div
        className={cx( "text-[#fff] ",{
          "text-transparent": props.active || hover,
          "font-bold": props.active,
          "font-medium": !props.active,
        },props.className)}
      >{props.name}</div>
    </StyledTabItem>
  )
}
