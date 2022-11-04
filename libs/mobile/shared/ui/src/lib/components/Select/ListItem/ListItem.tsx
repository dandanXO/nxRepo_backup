import React, {useCallback, useEffect, useState} from "react";
import {IListItemType} from "../IListItemType";
import {XuJieStyledListItem} from "../layoutSkin/ListItem/XuJieStyledListItem";


interface ListItemProps {
    select: boolean;
    onItemClick: (index: number) => void;
    index: number;
    children: React.ReactNode;
}

const ListItem = (props: ListItemProps) => {
    // normal, hover, click, over, out
    const [uiState, setUiState] = useState<IListItemType>(props.select ? "select" : "normal");

    useEffect(() => {
        setUiState(props.select ? "select" : "normal");
    }, [props.select]);

    const onClick = useCallback(() => {
        setUiState(state => {
            return state === "select" ? "normal" : "select";
        });
        // setSelectIndex(index)
        if (props.onItemClick) {
            props.onItemClick(props.index);
        } else {
            new Error("Must pass props.onItemClick");
        }
    }, [props]);

    const onMouseOver = useCallback(() => {
        if (uiState === "select") return;
        setUiState("hover");
    }, [uiState]);

    const onMouseOut = useCallback(() => {
        if (uiState === "select") return;
        setUiState("normal");
    }, [uiState]);

    return (
        <XuJieStyledListItem
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            state={uiState}
            // state={props.state}
        >
            {props.children}
        </XuJieStyledListItem>
    );
};

export default ListItem;
