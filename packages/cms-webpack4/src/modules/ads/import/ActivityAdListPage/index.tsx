import {AdTemplate1, IAdTemplate1Data} from "./components/AdTemplate1";
import {AdTemplate2} from "./components/AdTemplate2";
import {AdTemplate3} from "./components/AdTemplate3";
import styled from "styled-components";
import queryString from "query-string";
import Android260x720 from "./720.svg";
import {ActivityBanner} from "../../export/service/types";
// import {MockAdTemplate1Data} from "./mock/MockAdTemplate1Data";
// import {MockAdTemplate2Data} from "./mock/MockAdTemplate2Data";
// import {MockAdTemplate3Data} from "./mock/MockAdTemplate3Data";

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
// export interface AdTemplate {
//   type: AdTemplate1 | AdTemplate2 | AdTemplate3,
// }

export interface AdTemplateCard {
  // NOTICE: 得與 APP Team 討論
  action: "APPLY_LOAN" | "POP_URL";
  actionName: string;
  actionUrl?: string;
}

const CategoryText = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 11px;
`
const parsedQueryString = queryString.parse(window.location.search);


interface IActivityAdListPage {
  type?: string;
  // data?: AdTemplate1 | AdTemplate2;
  //   data: ActivityBanner<any, any> | null;
    data: IAdTemplate1Data;
}

export const DemoActivityAdListPage = (props: IActivityAdListPage) => {
    console.log("DemoActivityAdListPage.props:z", props)
  const type = parsedQueryString.type || props.type;
  let adTemplate;
  switch (type) {
    case "1": {
      adTemplate = <AdTemplate1 data={props.data}/>;
      break;
    }
    case "2": {
      adTemplate = <AdTemplate2 data={props.data as any}/>
      break;
    }
    case "3": {
      adTemplate = <AdTemplate3 data={props.data as any}/>
      break;
    }
    default:
      adTemplate = <AdTemplate1 data={props.data}/>;
      break;
  }
  return (
    <Page>
        <CategoryText>Theme Activities</CategoryText>
        {adTemplate}
    </Page>
  )
}
