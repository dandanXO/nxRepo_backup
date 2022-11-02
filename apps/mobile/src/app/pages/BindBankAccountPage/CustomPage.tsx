import styled from "styled-components";
import {Page} from "@frontend/mobile/shared/ui";

export const CustomPage = styled(Page)`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: ${(props) => props.theme.page.bgColor};
`;
