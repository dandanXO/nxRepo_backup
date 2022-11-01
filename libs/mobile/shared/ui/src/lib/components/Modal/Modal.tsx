import React from 'react';
import Overlay from './Overlay';
import Popup from './Popup';
import CloseButton from './CloseButton';
import Title from './Title';
import Content from './Content';
import ControlGroup from './ControlGroup';
import MainIcon from './MainIcon';
import {
  CancelButton,
  ConfirmButton,
  CustomColorButton,
  NotificationButton,
} from './DefaultButtons';
import AppContext from '../AppContext';
import Horizontal from './Horizontal';
import styled from 'styled-components';

const Header = styled.div`
  padding: 0 12px;
`;
type ModalContentFunction<T> = (args: any) => T;

interface IModalProps {
  show?: boolean;
  mask?: boolean;
  mode?: string;
  type?: string;
  title?: string;
  content?: string | ModalContentFunction<any>;
  confirmText?: string;
  confirmColor?: string;
  onConfirm?: () => void;
  cancelText?: string;
  cancelColor?: string;
  onCancel?: () => void;
  customButtons?: React.ReactElement;
  width?: number;
  maskClosable?: boolean;
  enableClose?: boolean;
  enableIcon?: boolean;
  enableTitleHorizontal?: boolean;
}
interface ModalState {
  show: boolean;
}
class Modal extends React.Component<IModalProps, ModalState> {
  // static propTypes = {
  //     show: PropTypes.bool,
  //     mask: PropTypes.bool,
  //     mode: PropTypes.string,
  //     type: PropTypes.string,
  //     title: PropTypes.string,
  //     content: PropTypes.string,
  //     confirmText: PropTypes.string,
  //     onConfirm: PropTypes.func,
  //     cancelText: PropTypes.string,
  //     onCancel: PropTypes.func,
  //     customButtons: PropTypes.element,
  //     maskClosable: PropTypes.bool,
  // };
  static defaultProps = {
    show: false,
    mask: true,
    mode: 'alert',
    type: 'confirm',
    confirmText: '确认',
    cancelText: '取消',
    maskClosable: true,
    enableClose: false,
    enableIcon: true,
  };
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      show: props.show ? props.show : false,
    };
  }
  componentDidUpdate(prevProps: IModalProps, prevState: ModalState) {
    if (prevProps != this.props) {
      this.setState({
        show: this.props.show ? this.props.show : false,
      });
    }
  }
  hidden = () => {
    this.setState({
      show: false,
    });
  };
  render() {
    if (!this.state.show) return null;
    AppContext.dev && console.log('this.props', this.props);
    return (
      <div className= "uni-modal">
        <Overlay
          mask={this.props.mask ? this.props.mask : false}
          // onClick={(event) => {
          //     event.stopPropagation();
          //     console.log("Overlay click")
          //     if(this.props.maskClosable) {
          //         this.hidden();
          //         this.props.onCancel && this.props.onCancel();
          //     }
          // }}
        >
          <Popup width={this.props.width}>
            {this.props.enableClose && (
              <div
                onClick={() => {
                  this.hidden();
                  this.props.onCancel && this.props.onCancel();
                }}
              >
                <CloseButton></CloseButton>
              </div>
            )}
            {this.props.enableIcon && (
              <MainIcon
                type={this.props.type ? this.props.type : 'confirm'}
              ></MainIcon>
            )}
            <Header>
              <Title>{this.props.title}</Title>
              {this.props.enableTitleHorizontal && <Horizontal />}
            </Header>
            <Content>
              {typeof this.props.content === 'string' ? (
                <div
                  style={{
                    width: this.props.width,
                    padding: '0px 20px',
                  }}
                  dangerouslySetInnerHTML={{
                    __html: this.props.content,
                  }}
                ></div>
              ) : (
                typeof this.props.content === 'object' && this.props.content
              )}
            </Content>
            <ControlGroup>
              {/* NOTE: 預設模式*/}
              {(typeof this.props.mode === 'undefined' ||
                this.props.mode === null ||
                this.props.mode === 'alert') &&
                (typeof this.props.confirmColor !== 'undefined' &&
                this.props.confirmColor !== null ? (
                  <CustomColorButton
                    color={this.props.confirmColor}
                    onClick={() => {
                      this.hidden();
                      this.props.onConfirm && this.props.onConfirm();
                    }}
                  >
                    {this.props.confirmText}
                  </CustomColorButton>
                ) : (
                  <NotificationButton
                    onClick={() => {
                      this.hidden();
                      this.props.onConfirm && this.props.onConfirm();
                    }}
                  >
                    {this.props.confirmText}
                  </NotificationButton>
                ))}
              {this.props.mode === 'confirm' && (
                <React.Fragment>
                  {/* NOTE: Custom Confirm */}
                  {this.props.mode === 'confirm' &&
                  typeof this.props.confirmColor !== 'undefined' &&
                  this.props.confirmColor !== null ? (
                    <CustomColorButton
                      color={this.props.confirmColor}
                      onClick={() => {
                        this.hidden();
                        this.props.onConfirm && this.props.onConfirm();
                      }}
                    >
                      {this.props.confirmText}
                    </CustomColorButton>
                  ) : (
                    <ConfirmButton
                      onClick={() => {
                        this.hidden();
                        this.props.onConfirm && this.props.onConfirm();
                      }}
                    >
                      {this.props.confirmText}
                    </ConfirmButton>
                  )}
                  {/* NOTE: Custom Cancel */}
                  {this.props.mode === 'confirm' &&
                  typeof this.props.cancelColor !== 'undefined' &&
                  this.props.cancelColor !== null ? (
                    <CustomColorButton
                      color={this.props.cancelColor}
                      onClick={() => {
                        this.hidden();
                        this.props.onCancel && this.props.onCancel();
                      }}
                    >
                      {this.props.cancelText}
                    </CustomColorButton>
                  ) : (
                    <CancelButton
                      onClick={() => {
                        this.hidden();
                        this.props.onCancel && this.props.onCancel();
                      }}
                    >
                      {this.props.cancelText}
                    </CancelButton>
                  )}
                  {/* NOTE: Default Confirm, Cancel */}
                  {this.props.mode === 'confirm' &&
                    typeof this.props.confirmColor === 'undefined' &&
                    this.props.confirmColor === null &&
                    typeof this.props.cancelColor === 'undefined' &&
                    this.props.cancelColor === null && (
                      <>
                        <ConfirmButton
                          onClick={() => {
                            this.hidden();
                            this.props.onConfirm && this.props.onConfirm();
                          }}
                        >
                          {this.props.confirmText}
                        </ConfirmButton>
                        <CancelButton
                          onClick={() => {
                            this.hidden();
                            this.props.onCancel && this.props.onCancel();
                          }}
                        >
                          {this.props.cancelText}
                        </CancelButton>
                      </>
                    )}
                </React.Fragment>
              )}

              {typeof this.props.customButtons !== 'undefined' &&
                this.props.customButtons !== null &&
                this.props.customButtons}
            </ControlGroup>
          </Popup>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
export type { IModalProps };
// export {
//     ConfirmButton,
//     CancelButton,
// }
