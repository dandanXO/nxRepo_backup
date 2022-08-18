import React from "react";
import {InputIconProps} from "../type";
// import {withTheme} from "styled-components";
// import {ThemeModuleSkinType} from "../../../../type/module";

type SuccessInputIconInterface = InputIconProps & {
    // theme: {
    //     mode: ThemeModuleSkinType;
    // };
};

const SuccessInputIcon = (props: SuccessInputIconInterface) => {
    // const color = props.theme.mode === "early" ? "#439a02" : "#75cd2d";
    const color = "#439a02";
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
                <path
                    fill={color}
                    d="M218.473,93.97l-90.546,90.546l-41.398-41.397c-4.882-4.881-12.796-4.881-17.678,0
		c-4.881,4.882-4.881,12.796,0,17.678l50.237,50.237c2.44,2.439,5.64,3.66,8.839,3.66s6.398-1.221,8.839-3.66l99.385-99.385
		c4.882-4.882,4.882-12.796,0-17.678C231.269,89.089,223.354,89.089,218.473,93.97z"
                />
            </g>
        </svg>
    );
};

// export default withTheme(SuccessInputIcon);
export default SuccessInputIcon;
