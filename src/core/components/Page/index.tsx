import styled from "styled-components";
import React from "react";

const StyledPage = styled.div`
  padding: 18px;
  background: ${({ theme }) => theme.color.gray100};
`
interface PageProps {
    children?: React.ReactNode;
}
const Index = (props: PageProps) => {
    return <StyledPage>{props.children}</StyledPage>
}
export default Index;
