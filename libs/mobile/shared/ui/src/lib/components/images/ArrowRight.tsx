export default (props: { fill?: string; width?: string; height?: string }) => {
  const { fill = '#aaa', width = '12px', height = '12px' } = props;
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
      <g transform="translate(-272 -470)" clipPath="url(#a)">
        <path
          d="M-4.836.838A.212.212,0,0,1-5.01.755.338.338,0,0,1-5.076.537V-.123a.541.541,0,0,1,.06-.27A1,1,0,0,1-4.8-.633l3.2-2.747L-4.8-6.128a.822.822,0,0,1-.216-.225.541.541,0,0,1-.06-.27v-.661A.338.338,0,0,1-5.01-7.5a.212.212,0,0,1,.174-.083.52.52,0,0,1,.288.15l3.78,3.243a1.306,1.306,0,0,1,.27.33A.773.773,0,0,1-.42-3.5v.255a.727.727,0,0,1-.084.36,1.319,1.319,0,0,1-.264.315L-4.548.688A.52.52,0,0,1-4.836.838Z"
          transform="translate(281.076 479.584)"
          fill={fill || '#aaa'}
        />
      </g>
    </svg>
  );
};
