import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { flexCreator } from "../utils";
import { UpArrow, DownArrow } from "../images";
import theme from "../config/theme";
export const Accordion = (props: {
    isCollapse: boolean;
    title: string;
    children: React.ReactElement | React.ReactElement[];
}) => {
    const { isCollapse, title, children } = props;
    const [collapse, setCollapse] = useState(isCollapse);
    const handleCollapse = () => {
        setCollapse(!collapse);
    };
    useEffect(() => {
        setCollapse(isCollapse);
    }, [isCollapse]);

    const AccordStyled = styled.div`
        width: 100%;
    `;

    const AccordionHeaderStyled = styled.div`
        ${flexCreator("row", "space-between", "center")};
        width: 100%;

        .accordionTitle {
            color: ${({ theme }) => theme.color.gray500};
            font-size: ${({ theme }) => theme.fontSize[12]};
        }
        .collapseIcon {
            ${flexCreator("row", "center", "center")};
        }
    `;

    const AccordionContentStyled = styled.div`
        margin-top: 10px;
        width: 100%;
    `;

    return (
        <AccordStyled>
            <AccordionHeaderStyled onClick={handleCollapse}>
                <div className={"accordionTitle"}>{title}</div>
                <div className={"collapseIcon"}>
                    {collapse ? (
                        <img src={UpArrow} alt="^" />
                    ) : (
                        <img src={DownArrow} alt="v" />
                    )}
                </div>
            </AccordionHeaderStyled>
            {collapse && (
                <AccordionContentStyled>{children}</AccordionContentStyled>
            )}
        </AccordStyled>
    );
};

export default Accordion;
