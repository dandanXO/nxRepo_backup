import styled from "styled-components";
import cx from "classnames";

export const List = styled.div.attrs<{
  className?: string;
}>(props => ({
  className: cx('rounded-xl text-white mt-5 text-base', props.className)
}))`
  //background: linear-gradient(0deg,#0F1744,#2E1555);
  border: 1px solid var(--primary-assistant);
`;
