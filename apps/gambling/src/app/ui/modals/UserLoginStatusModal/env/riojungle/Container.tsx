import styled from "styled-components";
import {IContainer} from "../../types";
import {twMerge} from "tailwind-merge";

export const Container = (props: IContainer) => {
  return (
    <div className={twMerge("bg-[var(--grayscale-20)] p-4 overflow-hidden", props.className)} onMouseDown={props.onMouseDown}>
      {props.children}
    </div>
  )
}
