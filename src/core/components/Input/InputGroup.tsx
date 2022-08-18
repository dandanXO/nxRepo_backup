import styled from "styled-components";
import React from "react";

interface InputGroupProps {
    className?: string;
    children: React.ReactNode;
    style?: object;
}
const InputGroup = (props: InputGroupProps) => {
    return (
        <div className={props.className} style={props.style}>
            {props.children}
        </div>
    );
};

const StyledInputGroup = styled(InputGroup)`
    margin-bottom: 10px;
`;

export default StyledInputGroup;
