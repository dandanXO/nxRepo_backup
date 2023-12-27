import {IICON} from "./types";

export const MenuSVGIcon = (props:IICON) => {
  const size = props.size? props.size / 32 : 1;
  return (
    <svg width={props.size || "32"} height={props.size || "32"} viewBox={`0 0 ${props.size} ${props.size}`} fill="none"  xmlns="http://www.w3.org/2000/svg">
      <path d="M5 16H27" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform={`scale(${size})`}/>
      <path d="M5 8H27" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform={`scale(${size})`}/>
      <path d="M5 24H27" stroke={props.color || "white"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform={`scale(${size})`}/>
    </svg>
  )
}
