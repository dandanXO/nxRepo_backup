import React, {Component, ReactNode} from "react";
import cx from "classnames";
import MouseDetect from "./MouseDetect";
import ScrollBar from "./ScrollBar";
import ScrollContainer from "./ScrollContainer";
import ScrollTrack from "./ScrollTrack";
import {ThemeModuleSkinType} from "../type/module";
import {withTheme} from "styled-components";
import {omit} from "ramda";
export {InfiniteScrollInstanceInterface} from "./infiniteScroll.type";

const MIN_BAR_HEIGHT = 20;
// 禁止 window 滾動
let scrollTop: number;
let scrollLeft: number;

function disableWindowScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
        // refactor after horizontall scroll bar finished PF-18518
        window.scrollTo({
            top: scrollTop,
        });
        // window.scrollTo(scrollLeft, scrollTop);
    };
}
function enableWindowScroll() {
    window.onscroll = function () {};
}

export type InfiniteScrollThemeType = "dark" | "blend-dark" | string;

export interface InfiniteScrollProps {
    children: React.ReactElement[] | React.ReactElement;
    width: string;
    height: string;
    threshold?: number;
    onScroll?: (options: {reachedTop: boolean; reachedBottom: boolean}) => void;
    expand?: boolean;
    barWidth?: string;
    overScroll?: boolean;
    className?: string;
    themeColor?: string;
    theme: {
        mode: ThemeModuleSkinType;
    };
    barColor?: string;
    // Default: div
    element?: string;
    alwaysShowBar?: boolean;
    customScrollChildrenClassName?: string;

    delta?: number;
}

type InfiniteScrollInterface = InfiniteScrollProps & {
    innerRef?: any;
};

interface InfiniteScrollStates {
    initBar: boolean;
    barHeight: number;
    barTop: number;
    // MouseOver ScrollBar
    overBar: boolean;
    showBar: boolean;
}
class InfiniteScroll extends Component<InfiniteScrollInterface, InfiniteScrollStates> {
    static defaultProps = {
        // element: "div",
        loader: null,
        // Outter Property
        width: "100%",
        height: "100%",
        threshold: 0,
        // expand: false,
        // barWidth: "7px",
        // overScroll: false,
    };

    // Reference
    scrollTrackRef: React.RefObject<any> | null;
    scrollBarDomRef: React.MutableRefObject<any>;
    lastDragTopPositionRef: number;
    contentRef: React.RefObject<any> | null;

    // Constant
    dragFromScrollBarRef: boolean;
    bindEventHandler: boolean;

    scrollParentRef: HTMLElement | null;
    scrollComponent: HTMLElement | null;
    infiniteScrollNode: HTMLElement | null;
    scrollbarControlRef: HTMLElement | null;

    constructor(props: InfiniteScrollInterface) {
        super(props);
        this.state = {
            initBar: false,
            barHeight: 0,
            barTop: 0,
            // MouseOver ScrollBar
            overBar: false,
            showBar: false,
        };
        // Reference
        this.scrollTrackRef = React.createRef();
        this.scrollBarDomRef = React.createRef();
        this.contentRef = React.createRef();

        // Constant
        this.scrollParentRef = null;
        this.scrollComponent = null;
        this.infiniteScrollNode = null;
        this.scrollbarControlRef = null;

        this.dragFromScrollBarRef = false;
        this.bindEventHandler = false;
        this.lastDragTopPositionRef = 0;
    }
    componentDidMount() {
        // NOTE: isPassiveSupported
        // this.options = this.eventListenerOptions();
        this.update();
    }
    componentDidUpdate(prevProps: InfiniteScrollInterface) {
        if (this.props.children !== prevProps.children) {
            this.update();
        }
    }
    componentWillUnmount() {
        this.detachEventHandler();
    }
    // eventListenerOptions = () => {
    //     let options = false;
    //     if (this.isPassiveSupported()) {
    //         options = {
    //             useCapture: false,
    //             passive: true,
    //         };
    //     }
    //     return options;
    // };
    isPassiveSupported() {
        let passive = false;
        const testOptions = {
            get passive() {
                passive = true;
                return passive;
            },
        };
        try {
            document.addEventListener("test", () => {}, testOptions);
            document.removeEventListener("test", () => {});
        } catch (e) {
            // ignore
        }
        return passive;
    }
    attachEventHandler = () => {
        if (this.bindEventHandler) {
            return;
        } else {
            this.attachWindowListener();
            this.attachScrollListener();
            // this.attachMousewheelListener();
            this.bindEventHandler = true;
        }
    };
    detachEventHandler = () => {
        if (this.bindEventHandler) {
            this.detachWindowListener();
            this.detachScrollListener();
            // this.detachMousewheelListener();
        } else {
            return;
        }
    };

    getParentElement = (el: HTMLElement) => {
        const scrollParent = this.scrollParentRef;
        if (scrollParent != null) {
            return scrollParent as HTMLElement;
        }
        return el && (el.parentNode as HTMLElement);
    };

    // window
    attachWindowListener = () => {
        // NOTICE: Add ScrollTracking, ScrollBar mouseOver, mouseOut
        window.addEventListener("mousedown", this.windowMouseDown, false);
        window.addEventListener("mouseup", this.windowMouseUp, false);
        // window.addEventListener("mousewheel", this.windowWheel, false);
    };
    detachWindowListener = () => {
        window.removeEventListener("mousedown", this.windowMouseDown, false);
        window.removeEventListener("mouseup", this.windowMouseUp, false);
        // window.removeEventListener("mousewheel", this.windowWheel, false);
    };
    windowMouseDown = (event: Event) => {
        const target = event.target as Element;
        const wheelEvent = event as WheelEvent;

        if (typeof target.className === "string" && target.className.includes("scrollBar")) {
            this.dragFromScrollBarRef = true;
            this.lastDragTopPositionRef = wheelEvent.clientY;
        }
    };
    windowMouseUp = () => {
        if (this.dragFromScrollBarRef) {
            this.dragFromScrollBarRef = false;
        }
    };
    // windowWheel = event => {
    // };
    attachScrollListener = () => {
        if (!this.scrollComponent) return;
        const scrollContentParentNode = this.getParentElement(this.scrollComponent);
        if (!scrollContentParentNode) return;
        // 禁止 window 滾動
        disableWindowScroll();

        scrollContentParentNode.addEventListener("scroll", this.scrollListener, false);
        scrollContentParentNode.addEventListener("resize", this.scrollListener, false);
    };
    detachScrollListener = () => {
        if (!this.scrollComponent) return;
        const scrollContentParentNode = this.getParentElement(this.scrollComponent);
        if (!scrollContentParentNode) return;

        // 允許 window 滾動
        enableWindowScroll();
        scrollContentParentNode.removeEventListener("scroll", this.scrollListener, false);
        scrollContentParentNode.removeEventListener("resize", this.scrollListener, false);
    };

    scrollListener = () => {
        if (!this.infiniteScrollNode) return;
        const offset =
            this.infiniteScrollNode.scrollHeight - this.infiniteScrollNode.scrollTop - this.infiniteScrollNode.clientHeight;
        const {barHeight, barTop} = this.getBarData();
        this.setState({
            barHeight,
            barTop,
        });

        // 1. On reached top
        if (this.infiniteScrollNode.scrollTop === 0) {
            this.props.onScroll &&
                this.props.onScroll({
                    reachedTop: true,
                    reachedBottom: false,
                });
        } else if (
            (offset <= Number(this.props.threshold) && this.scrollComponent && this.scrollComponent.offsetParent !== null) ||
            // FIX float this.infiniteScrollNode.scrollTop
            Math.floor(offset) === 0
        ) {
            // 2. On reached bottom
            this.props.onScroll &&
                this.props.onScroll({
                    reachedTop: false,
                    reachedBottom: true,
                });
        } else {
            // 3. Else situation
            this.props.onScroll &&
                this.props.onScroll({
                    reachedTop: false,
                    reachedBottom: false,
                });
        }
    };
    // MouseWheel
    // attachMousewheelListener = () => {
    //     if (!this.scrollComponent) return;
    //     const scrollEl = this.getParentElement(this.scrollComponent);
    //     if (!scrollEl) return;
    //     scrollEl.addEventListener("mousewheel", this.mousewheelListener, false);
    // };

    // detachMousewheelListener = () => {
    //     if (!this.scrollComponent) {
    //         return;
    //     }
    //     const scrollEl = this.scrollComponent.parentNode;
    //     if (!scrollEl) return;
    //     scrollEl.removeEventListener("mousewheel", this.mousewheelListener, false);
    // };

    // mousewheelListener = (event: WheelEvent) => {
    //     // Prevents Chrome hangups
    //     // See: https://stackoverflow.com/questions/47524205/random-high-content-download-time-in-chrome/47684257#47684257
    //     if (event.deltaY === 1 && !this.isPassiveSupported()) {
    //         event.preventDefault();
    //     }
    // };

    // Other
    // filterProps = props => {
    //     return props;
    // };

    getScrollBarMovingDelta = (delta: number) => {
        if (this.props.delta) {
            return delta > 0 ? this.props.delta : -this.props.delta;
        } else {
            return delta > 0 ? 4 : -4;
        }
    };
    // REFACTORING: scrollTrackingMouseWheel, scrollTrackingMouseWheelForNative
    scrollTrackingMouseWheel = (event: React.WheelEvent<HTMLElement>) => {
        // NOTICE: TO prevent Window defalt ScrollEventHandler
        // REFACTORING: No work
        // event.stopPropagation();

        // NOTICE: Unable to preventDefault inside passive event listener due to target being treated as passive
        // event.preventDefault();
        const el = this.scrollComponent;
        if (!el) return;
        const parentNode = this.getParentElement(el);
        const pageOffset = parentNode.scrollHeight / parentNode.clientHeight;
        // const DeltaY = event.deltaY;
        //NOTE: Window, Chrome 滾動一次有 +- 100。
        // const DeltaY = event.deltaY > 0 ? 4 : -4;
        const DeltaY = this.getScrollBarMovingDelta(event.deltaY);
        this.props.innerRef.current.instance.scrollBy({top: DeltaY * pageOffset});
    };

    // NOTICE: MouseEvent
    scrollTrackingMouseWheelForNative = (event: React.WheelEvent<HTMLDivElement>) => {
        // NOTICE: TO prevent Window defalt ScrollEventHandler
        // REFACTORING: No work
        // event.stopPropagation();

        // NOTICE: Unable to preventDefault inside passive event listener due to target being treated as passive
        // event.preventDefault();

        const el = this.scrollComponent;
        if (!el) return;
        const parentNode = this.getParentElement(el);
        const pageOffset = parentNode.scrollHeight / parentNode.clientHeight;
        // const DeltaY = event.deltaY;
        //NOTE: Window, Chrome 滾動一次有 +- 100。
        const DeltaY = event.deltaY > 0 ? 4 : -4;
        this.props.innerRef.current.instance.scrollBy({top: DeltaY * pageOffset});
    };

    scrollTrackingMouseOver = (e: React.MouseEvent<HTMLDivElement>) => {
        // console.log("scrollTrackingMouseOver.e", e);
        this.setState({
            overBar: true,
        });
    };
    scrollTrackingMouseOut = (e: React.MouseEvent<HTMLDivElement>) => {
        // console.log("scrollTrackingMouseOut.e", e);
        this.setState({
            overBar: false,
        });
    };
    scrollTrackingMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        // console.log("scrollTrackingMouseEnter.e", e);
        this.setState({
            overBar: true,
        });
    };
    scrollTrackingMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        // console.log("scrollTrackingMouseLeave.e", e);
        this.setState({
            overBar: false,
        });
    };

    // getElementMargin = element => {
    //     var targetStyle = window.getComputedStyle(element, null);
    //     let elMarginHeight =
    //         parseFloat(targetStyle.marginTop.split("px")[0]) + parseFloat(targetStyle.marginBottom.split("px")[0]);
    //
    //     this.elMarginTop = parseFloat(targetStyle.marginTop.split("px")[0]);
    //     this.elMarginBottom = parseFloat(targetStyle.marginBottom.split("px")[0]);
    //     return elMarginHeight;
    // };

    onScrollContentMouseOver = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!this.dragFromScrollBarRef) {
            return;
        }
        // Memorize lastDragTop
        this.lastDragTopPositionRef = event.clientY;
    };
    onScrollContentMouseMove = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (!this.dragFromScrollBarRef) {
            return;
        }

        let distance = this.lastDragTopPositionRef - event.clientY;
        if (distance < 0) {
            // pull down
            distance = Math.abs(distance);
        } else {
            distance = -distance;
        }
        // Memorize lastDragTop
        this.lastDragTopPositionRef = event.clientY;

        // Set Scroll Content position
        if (!this.scrollParentRef) return;
        const pageOffset = this.scrollParentRef.scrollHeight / this.scrollParentRef.clientHeight;
        const scrollTop = distance * pageOffset;
        this.props.innerRef.current.instance.scrollBy({
            top: scrollTop,
        });
    };
    onScrollContentMouseLeave = () => {
        if (!this.dragFromScrollBarRef) {
            return;
        }
        this.dragFromScrollBarRef = false;
    };

    getBarData = () => {
        if (!this.infiniteScrollNode) {
            return {
                barHeight: 0,
                barTop: 0,
                showBar: false,
            };
        }
        const pageOffset = this.infiniteScrollNode.scrollHeight / this.infiniteScrollNode.clientHeight;
        let barHeight = this.infiniteScrollNode.clientHeight / pageOffset;
        barHeight = barHeight < MIN_BAR_HEIGHT ? MIN_BAR_HEIGHT : barHeight;
        let barTop = this.infiniteScrollNode.scrollTop / pageOffset;
        if (barTop + barHeight >= this.infiniteScrollNode.clientHeight) {
            barTop = this.infiniteScrollNode.clientHeight - barHeight;
        }
        if (pageOffset < 1) {
            barHeight = 0;
            barTop = 0;
        }
        // 10 is hardcode fix later
        const fixShowBar = this.infiniteScrollNode.scrollHeight - this.infiniteScrollNode.clientHeight <= 10;
        const barContainerHeight = this.infiniteScrollNode.getBoundingClientRect().height;
        const equalHeight = pageOffset === 1;
        const showBar = fixShowBar ? !fixShowBar : !equalHeight;
        return {
            barHeight,
            barTop,
            showBar,
        };
    };
    update = () => {
        // Get BarHeight/ BarTop
        // NOTICE:  In the beginning, el.scrollHeight is 0
        if (!this.scrollComponent || this.scrollComponent.childNodes.length <= 0) {
            return;
        }

        this.infiniteScrollNode = this.getParentElement(this.scrollComponent);

        const {barHeight, barTop, showBar} = this.getBarData();

        this.setState({
            barHeight,
            barTop,
            showBar,
        });

        this.attachEventHandler();
    };
    getScrollContainerBackgroundStyle() {
        // if (theme === "dark") {
        //     return {
        //         backgroundImage: "linear-gradient(to bottom, rgba(28, 35, 41, 0.5), rgba(28, 35, 41, 0.5)), linear-gradient(to bottom, #1c2329, #1c2329)",
        //     };
        // } else if (theme === "blend-dark") {
        //     return {
        //         backgroundBlendMode: "overlay",
        //         backgroundImage: "linear-gradient(to bottom, rgba(28, 35, 41, 0.5), rgba(28, 35, 41, 0.5)), linear-gradient(to bottom, #1c2329, #1c2329)",
        //     };
        // } else if (themeColor) {
        //     return {
        //         background: `${themeColor}`,
        //     };
        // }
        // if (theme.mode === "early") {
        //     return {};
        // } else if (theme.mode === "night") {
        //     return {};
        // }
        return {};
    }
    getScrollBarColor() {
        return this.props.barColor;
    }

    // Render Components
    renderScrollContentComponent() {
        const {element = "div", children, overScroll = false} = this.props;
        // NOTICE: Content Ref
        type ElementPropsInterface = Omit<
            InfiniteScrollProps,
            "onScroll | threshold | innerRef | barWidth | expand | themeColor | overScroll"
        > & {ref: any; style?: {}};
        const newElementProps = omit(
            [
                "onScroll",
                "threshold",
                "innerRef",
                "barWidth",
                "expand",
                "themeColor",
                "overScroll",
                "customScrollChildrenClassName",
            ],
            this.props
        );

        const ScrollWrapperClassName = "infinite-scroll-wrapper";
        const ScrollChildrenClassName = "infinite-scroll-children";

        // New Element Props
        const elementProps: ElementPropsInterface = {
            ...newElementProps,
            ref: this.getScrollContentRef,
            className: ScrollWrapperClassName,
        };

        // Children Style
        const childrenStyle = {
            // paddingRight: "18px",
            // NOTE: 在 Table 內側
            width: overScroll ? "100%" : "calc(100% - 18px)",
            overflow: "hidden",
            display: "table",
        };

        if (!children) return;

        let newChildren: ReactNode = null;

        if (!Array.isArray(newChildren)) {
            // single children
            newChildren = children;
            // REFACTORING:
            // elementProps.className = ScrollChildrenClassName + children.className;
            elementProps.className = ScrollChildrenClassName + " " + this.props.customScrollChildrenClassName;
            elementProps.style = childrenStyle;
        } else {
            // multi children
            newChildren = (
                <div className={ScrollChildrenClassName} style={childrenStyle}>
                    {children}
                </div>
            );
        }
        const childrenArray: ReactNode[] = [newChildren];
        return React.createElement(element, elementProps, childrenArray);
    }

    // 取得相關 Reference

    // DOM Tree
    // infinite-scroll
    // - infinite-scroll-wrapper
    //   - infinite-scroll-children

    // class="infinite-scroll
    settingScrollParentRef = (ref: HTMLElement) => {
        if (!ref) {
            return;
        }
        // ScrollParentRef
        this.scrollParentRef = ref;
        this.props.innerRef.current = {
            infiniteScrollRef: this.scrollParentRef,
            instance: {
                scrollHeight: () => {
                    return this.props.innerRef.current.infiniteScrollRef.scrollHeight;
                },
                scrollBy: ({top, left}: {top?: number; left?: number}) => {
                    if (!this.props.innerRef.current.infiniteScrollRef) {
                        // AppContext.dev && console.error("not this.props.innerref.current.infiniteScrollRef")
                        return;
                    } else {
                        if (top) {
                            this.props.innerRef.current.infiniteScrollRef.scrollTop += top;
                        }
                        if (left) {
                            this.props.innerRef.current.infiniteScrollRef.scrollLeft += left;
                        }
                    }
                },

                scroll: ({top, left}: {top?: number; left?: number}) => {
                    if (!this.props.innerRef.current.infiniteScrollRef) {
                        // eslint-disable-next-line no-console
                        console.error("[InfiniteScroll] not this.props.innerRef.current.infiniteScrollRef");
                        return;
                    } else {
                        if (top) {
                            this.props.innerRef.current.infiniteScrollRef.scrollTop = top;
                        }
                        if (left) {
                            this.props.innerRef.current.infiniteScrollRef.scrollLeft = left;
                        }
                    }
                },
                // NOTICE: when preData != currentData then this.scrollViewDom.current.instance.update();
                update: () => {
                    // didn't need
                    // this.forceUpdate();
                    setTimeout(() => {
                        this.update();
                    }, 0);
                },
            },
        };
        // NOTICE: scrollbarControlRef
        this.scrollbarControlRef = this.props.innerRef.current;
    };

    // class="infinite-scroll-wrapper"
    getScrollContentRef = (node: HTMLElement) => {
        // console.log("node", node);
        this.scrollComponent = node;
    };

    getInfiniteScrollBarDOM = (element: HTMLElement) => {
        // REFACTORING: 20200819
        this.scrollBarDomRef.current = element;
    };

    render() {
        const {
            element = "div",
            width,
            height,
            barColor,
            barWidth = "7px",
            expand = false,
            innerRef,
            overScroll = false,
            onScroll,
            themeColor = "dark",
            threshold = 0,
            theme,
        } = this.props;
        // # Scroll Container
        const scrollBGStyle = this.getScrollContainerBackgroundStyle();

        // # Scroll Track
        const pageOffset = this.scrollParentRef ? this.scrollParentRef.scrollHeight / this.scrollParentRef.clientHeight : 0;
        const customBarColor = this.getScrollBarColor();
        let scrollBarTrackHeight = 0;
        if (this.scrollParentRef) {
            scrollBarTrackHeight = this.scrollParentRef.clientHeight;
        }
        //FixMe: wrong ScrollContainer height
        return (
            <div className={this.props.className}>
                <ScrollContainer width={width} height={height} style={scrollBGStyle}>
                    {/* NOTE: Component Tree : Scroll Content */}
                    <div
                        ref={this.settingScrollParentRef as any}
                        className={cx("infinite-scroll", this.props.className)}
                        style={{
                            // NOTICE:
                            userSelect: this.dragFromScrollBarRef ? "none" : "auto",
                            // Way1
                            // overflow: "auto",
                            // Way2: 起初針對 Firefox 進行隱藏、並且可以讓其他瀏覽器也受用。
                            overflow: "hidden",
                            height: "100%",
                            marginTop: "5px",
                        }}
                        onWheel={this.scrollTrackingMouseWheel}
                        // NOTE: Mouse over/move/out
                        onMouseOver={this.onScrollContentMouseOver}
                        onMouseMove={this.onScrollContentMouseMove}
                        // This trigger when mouse out from children
                        // onMouseOut={this.onScrollContentMouseOut}

                        // NOTE: Mouse Enter/Leave
                        // onMouseEnter={this.onScrollContentMouseEnter}
                        onMouseLeave={this.onScrollContentMouseLeave}
                    >
                        {this.renderScrollContentComponent()}
                    </div>
                    {/* NOTE: Component Tree : Scroll Track */}
                    {(this.state.showBar || this.props.alwaysShowBar) && this.state.barHeight > 0 && (
                        <MouseDetect
                            // control
                            // NOTICE: Ref Throw out
                            scrollbarControlRef={this.scrollbarControlRef}
                            pageOffset={pageOffset}
                            // visibility={this.state.showBar}
                            // NOTE: Event
                            // mouseWheel={this.scrollTrackingMouseWheelForNative}
                            // mouseOver={this.scrollTrackingMouseOver}
                            // mouseOut={this.scrollTrackingMouseOut}
                            // mouseEnter={this.scrollTrackingMouseEnter}
                            // mouseLeave={this.scrollTrackingMouseLeave}
                        >
                            <ScrollTrack
                                // NOTICE Ref Into
                                scrollbarControlRef={this.scrollbarControlRef}
                                // NOTICE: 需要 ScrollBar 的 HTMLElement
                                scrollBarDomRef={this.scrollBarDomRef}
                                // mouse detect
                                // NOTICE: No use
                                overBar={this.state.overBar}
                                pageOffset={pageOffset}
                            >
                                <ScrollBar
                                    // Ref: Throw out
                                    scrollbarControlRef={this.scrollbarControlRef}
                                    exportScrollBarDOM={this.getInfiniteScrollBarDOM}
                                    // mouse detect
                                    overBar={this.state.overBar}
                                    width={this.props.barWidth}
                                    height={this.state.barHeight}
                                    top={this.state.barTop}
                                    pageOffset={pageOffset}
                                    scrollTrackHeight={scrollBarTrackHeight}
                                    customBarColor={customBarColor}
                                    theme={theme}
                                />
                            </ScrollTrack>
                        </MouseDetect>
                    )}
                </ScrollContainer>
            </div>
        );
    }
}
const ForwardRefInfiniteScroll = React.forwardRef((props: InfiniteScrollProps, ref) => {
    return (
        <InfiniteScroll innerRef={ref} {...props} className={props.className}>
            {props.children}
        </InfiniteScroll>
    );
});
ForwardRefInfiniteScroll.displayName = "InfiniteScroll";

export default withTheme(ForwardRefInfiniteScroll);
