import React, {Component} from "react";
import classnames from "classnames";
import styled from "styled-components";

interface StylessScrollTrackProps {
    className?: string;
    pageOffset?: number;
    children: React.ReactNode;
    scrollBarDomRef: any;
    scrollbarControlRef: any;
}

class StylessScrollTrack extends Component<StylessScrollTrackProps> {
    domRef: React.RefObject<HTMLElement>;
    constructor(props: StylessScrollTrackProps) {
        super(props);
        this.state = {};
        this.domRef = React.createRef();
    }
    onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // 過濾 scrollBar 的位置
        const scrollBarDom = this.props.scrollBarDomRef.current;
        const barRect = scrollBarDom.getClientRects()[0];
        if (barRect.top <= event.clientY && event.clientY <= barRect.bottom) {
            // in scrollbar
            return;
        }
        // 取得 clientY 相對於 scrollTrack 的 top
        // Absolute distance
        // const trackRect = this.domRef.current.getClientRects()[0];
        // const top = event.clientY - trackRect.y;
        // this.log("top", top);
        // const scrollTop = top * this.props.pageOffset;
        // this.log("scrollTop", scrollTop);
        // this.props.scrollbarControlRef.instance.scroll({
        //     top: scrollTop,
        // });
        // Relative distance
        if (barRect.top > event.clientY) {
            this.props.scrollbarControlRef.instance.scrollBy({
                top: -100,
            });
        } else {
            this.props.scrollbarControlRef.instance.scrollBy({
                top: 100,
            });
        }
    };
  // @ts-ignore
    render() {
        return (
            <div
                ref={this.domRef as any}
                className={classnames("scrollTrack", this.props.className)}
                onMouseDown={this.onMouseDown}
            >
                {this.props.children}
            </div>
        );
    }
}
interface ScrollTrackProps {
    overBar: boolean;
}
const ScrollTrack = styled(StylessScrollTrack)<ScrollTrackProps>`
    background: transparent;
    position: absolute;
    top: 0;
    right: 5px;
    height: 100%;
    /* MouseOver  */
    /* width: ${props => (props.overBar ? "10px" : "7px")}; */
`;
export default ScrollTrack;
