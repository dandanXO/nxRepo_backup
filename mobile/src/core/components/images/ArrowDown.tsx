export default (props: { fill?: string; width?: string; height?: string }) => {
    const { fill = "#aaa", width = "12px", height = "12px" } = props;
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="12"
            height="12"
            viewBox="0 0 12 12"
        >
            <defs>
                <clipPath id="a">
                    <rect
                        width={width}
                        height={height}
                        transform="translate(272 470)"
                        fill="none"
                        stroke="#707070"
                        strokeWidth="1"
                    />
                </clipPath>
            </defs>
            <g transform="translate(482 -272) rotate(90)" clipPath="url(#a)">
                <path
                    d="M1.216,4.416A.3.3,0,0,0,1.464,4.3a.482.482,0,0,0,.094-.31V3.047a.77.77,0,0,0-.085-.385,1.432,1.432,0,0,0-.308-.342L-3.4-1.595,1.165-5.509a1.171,1.171,0,0,0,.308-.321.77.77,0,0,0,.085-.385v-.941a.482.482,0,0,0-.094-.31.3.3,0,0,0-.248-.118.74.74,0,0,0-.41.214L-4.58-2.75a1.861,1.861,0,0,0-.385.471,1.1,1.1,0,0,0-.111.513V-1.4a1.036,1.036,0,0,0,.12.513A1.88,1.88,0,0,0-4.58-.44L.806,4.2A.74.74,0,0,0,1.216,4.416Z"
                    transform="translate(276.241 474.416) rotate(180)"
                    fill={fill}
                />
            </g>
        </svg>
    );
};
