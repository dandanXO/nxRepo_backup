import {IICON} from "./types";


export const ThumbsUPSVGIcon = (props:IICON) => {
  const size = props.size? props.size / 32 : 1;
  return (
    <svg width={props.size || "32"} height={props.size || "32"} viewBox={`0 0 ${props.size} ${props.size}`} fill="none"  xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 8.125H6.25V16.25H2.5C2.33424 16.25 2.17527 16.1842 2.05806 16.0669C1.94085 15.9497 1.875 15.7908 1.875 15.625V8.75C1.875 8.58424 1.94085 8.42527 2.05806 8.30806C2.17527 8.19085 2.33424 8.125 2.5 8.125V8.125Z" stroke={props.color || "white"} strokeLinecap="round" strokeLinejoin="round" transform={`scale(${32/20 * size})`}/>
      <path d="M6.25 8.125L9.375 1.875C10.038 1.875 10.6739 2.13839 11.1428 2.60723C11.6116 3.07607 11.875 3.71196 11.875 4.375V6.25H16.7109C16.8882 6.24956 17.0635 6.28706 17.225 6.35997C17.3866 6.43288 17.5306 6.53953 17.6476 6.67273C17.7645 6.80593 17.8516 6.96262 17.9029 7.13226C17.9543 7.3019 17.9687 7.48056 17.9453 7.65625L17.0078 15.1562C16.9699 15.4573 16.8237 15.7343 16.5966 15.9356C16.3695 16.1368 16.0769 16.2486 15.7734 16.25H6.25" stroke={props.color || "white"} strokeLinecap="round" strokeLinejoin="round" transform={`scale(${32/20*size})`}/>
    </svg>
  )
}
