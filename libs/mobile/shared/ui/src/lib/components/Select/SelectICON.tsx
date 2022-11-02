import React from "react";

interface ArrowSVGICONProps {
    fill?: string;
}
const ArrowUpSVGICON = (props: ArrowSVGICONProps) => {
    const fill = props.fill ? props.fill : "#5E5E5E";
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
                    d="M468.641,277.458c5.227,5.935,13.587,5.935,18.813,0c2.674-2.924,3.962-6.822,3.962-10.634
    c0-3.813-1.386-7.711-3.962-10.635L265.411,4.458c-5.227-5.944-13.6-5.944-18.851,0L24.42,256.189
    c-5.226,5.945-5.226,15.471,0,21.38c5.214,5.934,13.612,5.934,18.838,0L255.93,36.534L468.641,277.458z"
                />
            </g>
        </svg>
    );
};

const ArrowDownSVGICON = (props: ArrowSVGICONProps) => {
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

const ArrowRightSVGICON = (props: ArrowSVGICONProps) => {
    const fill = props.fill ? props.fill : "#fff";
    return (
        <svg
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 255 255"
            xmlSpace="preserve"
            style={{
                // NOTE: 增加 px 來修正在firefox 寬高無法被限制
                width: "11.75px",
                height: "7.05px",
                verticalAlign: "middle",
            }}
        >
            <g>
                <g id="arrow-drop-down">
                    <polygon points="63.8,255 191.3,127.5 63.8,0" fill={fill} />
                </g>
            </g>
        </svg>
    );
};

export {ArrowUpSVGICON, ArrowDownSVGICON, ArrowRightSVGICON};
