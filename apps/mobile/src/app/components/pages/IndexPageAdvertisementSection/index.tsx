import {AdTemplate1} from "./components/AdTemplate1";
import {AdTemplate2} from "./components/AdTemplate2";
import {AdTemplate3} from "./components/AdTemplate3";
import styled from "styled-components";

const Container = styled.div`
  background: #f5faf4;
  height: 100vh;
`;
export interface AdTemplate {
  type: AdTemplate1 | AdTemplate2 | AdTemplate3,
}

export interface AdTemplateCard {
  // NOTICE: 得與 APP Team 討論
  action: any;
  actionName: null | string;
}

const CategoryText = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 11px;
`
export const IndexPageAdvertisementSection = () => {
  return (
    <Container>
      <CategoryText>Theme Activities</CategoryText>
      <AdTemplate1/>
    </Container>
  )
}
