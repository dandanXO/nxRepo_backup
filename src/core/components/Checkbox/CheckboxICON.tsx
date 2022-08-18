// 有點擊，禁用
import React from "react";
import {CommonDisabledFalseSVGICON} from "../../SVGIcon";

interface CheckboxDisableTureSVGICONProps {
    size: number;
    checkFill: string;
    fill: string;
    style: {cursor: string};
}

const CheckboxDisableTureSVGICON: React.FC<CheckboxDisableTureSVGICONProps> = (props: CheckboxDisableTureSVGICONProps) => {
    const size = props.size ? props.size : 18;
    const checkFill = props.checkFill ? props.checkFill : "#A9B1B7";
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
                d="M256.5,3C117.075,3,3,117.075,3,256.5S117.075,510,256.5,510S510,395.925,510,256.5S395.925,3,256.5,3z
    "
            />
            <path
                fill={checkFill}
                d="M324.241,181.742L220.659,285.334l-37.904-37.904c-6.98-6.989-18.303-6.989-25.284,0
    c-6.987,6.98-6.987,18.301,0,25.283l50.549,50.549c3.49,3.491,8.073,5.244,12.646,5.244c4.572,0,9.147-1.747,12.637-5.244
    l116.229-116.229c6.979-6.988,6.979-18.302,0-25.29C342.544,174.762,331.231,174.762,324.241,181.742z"
            />
        </svg>
    );
};

interface CheckboxDisableFalseSVGICONProps {
    fill: string;
    size: number;
    style: {cursor: string};
    fillOpacity: string;
}

const CheckboxDisableFalseSVGICON: React.FC<CheckboxDisableFalseSVGICONProps> = (props: CheckboxDisableFalseSVGICONProps) => {
    return <CommonDisabledFalseSVGICON {...props}></CommonDisabledFalseSVGICON>;
};

interface CheckboxCheckSVGICONProps {
    size: number;
    fill: string;
    style: {cursor: string};
}

const CheckboxCheckSVGICON: React.FC<CheckboxCheckSVGICONProps> = (props: CheckboxCheckSVGICONProps) => {
    const size = props.size ? props.size : 19;
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
            // NOTE:
            style={{
                width: size,
                height: size,
                verticalAlign: "middle",
            }}
        >
            <path
                fill={props.fill ? props.fill : "#36A9FB"}
                d="M256,0.001c-140.25,0-255,114.75-255,255c0,140.25,114.75,255,255,255c140.25,0,255-114.75,255-255
    C511,114.751,396.25,0.001,256,0.001z M257.5,489c-128.424,0-233.5-105.075-233.5-233.5c0-128.423,105.075-233.5,233.5-233.5
    c128.424,0,233.5,105.076,233.5,233.5C491,383.925,385.924,489,257.5,489z"
            />
            <path
                fill={props.fill ? props.fill : "#36A9FB"}
                d="M327.162,183.818L222.965,288.023l-38.128-38.128c-7.021-7.03-18.411-7.03-25.432,0
    c-7.03,7.021-7.03,18.41,0,25.432l50.847,50.849c3.511,3.511,8.121,5.274,12.721,5.274c4.6,0,9.201-1.756,12.712-5.274
    l116.917-116.917c7.021-7.03,7.021-18.411,0-25.44C345.572,176.797,334.191,176.797,327.162,183.818z"
            />
        </svg>
    );
};

export {
    // Idle 使用共用
    // 禁用, 有點擊
    CheckboxDisableTureSVGICON,
    // 禁用, 沒點擊
    CheckboxDisableFalseSVGICON,
    // 沒禁用, 有點擊
    CheckboxCheckSVGICON,
};
