import React from "react";

interface MouseDetectProps {
    width?: string;
    height?: string;
    className?: string;
    children: React.ReactNode;
    scrollbarControlRef: any;
    pageOffset: number;
    // Event
    mouseWheel?: (event: React.WheelEvent<HTMLDivElement>) => void;
    mouseOver?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    mouseOut?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    mouseEnter?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    mouseLeave?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
class MouseDetect extends React.Component<MouseDetectProps> {
    containerRef: React.RefObject<any>;
    constructor(props: MouseDetectProps) {
        super(props);
        this.containerRef = React.createRef();
        // if (!this.props.mouseWheel) {
        //     this.mouseWheel = this.mouseWheel.bind(this);
        // }
        // if (!this.props.mouseOver) {
        //     this.mouseOver = this.mouseOver.bind(this);
        // }
        // if (!this.props.mouseOut) {
        //     this.mouseOut = this.mouseOut.bind(this);
        // }
        // if (!this.props.mouseEnter) {
        //     this.mouseEnter = this.mouseEnter.bind(this);
        // }
        // if (!this.props.mouseLeave) {
        //     this.mouseLeave = this.mouseLeave.bind(this);
        // }
    }
    // @ts-ignore
    componentDidMount() {
        // if (this.props.mouseWheel) {
        //     this.containerRef.current.addEventListener("mousewheel", this.props.mouseWheel, false);
        // } else {
        //     this.containerRef.current.addEventListener("mousewheel", this.mouseWheel, false);
        // }
        // if (this.props.mouseOver) {
        //     this.containerRef.current.addEventListener("mouseover", this.props.mouseOver, false);
        // } else {
        //     this.containerRef.current.addEventListener("mouseover", this.mouseOver, false);
        // }
        // if (this.props.mouseOut) {
        //     this.containerRef.current.addEventListener("mouseout", this.props.mouseOut, false);
        // } else {
        //     this.containerRef.current.addEventListener("mouseout", this.mouseOut, false);
        // }
        // if (this.props.mouseEnter) {
        //     this.containerRef.current.addEventListener("mouseenter", this.props.mouseEnter, false);
        // } else {
        //     this.containerRef.current.addEventListener("mouseenter", this.mouseEnter, false);
        // }
        // if (this.props.mouseLeave) {
        //     this.containerRef.current.addEventListener("mouseleave", this.props.mouseLeave, false);
        // } else {
        //     this.containerRef.current.addEventListener("mouseleave", this.mouseLeave, false);
        // }
    }
    // @ts-ignore
    componentWillUnmount() {
        // if (this.props.mouseWheel) {
        //     this.containerRef.current.removeEventListener("mousewheel", this.props.mouseWheel, false);
        // } else {
        //     this.containerRef.current.removeEventListener("mousewheel", this.mouseWheel, false);
        // }
        // if (this.props.mouseOver) {
        //     this.containerRef.current.removeEventListener("mouseover", this.props.mouseOver, false);
        // } else {
        //     this.containerRef.current.removeEventListener("mouseover", this.mouseOver, false);
        // }
        // if (this.props.mouseOut) {
        //     this.containerRef.current.removeEventListener("mouseout", this.props.mouseOut, false);
        // } else {
        //     this.containerRef.current.removeEventListener("mouseout", this.mouseOut, false);
        // }
        // if (this.props.mouseEnter) {
        //     this.containerRef.current.removeEventListener("mouseenter", this.props.mouseEnter, false);
        // } else {
        //     this.containerRef.current.removeEventListener("mouseenter", this.mouseEnter, false);
        // }
        // if (this.props.mouseLeave) {
        //     this.containerRef.current.removeEventListener("mouseleave", this.props.mouseLeave, false);
        // } else {
        //     this.containerRef.current.removeEventListener("mouseleave", this.mouseLeave, false);
        // }
    }
    mouseWheel(event: React.WheelEvent<HTMLDivElement>) {
        // scrollBy content position
        const scrollTop = event.deltaY * this.props.pageOffset;
        this.props.scrollbarControlRef.instance.scrollBy({
            top: scrollTop,
        });
        this.props.mouseWheel && this.props.mouseWheel(event);
    }
    mouseOver(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // console.log("mouseOver.event", event);
        this.props.mouseOver && this.props.mouseOver(event);
    }
    mouseOut(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // console.log("mouseOut.event", event);
        this.props.mouseOut && this.props.mouseOut(event);
    }

    mouseEnter(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // console.log("mouseEnter.event", event);
        this.props.mouseEnter && this.props.mouseEnter(event);
    }
    mouseLeave(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        // console.log("mouseLeave.event", event);
        this.props.mouseLeave && this.props.mouseLeave(event);
    }

    // @ts-ignore
    render() {
        return (
            <div
                className="mouseDetect"
                ref={this.containerRef}
                style={
                    {
                        // visibility: this.props.visibility ? "visible" : "hidden",
                        // display: this.props.visibility ? "block" : "none",
                    }
                }
                onWheel={(e: React.WheelEvent<HTMLDivElement>) => this.mouseWheel(e)}
                onMouseOver={(e: React.MouseEvent<HTMLDivElement>) => this.mouseOver(e)}
                onMouseOut={(e: React.MouseEvent<HTMLDivElement>) => this.mouseOut(e)}
                onMouseEnter={(e: React.MouseEvent<HTMLDivElement>) => this.mouseEnter(e)}
                onMouseLeave={(e: React.MouseEvent<HTMLDivElement>) => this.mouseLeave(e)}
            >
                {this.props.children}
            </div>
        );
    }
}
export default MouseDetect;
