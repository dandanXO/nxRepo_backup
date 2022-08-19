import styled from "styled-components";
import React from "react";

const StyledPage = styled.div`
  padding: 18px;
  background: ${({ theme }) => theme.color.gray100};
`
const Page = (props: any) => {
    return <StyledPage {...props}>{props.children}</StyledPage>
}
export default Page;
