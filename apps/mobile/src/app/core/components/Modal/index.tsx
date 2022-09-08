import React from "react";
import ReactDOM from "react-dom";
import ModalPortal from "./ModalPortal";
import Modal, { IModalProps } from "./Modal";
import CustomModal from "./CustomModal";
import AppContext from "../AppContext";
import { AppThemeProvider } from "../index";

type ModalContentFunction<T> = (args: any) => T;
interface IModalWrapperProps {
    custom?: boolean;
    // content: (hide: () => void) => React.ReactElement;
    // content?: string | ModalContentFunction<any>;
    content?: any;
    show: boolean;

    mask: true;
    title?: string;
    confirmText?: string;
    onConfirm?: () => void;
    theme?: any;
}
type ModalWrapperProps = IModalWrapperProps & IModalProps;

class ModalWrapper extends React.Component<ModalWrapperProps> {
    static IDENTIFIER = "uni-modal-container";
    static modal: any[] = [];
    static actionsRef: any = React.createRef();
    constructor(props: ModalWrapperProps) {
        super(props);
        this.state = {};
    }
    render() {
        AppContext.dev && console.log("[ModalWrapper] this.props", this.props);
        return (
            <ModalPortal>
                {!this.props.custom ? (
                    <Modal {...this.props}></Modal>
                ) : (
                    <CustomModal
                        call={false}
                        show={this.props.show}
                        mask={this.props.mask}
                        content={this.props.content}
                    />
                )}
            </ModalPortal>
        );
    }
    static renderModalWrapperDOM(props: IModalWrapperProps, mode: string) {
        // NOTE: Modal List
        // const MODAL_ROOT_IDENTIFIER = "uni-modal-list";
        let modalRoot = document.querySelector(`.uni-modal-list`);
        if (!modalRoot) {
            modalRoot = document.createElement("div");
            modalRoot.className = "uni-modal-list";
            document.body.appendChild(modalRoot);
        }
        // NOTE: Portal Container
        const replacedModalContainer = document.createElement("div");
        replacedModalContainer.className = "uni-portal-container";
        replacedModalContainer.setAttribute(
            "uni-id",
            "uni-portal-container-" + Date.now()
        );
        // NOTE:  Modal List Append Portal Container
        modalRoot.appendChild(replacedModalContainer);
        ReactDOM.render(
            <ModalPortal
                // actionsRef={ModalWrapper.actionsRef}
                container={replacedModalContainer}
            >
                {mode !== "custom" ? (
                    <AppThemeProvider theme={props.theme}>
                        <Modal mode={mode} {...props} show={true}></Modal>
                    </AppThemeProvider>
                ) : (
                    <CustomModal
                        call={true}
                        mask={props.mask}
                        content={props.content}
                    ></CustomModal>
                )}
            </ModalPortal>,
            replacedModalContainer
        );
    }
    static alert(props: ModalWrapperProps) {
        ModalWrapper.renderModalWrapperDOM(props, "alert");
    }
    static confirm(props: ModalWrapperProps) {
        ModalWrapper.renderModalWrapperDOM(props, "confirm");
    }
    // Only one component all the time.
    static show(props: ModalWrapperProps) {
        console.log("[Modal] props", props);
        ModalWrapper.renderModalWrapperDOM(props, "custom");
    }
    // NOTICE: For non close window
    // static close() {
    // const globalModalClass = `uni-modal-static`;
    // console.log("[Modal] globalModalClass", globalModalClass);
    // const globalModalWrapper = document.querySelector(`.${globalModalClass}`)
    // globalModalWrapper.remove();
    // }
}

export default ModalWrapper;
