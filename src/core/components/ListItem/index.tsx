import styled from "styled-components";
import React from "react";
import { flexCreator } from "../utils";

const ListItemStyled = styled.div<propsStyles>`
    ${flexCreator("row", "space-between", "center")};
    width: 100%;
    margin: 5px;
    .itemTitle {
        > div {
            display: flex;
            img {
                margin: 0 6px;
            }
        }
    }
    .itemText {
        color: ${(props) =>
            props.textColor
                ? props.theme.color[props.textColor]
                : props.theme.color.black};
    }
    font-size: ${({ theme }) => theme.fontSize[16]};
`;

type ItemProps = {
    title: string | React.ReactElement;
    text: string | React.ReactElement | number;
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
