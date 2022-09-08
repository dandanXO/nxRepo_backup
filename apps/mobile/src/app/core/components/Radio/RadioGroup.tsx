import React from "react";
import Radio from "./Radio";
import styled from "styled-components";

export interface GroupProps {
    className?: string;
    style: Object;
    children: React.ReactNode;
}

const Group: React.FC<GroupProps> = (props: GroupProps) => {
    return (
        <div className={props.className} style={props.style}>
            {props.children}
        </div>
    );
};

const StyledGroup = styled(Group)<GroupProps>`
    display: flex;
    /* display: flex;
    flex-direction: \${props => (typeof props.vertical === "undefined" || props.vertical ? "row" : "column")};
    \${RadioBoxInput} {
        margin: 0 5px 0 0;
        flex: 1;
    } */
`;

export interface RadioParams {
    key: string;
    value: string;
}

export interface RadioGroupProps {
    width?: string;
    height?: string;
    className?: string;
    defaultChecked?: boolean;
    disabled?: boolean;
    changeRadio?: Function;
    value: string;
    check?: boolean;
    size?: "small" | "big";
    style?: Object;
    children: React.ReactElement<any> | Array<React.ReactElement<any>>;
    onCheck: (value: string | RadioParams, checked: boolean) => void;
}

export interface RadioGroupState {
    groupValue: string | RadioParams;
}

class RadioGroup extends React.Component<RadioGroupProps, RadioGroupState> {
    constructor(props: RadioGroupProps) {
        super(props);
        this.state = {
            groupValue: this.props.value || "0",
        };
    }
    override componentDidUpdate() {
        if (this.props.value !== this.state.groupValue) {
            this.setState({
                groupValue: this.props.value,
            });
        }
    }
    onRadioChange = (value: string | RadioParams, checked: boolean) => {
        this.props.onCheck && this.props.onCheck(value, checked);
        const groupValue = typeof value === "string" ? value : value.value;
        if (checked) {
            this.setState(
                {
                    groupValue,
                },
                () => {
                    // console.log("this.state", this.state)
                }
            );
        }
    };
    override render() {
        const size = this.props.size ? this.props.size : "small";

        return (
            <StyledGroup style={this.props.style ? this.props.style : {}}>
                {React.Children.map<React.ReactNode, React.ReactElement<any>>(
                    this.props.children,
                    (radioChild, index) => {
                        if (radioChild && radioChild.type === Radio) {
                            return React.cloneElement(radioChild, {
                                size,
                                label: radioChild.props.label,
                                value: radioChild.props.value,
                                checked:
                                    radioChild.props.value ===
                                    this.state.groupValue,
                                changeRadio: (checked: boolean) =>
                                    this.onRadioChange(
                                        radioChild.props.value,
                                        checked
                                    ),
                                disabled: this.props.disabled
                                    ? this.props.disabled
                                    : radioChild.props.disabled,
                            });
                        }
                    }
                )}
            </StyledGroup>
        );
    }
}

export default RadioGroup;
