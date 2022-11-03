import React from "react";
import {IArrowSVGICONProps} from "./IArrowSVGICONProps";

const SelectButtonArrowDownSVGICON = (props: IArrowSVGICONProps) => {
  const fill = props.fill ? props.fill : "#ffffff";
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      width="470.916px"
      height="282.5px"
      viewBox="20.5 0 470.916 282.5"
      enableBackground="new 20.5 0 470.916 282.5"
      xmlSpace="preserve"
      style={{
        // NOTE: 增加 px 來修正在firefox 寬高無法被限制
        width: "11.75px",
        height: "7.05px",
        verticalAlign: "middle",
      }}
    >
      <g>
        <path
          fill={fill}
          d="M255.93,245.485L43.258,4.45c-5.226-5.934-13.624-5.934-18.838,0c-5.226,5.91-5.226,15.434,0,21.379
		L246.56,277.562c5.251,5.944,13.625,5.944,18.851,0L487.454,25.83c2.576-2.924,3.962-6.822,3.962-10.634
		c0-3.812-1.288-7.71-3.962-10.634c-5.227-5.934-13.587-5.934-18.813,0L255.93,245.485z"
        />
      </g>
    </svg>
  );
};
export {SelectButtonArrowDownSVGICON};
