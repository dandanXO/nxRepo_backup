import React from 'react';
import AppContext from '../AppContext';
import Overlay from '../Modal/Overlay';
import Popup from '../Modal/Popup';
import CloseButton from '../Modal/CloseButton';
import Content from '../Modal/Content';
import styled from 'styled-components';

const ModalPopup = styled(Popup)<{overflow?: string}>`
  justify-content: flex-start;
  overflow: ${props => props.overflow ? props.overflow : "auto"};
`;
const ModalContent = styled(Content)`
  margin: 0;
`;

const ModalClose = styled.div`
position: static;
z-index: 999;
`;

type ModalContentFunction<T> = (args: any) => T;
interface IModalProps {
  show?: boolean;
  mask?: boolean;
  type?: string;
  title?: string;
  // content?: JSX.Element
  content?: string | ModalContentFunction<any>;
  width?: number;
  height?: number;
  maskClosable?: boolean;
  enableClose?: boolean;
  enableTitleHorizontal?: boolean;
  onCancel?: () => void;
  contentNoStyle?: boolean;
  overflow?: string;
}
interface ModalState {
  show: boolean;
}
class Modal extends React.Component<IModalProps, ModalState> {
  // static propTypes = {
  //     show: PropTypes.bool,
  //     mask: PropTypes.bool,
  //     type: PropTypes.string,
  //     title: PropTypes.string,
  //     content: PropTypes.string,
  //     maskClosable: PropTypes.bool,
  //     enableClose: PropTypes.bool,
  //     enableTitleHorizontal: PropTypes.bool,
  // };
  static defaultProps = {
    show: false,
    mask: true,
    maskClosable: true,
  };
  constructor(props: IModalProps) {
    super(props);
    this.state = {
      show: props.show ? props.show : false,
    };
  }
  // @ts-ignore
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
  // @ts-ignore
  render() {
    if (!this.state.show) return null;
    AppContext.dev && console.log('this.props', this.props);
    return (
      <div className="uni-modal">
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
          <ModalPopup width={this.props.width} height={this.props.height} overflow={this.props.overflow}>
            {this.props.enableClose && (
              <ModalClose
                onClick={() => {
                  console.log('close');
                  this.hidden();
                  this.props.onCancel && this.props.onCancel();
                }}
              >
                <CloseButton />
              </ModalClose>
            )}
            {/*<div>*/}
            {/*    <Title>{this.props.title}</Title>*/}
            {/*    {this.props.enableTitleHorizontal && (*/}
            {/*        <Horizontal/>*/}
            {/*    )}*/}
            {/*</div>*/}
            <ModalContent contentNoStyle={this.props.contentNoStyle}>
              {this.props.content &&
                typeof this.props.content === 'string' &&
                this.props.content}
              {this.props.content &&
                typeof this.props.content === 'function' &&
                this.props.content(this.hidden)}
            </ModalContent>
          </ModalPopup>
        </Overlay>
      </div>
    );
  }
}

export default Modal;
export type { IModalProps };
