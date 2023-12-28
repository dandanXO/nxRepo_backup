import {useState} from "react";
import {StyledDrawerButton} from "./StyledDrawerButton";

type IDrawerButton = {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  // active?: boolean;
}
export const DrawerButton = (props: IDrawerButton) => {
  const [hover, setHover] = useState(false);

  return (
    <StyledDrawerButton
      // active={props.active}
      className={props.className}
      // hover={hover}
      onMouseOver={() => {
        setHover(true)
      }}
      onMouseOut={() => {
        setHover(false)
      }}
      onClick={() => props.onClick && props.onClick()}
    >{props.children}</StyledDrawerButton>
  )
}
