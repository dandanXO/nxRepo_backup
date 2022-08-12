import styled from "styled-components";
import React from "react";
import { flexCreator } from "../utils/index";

const ListItemStyled = styled.div<propsStyles>`
    ${flexCreator("row", "space-between", "center")};
    width: 100%;
    margin: 5px;
    .itemText{
        color:${(props) => props.textColor ? props.theme.color[props.textColor] : props.theme.color.black};
    }
    font-size: ${({ theme }) => theme.fontSize[16]};
`;

type ItemProps = {
    title: string;
    text: string;
} & propsStyles;

interface propsStyles {
    textColor?: string;
}

const ListItem = (props: ItemProps) => {
    const { title, text, textColor } = props;
    return (
        <ListItemStyled textColor={textColor}>
            <div className={"itemTitle"}>{title}</div>
            <div className={"itemText"}>{text}</div>
        </ListItemStyled>
    );
};

export default ListItem;
