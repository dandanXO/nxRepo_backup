// 沒點擊，禁用
import React from "react";
import {CommonDisabledFalseSVGICON, CommonRegularSVGICON, RegularSVGICON} from "../../SVGIcon";
import styled from "styled-components";

// NOTE: 有點擊，沒有禁用
interface RadioCheckSVGICONProps {
    size: number;
    fill: string;
    radioFill: string;
    style: {
        cursor: "pointer" | "not-allowed";
    };
}

const RadioCheck = styled(RegularSVGICON)`
    background: #f58b10;
    width: 11px;
    height: 11px;
    position: relative;
    top: 3px;
    left: 3px;
`
const RadioCheckSVGICON: React.FC<RadioCheckSVGICONProps> = props => {
    const size = props.size;
    const fill = props.fill ? props.fill : "#36A9FB";
    const radioFill = props.radioFill ? props.radioFill : "#36a9fb";
    return (
        <RegularSVGICON>
            <RadioCheck/>
        </RegularSVGICON>
    )
    // return (
    //     <svg
    //         version="1.1"
    //         id="Capa_1"
    //         xmlns="http://www.w3.org/2000/svg"
    //         xmlnsXlink="http://www.w3.org/1999/xlink"
    //         x="0px"
    //         y="0px"
    //         width="510px"
    //         height="510px"
    //         viewBox="0 0 510 510"
    //         enableBackground="new 0 0 510 510"
    //         xmlSpace="preserve"
    //         style={{
    //             width: size,
    //             height: size,
    //             verticalAlign: "middle",
    //         }}
    //     >
    //         {/*        <path*/}
    //         {/*            fill={fill}*/}
    //         {/*            d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M256.5,489*/}
    //         {/*C128.075,489,23,383.925,23,255.5C23,127.076,128.075,22,256.5,22C384.924,22,490,127.076,490,255.5*/}
    //         {/*C490,383.925,384.924,489,256.5,489z"*/}
    //         {/*        />*/}
    //         <path
    //             fill={radioFill}
    //             d="M255.001,361.06c-58.332,0-106.061-47.727-106.061-106.06c0-58.332,47.729-106.061,106.061-106.061
    // c58.33,0,106.058,47.729,106.058,106.061C361.059,313.333,313.33,361.06,255.001,361.06z"
    //         />
    //     </svg>
    //
    // );
};

// NOTE: 禁用, 沒點擊
interface RadioDisableFalseSVGICONProps {
    fill: string;
    size: number;
    fillOpacity?: string;
    style: {
        cursor: "pointer" | "not-allowed";
    };
}

const RadioDisableFalseSVGICON: React.FC<RadioDisableFalseSVGICONProps> = props => {
    return <CommonDisabledFalseSVGICON {...props} />;
};


// NOTE: 禁用，有點擊
interface RadioDisabledTrueSVGICONProps {
    size: number;
    radioFill: string;
    fill: string;
    style: {
        cursor: "pointer" | "not-allowed";
    };
}

const RadioDisabledTrueSVGICON: React.FC<RadioDisabledTrueSVGICONProps> = props => {
    const size = props.size;
    const radioFill = props.radioFill ? props.radioFill : "#A9B1B7";
    const fill = props.fill ? props.fill : "gray";

    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            width="510px"
            height="510px"
            viewBox="0 0 510 510"
            enableBackground="new 0 0 510 510"
            xmlSpace="preserve"
            style={{
                width: size,
                height: size,
                verticalAlign: "middle",
            }}
        >
            <path
                fill={fill}
                fillOpacity="0.07"
                d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z"
            />
            <path
                fill={radioFill}
                d="M255.001,361.061c-58.332,0-106.062-47.728-106.062-106.061c0-58.332,47.729-106.061,106.062-106.061
    c58.329,0,106.058,47.729,106.058,106.061C361.059,313.333,313.329,361.061,255.001,361.061z"
            />
        </svg>
    );
};



export {
    // NOTE: Idle 使用共用
    // NOTE: 沒禁用, 有點擊:
    RadioCheckSVGICON,
    // NOTE: 禁用, 沒點擊
    RadioDisableFalseSVGICON,
    // NOTE: 禁用, 有點擊
    RadioDisabledTrueSVGICON,
};
