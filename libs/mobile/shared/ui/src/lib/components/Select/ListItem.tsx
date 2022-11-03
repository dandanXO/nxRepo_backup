import styled from "styled-components";
import React, {useCallback, useEffect, useState} from "react";
import {IListItemType} from "./IListItemType";

// NOTE: 不同狀態的顏色
const getListItemStatus = (state: IListItemType) => {
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
            color: #52c8f9;
        `;
    } else {
      return ``
    }
};

const getXuJieListItemStatus = () => {
  // NOTE: xujie
  return `
    color: #aaa;
  `
};

// NOTE: 點擊瞬間的顏色
const getTapColor = () => {
  return `
    &:active {
          background-color: #36a9fb;
          color: white;
      }
  `
}
const getXuJieTapColor = () => {
  return `

  `
}

interface StyledListItemProps {
  state: IListItemType;
  onMouseOver: () => void;
  onMouseOut: () => void;
  onClick: () => void;
}

const StyledListItem = styled.li<StyledListItemProps>`
    box-sizing: border-box;
    text-align: left;
    height: 28px;
    padding: 0 24px 0 16px;
    line-height: 28px;
    cursor: pointer;
    color: #ffffff;
    //${props => getListItemStatus(props.state)}
    ${props => getXuJieListItemStatus()};
    //${props => getTapColor()};
    ${props => getXuJieTapColor()};
`;

const StyledXuJieListItem = styled(StyledListItem)`
  height: 49px;
  line-height: 49px;
`


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
        <StyledXuJieListItem
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            onClick={onClick}
            state={uiState}
            // state={props.state}
        >
            {props.children}
        </StyledXuJieListItem>
    );
};

export default ListItem;
