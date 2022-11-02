import styled from "styled-components";
import React, {useCallback, useEffect, useRef, useState} from "react";

const getListItemStatus = (state: string) => {
    if (state === "normal") {
        return `
            background-color: transparent;
        `;
    } else if (state === "hover") {
        return `
            background-color: rgba(0, 0, 0, 0.24);
            color: #52c8f9;
        `;
    } else if (state === "select") {
        return `
            color: #36a9fb;
        `;
    }
};

export type ListItemType2 = "select" | "normal" | "hover" | "open";

interface StyledListItemProps {
    state: ListItemType2;
    onMouseOver: () => void;
    onMouseOut: () => void;
    onClick: () => void;
    depth: number;
}

const StyledListItem = styled.li<StyledListItemProps>`
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    text-align: left;
    height: 28px;
    padding: 0 13px 0 16px;
    line-height: 28px;
    cursor: pointer;
    color: #ffffff;
    ${props => getListItemStatus(props.state)}
    &:active {
        background-color: #36a9fb;
        color: white;
    }
    text-indent: ${props => props.depth * 16}px;
`;

interface ListItemProps {
    select: boolean;
    onItemClick: (index: number, subIndex: number) => void;
    index: number;
    subIndex: number;
    children: React.ReactNode;
    subChildren?: any[];
    depth?: number;
    onMouseOverHandler?: (ref: React.RefObject<HTMLLIElement>) => void;
    onMouseOutHandler?: () => void;
}
const ListItem2 = React.forwardRef((props: ListItemProps, ref: any) => {
    const {depth = 0, select} = props;
    // normal, hover, click, over, out
    const [uiState, setUiState] = useState<ListItemType2>(select ? "select" : "normal");
    const listRef = useRef<HTMLLIElement>(null);

    useEffect(() => {
        setUiState(select ? "select" : "normal");
    }, [select]);

    const onClick = useCallback(() => {
        setUiState(state => {
            return state === "select" ? "normal" : "select";
        });
        // setSelectIndex(index)
        if (props.onItemClick) {
            props.onItemClick(props.index, props.subIndex);
        } else {
            new Error("Must pass props.onItemClick");
        }
    }, [props]);

    const onMouseOver = useCallback(() => {
        props.onMouseOverHandler && props.onMouseOverHandler(listRef);
        if (uiState === "select") return;
        setUiState("hover");
    }, [uiState]);

    const onMouseOut = useCallback(() => {
        props.onMouseOutHandler && props.onMouseOutHandler();
        if (uiState === "select") return;
        setUiState("normal");
    }, [uiState]);

    return (
        <StyledListItem
            ref={listRef}
            depth={depth}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            state={uiState}
        >
            {props.children}
        </StyledListItem>
    );
});

export default ListItem2;
