import React from 'react';
import styled from 'styled-components';
// import Modal from "./Modal";
import Overlay from './Overlay';
// import AppContext from "utils/AppContext";
import AppContext from '../AppContext';
// import CloseButton from "./CloseButton";

const CustomPopupContainer = styled.div`
  /* Center */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  /* Border */
  /* border: 1px solid rgba(0,0,0,.2); */
  /* border-radius: .3rem;     */

  /* Background */
  /* background: gray; */
  /* background-color: #fff;
    background-clip: padding-box;

    /* Content */
  max-width: 90%;
  max-height: 90%;
  overflow: hidden;
`;
// CustomModal.Popup = Popup;

export { CustomPopupContainer };
type ModalContentFunction<T> = (args: any) => T;

interface CustomModalProp {
  mask: boolean;
  // content: React.ReactElement;
  // content: (hide: () => void) => React.ReactElement;
  content?: string | ModalContentFunction<any>;
  call: boolean;
  // For JSX Component, Not Directly Call
  show?: boolean;
}
interface CustomModalState {
  show: boolean;
}
class CustomModal extends React.Component<CustomModalProp, CustomModalState> {
  static defaultProps = {
    mask: true,
  };
  constructor(props: CustomModalProp) {
    super(props);
    this.state = {
      show: props.show ? props.show : true,
    };
  }
  // @ts-ignore
  componentWillUnmount() {
    AppContext.dev && console.log('[CustomModal] componentWillUnmount');
  }
  // NOTE: For Call Method
  hide = () => {
    AppContext.dev && console.log('[CustomModal] hide');
    // hide
    this.setState({
      show: false,
    });
    // destory
  };
  // @ts-ignore
  render() {
    AppContext.dev && console.log('[CustomModal] this.props', this.props);
    // JSX
    if (!this.props.call && !this.props.show) {
      return null;
    }
    // Call Method
    if (this.props.call && !this.state.show) {
      return null;
    }
    return (
      <div className="uni-modal uni-modal-custom here">
        <Overlay mask={this.props.mask}>
          {/* Cannot know content */}
          {/* <CloseButton></CloseButton> */}
          <CustomPopupContainer>
            {/* {this.props.content} */}
            {/*// FIXME: this.props.content */}
            {!this.props.call && this.props.content && this.props.content}
            {this.props.call &&
              this.props.content &&
              typeof this.props.content === 'function' &&
              this.props.content(this.hide)}
          </CustomPopupContainer>
        </Overlay>
      </div>
    );
  }
}

export default CustomModal;
