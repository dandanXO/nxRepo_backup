import {renderByPlatform} from "../../utils/renderByPlatform";
import React from "react";



const defaultFixedToolStyle = {
  backgroundColor: 'rgba(119, 136, 120, 0.4)'
}

const coco777betFixedToolStyle = {
  background: `linear-gradient(135deg, var(--lineary-blue-from) 8.58%, var(--lineary-blue-to) 91.42%)`,
  border: '1px solid var(--primary-assistant)',
  borderRight: '0px',
  boxShadow: '0px 2px 4px -1px rgba(0, 0, 0, 0.06), 0px 4px 6px -1px rgba(0, 0, 0, 0.10)'
}

const riojungle777betFixedToolStyle: React.CSSProperties = {

}

export const FixedToolStyle = renderByPlatform({
  "wild777bet": defaultFixedToolStyle,
  "u1": coco777betFixedToolStyle,
  "riojungle777bet": riojungle777betFixedToolStyle,
}, coco777betFixedToolStyle)
