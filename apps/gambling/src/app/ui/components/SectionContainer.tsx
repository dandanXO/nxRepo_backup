import styled from "styled-components";
import cx from "classnames";

export const SectionContainer = styled.div.attrs<{
  className?: string;
}>((props) => ({
  className: cx(props.className, "text-white")
}))`
  //background-color: rgba(9,11,15,.6);
  //border-radius: 20px;
  //padding: 1.5vw 3vw;
`;
