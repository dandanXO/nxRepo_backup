import React, { CSSProperties } from 'react';
const CustomLabel = (props: { style?: CSSProperties; children: string }) => (
    <div
        style={{
            marginRight: 8,
            width: 178,
            height: 32,
            lineHeight: '32px',
            display: 'inline-block',
            ...props.style,
        }}
    >
        {props.children}
    </div>
);

export default CustomLabel;
