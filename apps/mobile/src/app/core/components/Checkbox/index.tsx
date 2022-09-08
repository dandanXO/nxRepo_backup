import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { v4 } from "uuid";
import WithThemeCheckboxSVGICON from "./WithThemeCheckboxSVGICON";
import formStateContext from "../formStateContext";

interface StyledCheckBoxInputProps {
    disabled?: boolean;
}
const StyledCheckBoxInput = styled.div<StyledCheckBoxInputProps>`
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: content-box;
    cursor: ${(props) => (!props.disabled ? "pointer" : "not-allowed")};
    position: relative;
`;

interface CheckboxInputProps {
    size?: string;
    // onClick: (event: any) => void;
    id: string;
    disabled?: boolean;
    checked: boolean | undefined;
    onChange: (checked: boolean) => void;
    value?: string;
}

// NOTE: Can listen self event handler
const CheckboxInput: React.FC<CheckboxInputProps> = styled.input.attrs(
    (props) => ({
        type: "checkbox",
    })
)<CheckboxInputProps>`
    padding: 0;
    margin: 0;
    display: inline-block;
    position: absolute;
    opacity: 0;
    cursor: ${(props) => (!props.disabled ? "pointer" : "not-allowed")};
    height: ${(props) => (props.size === "big" ? "28px" : "18px")};
    width: ${(props) => (props.size === "big" ? "28px" : "18px")};
`;

export interface CheckboxProps {
    value?: string;
    checked?: boolean;
    // defaultChecked?: boolean;
    disabled?: boolean;
    onChange?: (event: any, value?: string) => void;
    className?: string;
}

// 不論外面為 controlled or uncontrolled，這邊皆為 controlled
const CheckBox: React.FC<CheckboxProps> = (props: CheckboxProps) => {
    const valueOfFormState = useContext(formStateContext);
    const inputIdRef = useRef(v4());
    const [check, setCheck] = useState<boolean | undefined>(props.checked);
    const [over, setOver] = useState(false);

    const inputChecked = (event: any) => {
        if (props.disabled) return;
        props.onChange && props.onChange(!check, props.value);
        valueOfFormState.onCheck && valueOfFormState.onCheck(!check);
        setCheck(!check);
    };
    // const inputChecked = useCallback(
    //     event => {
    //         console.log("checkbox", props);
    //         event.stopPropagation();
    //         if (props.disabled) return;

    //         props.onChange && props.onChange(!check, props.value);
    //         valueOfFormState.onCheck && valueOfFormState.onCheck(!check);
    //         setCheck(!check);
    //     },
    //     [check, props.disabled]
    // );

    useEffect(() => {
        setCheck(props.checked);
    }, [props.checked]);

    const onMouseOver = () => {
        setOver(true);
    };

    const onMouseOut = () => {
        setOver(false);
    };

    return (
        <React.Fragment>
            <StyledCheckBoxInput
                className={props.className}
                disabled={props.disabled}
                onMouseOver={onMouseOver}
                onMouseOut={onMouseOut}
            >
                <CheckboxInput
                    size={valueOfFormState.size}
                    // onClick={onInputClick}
                    id={inputIdRef.current}
                    checked={check}
                    onChange={inputChecked}
                    disabled={props.disabled}
                    value={props.value}
                />
                <span
                    style={{
                        margin: "0 4px 0 0",
                    }}
                >
                    <WithThemeCheckboxSVGICON
                        check={check}
                        size={valueOfFormState.size}
                        disabled={props.disabled}
                        hover={over}
                    />
                </span>
            </StyledCheckBoxInput>
        </React.Fragment>
    );
};

export default CheckBox;
