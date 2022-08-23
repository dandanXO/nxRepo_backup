import React from "react";
import ReactDOM from "react-dom";

interface IModalPortal {
    actionsRef?: any;
    container?: any;
    children?: any;
}
class ModalPortal extends React.Component<IModalPortal> {
    // modalContainer: HTMLDivElement;
    container: HTMLDivElement;
    CONTAINER_IDENTIFIER: string = "uni-modal-list";
    constructor(props: IModalPortal) {
        super(props);
        this.createContainerRoot();
        this.container = this.createContainer();
    }
    // FIXME: createContainerRoot
    createContainerRoot() {
        if (!this.props.container) {
            // NOTE: Modal Root
            if (!document.querySelector(`.uni-modal-list`)) {
                const modalRoot = document.createElement("div");
                modalRoot.className = "uni-modal-list";
                document.body.appendChild(modalRoot);
            }
        }
    }
    createContainer() {
        // NOTE: Modal Container
        const container = document.createElement("div");
        container.className = "uni-portal-container";
        return container;
    }
    componentDidMount() {
        this.containerRootAddContainer();
    }
    componentWillUnmount() {
        this.containerRootRemoveContainer();
    }
    containerRootRemoveContainer() {
        const containerRoot = document.querySelector(`.uni-modal-list`);
        if (this.props.container) {
            containerRoot.removeChild(this.props.container);
        } else {
            containerRoot.removeChild(this.container);
        }
    }
    containerRootAddContainer() {
        const containerRoot = document.querySelector(`.uni-modal-list`);
        if (this.props.container) {
            containerRoot.appendChild(this.props.container);
        } else {
            containerRoot.appendChild(this.container);
        }
    }
    render() {
        if (this.props.container) {
            return ReactDOM.createPortal(
                this.props.children,
                this.props.container
            );
        } else {
            return ReactDOM.createPortal(this.props.children, this.container);
        }
    }
}

export default ModalPortal;
