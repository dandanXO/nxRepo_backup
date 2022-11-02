import React from "react";
import styled, {css, keyframes} from "styled-components";
import classNames from "classnames";
import {ThemeModuleSkinType, ThemeModuleSkinTypeEnum} from "../type/module";
interface StylessScrollBarProps {
    width?: string;
    height: number;
    className?: string;
    top: number;
    overScrollContent?: boolean;
    scrollTrackHeight: number;
    pageOffset: number;
    scrollbarControlRef: any;
    exportScrollBarDOM: (obj: any) => void;
}
interface StylessScrollBarState {
    barTopPosition: number;
}
class StylessScrollBar extends React.Component<StylessScrollBarProps, StylessScrollBarState> {
    scrollBarRef: React.RefObject<any>;
    draging: boolean;
    lastDragTopPosition: number;

    constructor(props: StylessScrollBarProps) {
        super(props);
        // state
        this.state = {
            barTopPosition: this.props.top,
        };
        this.scrollBarRef = React.createRef();

        // drag
        this.draging = false;
        this.lastDragTopPosition = 0;
    }
    componentDidMount() {
        this.props.exportScrollBarDOM(this.scrollBarRef.current);
    }
    componentDidUpdate(prevProps: StylessScrollBarProps, prevState: StylessScrollBarState) {
        // scrollbar follow native scrollbar top distance
        // !this.dragRef.current
        if (prevState.barTopPosition !== this.props.top) {
            this.setState({
                barTopPosition: this.props.top,
            });
        }
    }
    onMouseOver = () => {
        this.draging = false;
    };
    onMouseOut = () => {
        if (this.props.overScrollContent) {
            this.draging = true;
        } else {
            this.draging = false;
        }
    };
    onMouseDown = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        // console.log("onMouseDown");
        this.draging = true;
        this.lastDragTopPosition = event.clientY;
        // console.log("this.lastDragTopPositionRef", this.lastDragTopPosition);
    };
    onMouseUp = () => {
        this.draging = false;
    };
    onMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (!this.draging) {
            return;
        }
        // # Calculate Distance
        // console.log("onMouseMove");
        const distance = this.lastDragTopPosition - event.clientY;
        // console.log("event.clientY", event.clientY);
        // console.log("distance", distance);

        // # Memorize lastDragTopPosition
        this.lastDragTopPosition = event.clientY;

        let barTopPosition = this.state.barTopPosition;
        if (distance < 0) {
            // down
            barTopPosition = barTopPosition + Math.abs(distance);
            if (barTopPosition > this.props.scrollTrackHeight - this.props.height) {
                barTopPosition = this.props.scrollTrackHeight - this.props.height;
            }
        } else {
            // up
            barTopPosition = barTopPosition - distance;
            if (barTopPosition < 0) {
                barTopPosition = 0;
            }
        }
        // # Set scrollbar position
        this.setState({
            barTopPosition,
        });
        // console.log("barTopPosition", barTopPosition);

        // # Set Scroll Content position
        const scrollTop = barTopPosition * this.props.pageOffset;
        this.props.scrollbarControlRef.instance.scroll({
            top: scrollTop,
        });
    };
    render() {
        return (
            <div
                ref={this.scrollBarRef}
                className={classNames(this.props.className, "scrollBar")}
                style={{
                    /* NOTICE: remain */
                    top: this.state.barTopPosition + "px",
                }}
                // down/move/up
                onMouseDown={this.onMouseDown}
                onMouseMove={this.onMouseMove}
                onMouseUp={this.onMouseUp}
                // over/out
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}
            ></div>
        );
    }
}

const expand = keyframes`
    0% {
        width: 7px;
    }
    100% {
        width: 10px;
    }
`;

const scrollExpandAnimation = (props: ScrollBarProps) => {
    return (
        typeof props.overBar &&
        css`
            ${expand} .2s linear forwards;
        `
    );
};

function getBackground(theme: ThemeModuleSkinType, customBarColor: string | undefined) {
    if (customBarColor) {
        return `
            background: ${customBarColor};
        `;
    } else {
        if (theme === ThemeModuleSkinTypeEnum.early) {
            return `
                background: #000000;
                opacity: 0.2;
            `;
        } else {
            return `
                background-color: #ffffff;
                opacity: 0.2;
            `;
        }
    }
}
interface ScrollBarProps {
    expand?: boolean;
    overBar?: boolean;
    height?: number;
    customBarColor?: string;
}
const ScrollBar = styled(StylessScrollBar)<ScrollBarProps>`
    width: ${props => (props.width ? props.width : "9px")};
    height: ${props => props.height + "px"};
    padding: 0px 2px;

    border-radius: 4.5px;
    box-shadow: 0 0 0 1px transparent;

    position: relative;
    left: 0px;
    box-sizing: border-box;
    /* NOTICE: replace by animation */
    /* width: this.props.overBar ? "10px" : "5px"; */
    cursor: ${props => (props.overBar ? "pointer" : "pointer")};
    ${props => props.expand && `animation: ${scrollExpandAnimation}`};
    //Theme
    ${props => getBackground(props.theme.mode, props.customBarColor)}
    &:hover {
        opacity: 0.25;
    }
    &:active {
        opacity: 0.3;
    }
`;

export default ScrollBar;
