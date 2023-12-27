import {IICON} from "./types";

export const GameControllerSVGIcon = (props:IICON) => {
  const size = props.size? props.size / 32 : 1;
  return (
    <svg width={props.size || "32"} height={props.size || "32"} viewBox={`0 0 ${props.size} ${props.size}`} fill="none"  xmlns="http://www.w3.org/2000/svg">
      <path d="M19 13.5H23" stroke={props.color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size})`}/>
      <path d="M9 13.5H13" stroke={props.color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size})`}/>
      <path d="M11 11.5V15.5" stroke={props.color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size})`}/>
      <path d="M21.4991 6.9624L10.4991 6.9999C8.97126 7.00281 7.4931 7.54278 6.32314 8.52535C5.15319 9.50793 4.36594 10.8706 4.09908 12.3749V12.3749L2.04908 22.8874C1.91746 23.6215 2.02378 24.3785 2.35254 25.0479C2.6813 25.7174 3.21532 26.2643 3.87673 26.609C4.53814 26.9536 5.29235 27.078 6.0294 26.9639C6.76645 26.8499 7.44779 26.5034 7.97408 25.9749V25.9749L13.3741 19.9999L21.4991 19.9624C23.223 19.9624 24.8763 19.2776 26.0953 18.0586C27.3143 16.8396 27.9991 15.1863 27.9991 13.4624C27.9991 11.7385 27.3143 10.0852 26.0953 8.86621C24.8763 7.64722 23.223 6.9624 21.4991 6.9624V6.9624Z" stroke={props.color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size})`}/>
      <path d="M27.9 12.3374L29.95 22.8874C30.0816 23.6215 29.9753 24.3785 29.6465 25.0479C29.3178 25.7174 28.7838 26.2643 28.1224 26.609C27.4609 26.9536 26.7067 27.078 25.9697 26.9639C25.2326 26.8499 24.5513 26.5034 24.025 25.9749V25.9749L18.625 19.9749" stroke={props.color || "white"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform={`scale(${size})`}/>
    </svg>
  )
}
