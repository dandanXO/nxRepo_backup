import React from "react";
import ReactDOM from "react-dom";
import ModalPortal from "./ModalPortal";
import Modal, { IModalProps } from "./Modal";
import AppContext from "../AppContext";

type ModalContentFunction<T> = (args: any) => T;
interface IModalWrapperProps {
    content: (hide: () => void) => React.ReactElement;
    // content?: string | ModalContentFunction<any>;
    show: boolean;
}

type ModalWrapperProps = IModalWrapperProps & IModalProps;

class Overlay extends React.Component<ModalWrapperProps> {
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
                <Modal {...this.props} />
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
                <Modal {...props} show={true}></Modal>
            </ModalPortal>,
            replacedModalContainer
        );
    }
    static alert(props: ModalWrapperProps) {
        Overlay.renderModalWrapperDOM(props, "alert");
    }
    static confirm(props: ModalWrapperProps) {
        Overlay.renderModalWrapperDOM(props, "confirm");
    }
    // Only one component all the time.
    static show(props: ModalWrapperProps) {
        console.log("[Modal] props", props);
        Overlay.renderModalWrapperDOM(props, "custom");
    }
    // NOTICE: For non close window
    // static close() {
    // const globalModalClass = `uni-modal-static`;
    // console.log("[Modal] globalModalClass", globalModalClass);
    // const globalModalWrapper = document.querySelector(`.${globalModalClass}`)
    // globalModalWrapper.remove();
    // }
}

export default Overlay;
