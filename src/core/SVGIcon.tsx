// xmlns:xlink:  xmlnsXlink;
// xml:space:    xmlSpace;
// enable-background:  enableBackground
// svg: viewport, viewbox
import React from "react";
import styled from "styled-components";

interface ICommonRegularSVGICON {
    fill: string;
    size: number;
    style: { cursor: string };
}

export const RegularSVGICON = styled.div`
    width: 19px;
    height: 19px;
    //background: red;
    border-radius: 100px;
    border: 1px #aaaaaa solid;
`;

const CommonRegularSVGICON = (props: ICommonRegularSVGICON) => {
    const { size = 19, fill = "#A8A8A8" } = props;
    return <RegularSVGICON />;
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
    //         // width={`${size}px`}
    //         // height={`${size}px`}
    //         // viewBox={`0 0 ${size}px ${size}px`}
    //         enableBackground="new 0 0 510 510"
    //         xmlSpace="preserve"
    //         // NOTE:
    //         style={{
    //             width: size,
    //             height: size,
    //             verticalAlign: "middle",
    //         }}
    //     >
    //         <path
    //             fill={fill}
    //             d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z M256.5,489
    // C128.075,489,23,383.925,23,255.5C23,127.076,128.075,22,256.5,22C384.924,22,490,127.076,490,255.5
    // C490,383.925,384.924,489,256.5,489z"
    //         />
    //     </svg>
    // );
};

interface ICommonDisabledFalseSVGICON {
    fill: string;
    size: number;
    fillOpacity?: string;
}

const CommonDisabledFalseSVGICON = (props: ICommonDisabledFalseSVGICON) => {
    const { size = 19, fillOpacity = "0.07", fill = "#A8A8A8" } = props;
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
                fillOpacity={fillOpacity}
                d="M255,0C114.75,0,0,114.75,0,255s114.75,255,255,255s255-114.75,255-255S395.25,0,255,0z"
            />
        </svg>
    );
};

interface SVGICON {
    size: number;
}

const SVGICON = (props: SVGICON) => {
    const { size = 16 } = props;
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            // width="510px"
            // height="510px"
            // width={`${size}px`}
            // height={`${size}px`}
            viewBox="0 0 510 510"
            // viewBox={`0 0 ${size} ${size}`}
            // enableBackground="new 0 0 510 510"
            xmlSpace="preserve"
            // NOTE:
            style={{
                width: size,
                height: size,
                // verticalAlign: "sub",
                verticalAlign: "text-top",
            }}
        >
            <path
                fill="gray"
                d="M256,0.001c-140.25,0-255,114.75-255,255c0,140.25,114.75,255,255,255c140.25,0,255-114.75,255-255
	C511,114.751,396.25,0.001,256,0.001z M257.5,489c-128.424,0-233.5-105.075-233.5-233.5c0-128.423,105.075-233.5,233.5-233.5
	c128.424,0,233.5,105.076,233.5,233.5C491,383.925,385.924,489,257.5,489z"
            />
            <path
                fill="gray"
                d="M327.162,183.818L222.965,288.023l-38.128-38.128c-7.021-7.03-18.411-7.03-25.432,0
	c-7.03,7.021-7.03,18.41,0,25.432l50.847,50.849c3.511,3.511,8.121,5.274,12.721,5.274c4.6,0,9.201-1.756,12.712-5.274
	l116.917-116.917c7.021-7.03,7.021-18.411,0-25.44C345.572,176.797,334.191,176.797,327.162,183.818z"
            />
        </svg>
    );
};

interface IQuestionIcon {
    width: number;
    height: number;
}
const QuestionIcon = (props: IQuestionIcon) => {
    const { width, height } = props;
    return (
        <svg
            height={`${height}px`}
            viewBox="0 0 512 512"
            width={`${width}px`}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                fill="currentColor"
                d="m277.332031 384c0 11.78125-9.550781 21.332031-21.332031 21.332031s-21.332031-9.550781-21.332031-21.332031 9.550781-21.332031 21.332031-21.332031 21.332031 9.550781 21.332031 21.332031zm0 0"
            />
            <path
                fill="currentColor"
                d="m256 512c-141.164062 0-256-114.835938-256-256s114.835938-256 256-256 256 114.835938 256 256-114.835938 256-256 256zm0-480c-123.519531 0-224 100.480469-224 224s100.480469 224 224 224 224-100.480469 224-224-100.480469-224-224-224zm0 0"
            />
            <path
                fill="currentColor"
                d="m256 314.667969c-8.832031 0-16-7.167969-16-16v-21.546875c0-20.308594 12.886719-38.507813 32.042969-45.269532 25.492187-8.980468 42.625-36.140624 42.625-55.851562 0-32.363281-26.304688-58.667969-58.667969-58.667969s-58.667969 26.304688-58.667969 58.667969c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16c0-49.984375 40.664063-90.667969 90.667969-90.667969s90.667969 40.683594 90.667969 90.667969c0 35.585938-28.097657 73.367188-63.980469 86.039062-6.398438 2.238282-10.6875 8.316407-10.6875 15.101563v21.527344c0 8.832031-7.167969 16-16 16zm0 0"
            />
        </svg>
    );
};

export default QuestionIcon;

export {
    // 共用 Idel
    CommonRegularSVGICON,
    // 共用禁用: 無點擊
    CommonDisabledFalseSVGICON,
    SVGICON,
    QuestionIcon,
};
