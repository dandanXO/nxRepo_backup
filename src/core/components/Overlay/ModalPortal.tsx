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
    CONTAINER_IDENTIFIER: string = "uni-overlay-list";
    constructor(props: IModalPortal) {
        super(props);
        this.createContainerRoot();
        this.container = this.createContainer();
    }
    // FIXME: createContainerRoot
    createContainerRoot() {
        if (!this.props.container) {
            // NOTE: Modal Root
            if (!document.querySelector(`.${this.CONTAINER_IDENTIFIER}`)) {
                const modalRoot = document.createElement("div");
                modalRoot.className = this.CONTAINER_IDENTIFIER;
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
        const containerRoot = document.querySelector(`.${this.CONTAINER_IDENTIFIER}`);
        if (this.props.container) {
            containerRoot.removeChild(this.props.container);
        } else {
            containerRoot.removeChild(this.container);
        }
    }
    containerRootAddContainer() {
        const containerRoot = document.querySelector(`.${this.CONTAINER_IDENTIFIER}`);
        if (this.props.container) {
            containerRoot.appendChild(this.props.container);
        } else {
            containerRoot.appendChild(this.container);
        }
    }
    render() {
        if (this.props.container) {
            return ReactDOM.createPortal(this.props.children, this.props.container);
        } else {
            return ReactDOM.createPortal(this.props.children, this.container);
        }
    }
}

export default ModalPortal;
