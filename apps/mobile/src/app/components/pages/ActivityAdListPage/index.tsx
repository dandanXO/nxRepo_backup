import {AdTemplate1} from "./components/AdTemplate1";
import {AdTemplate2} from "./components/AdTemplate2";
import {AdTemplate3} from "./components/AdTemplate3";
import styled from "styled-components";
import queryString from "query-string";
import Android260x720 from "./720.svg";
import {MockAdTemplate1Data} from "./MockAdTemplate1Data";

const Page = styled.div`
  //background: #f5faf4;
  //border-radius: 4px;
  //border: 1px solid #000;
  background: url(${Android260x720}) 360px 720px;
  height: 100vh;
  //padding: 20px 18px 0 18px;
  padding: 30px 18px 0 18px;
  width: 360px;
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
const parsedQueryString = queryString.parse(window.location.search);


interface IActivityAdListPage {
  type?: string;
}

export const ActivityAdListPage = (props: IActivityAdListPage) => {
  const type = parsedQueryString.type || props.type;
  switch (type) {
    case "1": {
      return <AdTemplate1 data={MockAdTemplate1Data}/>;
    }
    case "2": {
      return <AdTemplate2/>
    }
    case "3": {
      return <AdTemplate3/>
    }
    default:
      return <AdTemplate1 data={MockAdTemplate1Data}/>;
  }
}

export const DemoActivityAdListPage = (props: IActivityAdListPage) => {
  const type = parsedQueryString.type || props.type;
  let adTemplate;
  switch (type) {
    case "1": {
      adTemplate = <AdTemplate1 data={MockAdTemplate1Data}/>;
      break;
    }
    case "2": {
      adTemplate = <AdTemplate2/>
      break;
    }
    case "3": {
      adTemplate = <AdTemplate3/>
      break;
    }
    default:
      adTemplate = <AdTemplate1 data={MockAdTemplate1Data}/>;
      break;
  }
  return (
    <Page>
      {/*<div>*/}
        <CategoryText>Theme Activities</CategoryText>
      {/*  <AdTemplate1/>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <CategoryText>Theme Activities</CategoryText>*/}
      {/*  <AdTemplate2/>*/}
      {/*</div>*/}

      {/*<div>*/}
      {/*  <CategoryText>Theme Activities</CategoryText>*/}
      {/*  <AdTemplate3/>*/}
      {/*</div>*/}
      {adTemplate}
    </Page>
  )
}
