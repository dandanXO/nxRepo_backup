import React from 'react';
import styled from 'styled-components';
import RadioGroup from './RadioGroup';
import WithThemeRadioICON from './WithThemeRadioICON';
import formStateContext from '../formStateContext';

interface StyledRadioBoxProps {
  disabled?: boolean;
  children?: JSX.Element;
}

const StyledRadioBox = styled.div<StyledRadioBoxProps>`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 2px;
  padding: 2px;
  cursor: ${(props) => (!props.disabled ? 'pointer' : 'not-allowed')};
  margin: 0 5px 0 0;
`;

// NOTE: Can listen self event handler

export interface RadioOuterProps {
  value: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  changeRadio?: (checked: boolean) => void;
  size?: 'small' | 'big';
  checked?: boolean;
  children?: any;
}

// interface RadioDotProps {
//     Group: any
// }
export type RadioProps = RadioOuterProps;

export interface RadioState {
  check: boolean;
  hover: boolean;
}

const StyledRadioText = styled.span`
  padding-left: 5px;
`;

class Radio extends React.Component<RadioProps, RadioState> {
  // static Group: React.ReactNode = RadioGroup;
  static Group: any = RadioGroup;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  state = {
    check: false,
    hover: false,
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidMount() {
    this.setState({
      check: this.props.checked ? this.props.checked : false,
    });
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  componentDidUpdate(
    prevProps: Readonly<RadioProps>,
    prevState: Readonly<RadioState>,
    snapshot?: any
  ) {
    if (this.props.checked !== this.state.check) {
      this.setState({
        check: this.props.checked ? this.props.checked : false,
      });
    }
  }
  onCheck = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (this.props.disabled) return;
    if (this.props.defaultChecked) return;
    if (this.props.changeRadio) {
      this.props.changeRadio(!this.state.check);
    }
    this.setState(
      (state) => {
        return {
          check: !state.check,
        };
      },
      () => {
        // do nothing.
      }
    );
  };

  onMouseOver = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState(
      (state) => {
        return {
          hover: true,
        };
      },
      () => {
        // do nothing.
      }
    );
  };
  onMouseOut = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    this.setState(
      (state) => {
        return {
          hover: false,
        };
      },
      () => {
        // do nothing.
      }
    );
  };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  render() {
    return (
      <StyledRadioBox
        onClick={this.onCheck}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        disabled={this.props.disabled}
      >
        <React.Fragment>
          <WithThemeRadioICON
            checked={this.state.check}
            defaultChecked={this.props.defaultChecked}
            hover={this.state.hover}
            size={this.props.size ?? "small"}
            disabled={this.props.disabled}
          />
          <StyledRadioText>{this.props.children}</StyledRadioText>
        </React.Fragment>
      </StyledRadioBox>
    );
  }
}

Radio.contextType = formStateContext;

export { StyledRadioBox };
export default Radio;
