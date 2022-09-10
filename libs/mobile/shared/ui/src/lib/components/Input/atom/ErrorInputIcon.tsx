import React from 'react';
import { InputIconProps } from '../type';

const ErrorInputIcon = (props: InputIconProps) => {
  const color = props.color ? props.color : '#FF5243';
  const size = props.size ? props.size : 16;
  return (
    <svg
      version="1.1"
      id="Capa_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      // width="305.002px"
      // height="305.002px"
      width={`${size}px`}
      height={`${size}px`}
      viewBox="0 0 305.002 305.002"
      enableBackground="new 0 0 305.002 305.002"
      xmlSpace="preserve"
      // style={{
      //     width: size,
      //     height: size,
      // }}
    >
      <g>
        <path
          fill={color}
          d="M152.502,0.001C68.412,0.001,0,68.412,0,152.501s68.412,152.5,152.502,152.5
		c84.089,0,152.5-68.411,152.5-152.5S236.591,0.001,152.502,0.001z M152.502,287.651c-74.524,0-135.152-60.627-135.152-135.15
		c0-74.522,60.628-135.15,135.152-135.15c74.522,0,135.15,60.627,135.15,135.15C287.653,227.024,227.025,287.651,152.502,287.651z"
        />
      </g>
      <path
        fill={color}
        d="M216.041,90.461c-4.934-4.934-12.935-4.934-17.869,0l-44.671,44.672l-44.672-44.672
	c-4.934-4.934-12.935-4.934-17.87,0c-4.934,4.935-4.934,12.935,0,17.87l44.672,44.672l-44.655,44.655
	c-4.934,4.934-4.934,12.934,0,17.868s12.935,4.935,17.869,0l44.655-44.656l44.668,44.669c4.934,4.936,12.935,4.936,17.868,0
	c4.935-4.934,4.935-12.935,0-17.868l-44.669-44.668l44.673-44.672C220.976,103.396,220.976,95.397,216.041,90.461z"
      />
    </svg>
  );
};
export default ErrorInputIcon;
