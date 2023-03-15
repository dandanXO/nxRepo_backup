import {AdTemplate1, IAdTemplate1Data} from "./components/AdTemplate1";
import {AdTemplate2, IAdTemplate2Data} from "./components/AdTemplate2";
import {AdTemplate3, IAdTemplate3Data} from "./components/AdTemplate3";
import styled from "styled-components";
import queryString from "query-string";
import Android260x720 from "./720.svg";
import {MockAdTemplate1Data} from "./mock/MockAdTemplate1Data";
import {MockAdTemplate2Data} from "./mock/MockAdTemplate2Data";
import {MockAdTemplate3Data} from "./mock/MockAdTemplate3Data";
import {useEffect} from "react";
import {useLazyGetActivityAdsQuery} from "../../../api";
import {useLocationOrderQueryString} from "@frontend/mobile/shared/ui";
import {getTemplate1AdTemplate1Data} from "./import/mapper/getTemplate1AdTemplate1Data";
import {getTemplate2AdTemplate1Data} from "./import/mapper/getTemplate2AdTemplate1Data";
import {getTemplate3AdTemplate1Data} from "./import/mapper/getTemplate3AdTemplate1Data";

const Page = styled.div`
  //background: #f5faf4;
  //border-radius: 4px;
  //border: 1px solid #000;
  background: url(${Android260x720}) 360px 720px;
  height: 100vh;
  //height: 640px;
  //padding: 20px 18px 0 18px;
  padding: 30px 18px 0 18px;
  width: 360px;
`;
export interface AdTemplate {
  type: IAdTemplate1Data | IAdTemplate2Data | IAdTemplate3Data,
}

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
    data?: any;
    phoneNo?: string;
}


const ActivityAdListPage = (props: IActivityAdListPage) => {

  const [triggerGetActivityAd, {currentData: currentData}] = useLazyGetActivityAdsQuery({})

  // NOTE: phoneNo
  const pageQueryString = useLocationOrderQueryString();
  const phoneNo = pageQueryString.phoneNo;

  useEffect(() => {
    triggerGetActivityAd({
      phoneNo: phoneNo || "",
    });
  }, [])

  // const type = parsedQueryString.type || props.type;
  // switch (type) {
  //   case "1": {
  //     return <AdTemplate1 data={currentData || props.data || MockAdTemplate1Data}/>;
  //   }
  //   case "2": {
  //     return <AdTemplate2 data={currentData || props.data || MockAdTemplate2Data}/>
  //   }
  //   case "3": {
  //     return <AdTemplate3 data={currentData || props.data || MockAdTemplate3Data}/>
  //   }
  //   default:
  //     return <AdTemplate1 data={currentData || props.data || MockAdTemplate1Data}/>;
  // }
  const type = String(currentData?.templateType);
  switch (type) {
    case "1": {
      return <AdTemplate1 data={getTemplate1AdTemplate1Data(currentData?.contents)}/>;
    }
    case "2": {
      return <AdTemplate2 data={getTemplate2AdTemplate1Data(currentData?.contents)}/>
    }
    case "3": {
      return <AdTemplate3 data={getTemplate3AdTemplate1Data(currentData?.contents)}/>
    }
    default:
      return null;
  }
}
export default ActivityAdListPage;

export const DemoActivityAdListPage = (props: IActivityAdListPage) => {
  const type = parsedQueryString.type || props.type;
  let adTemplate;
  switch (type) {
    case "1": {
      adTemplate = <AdTemplate1 data={props.data || MockAdTemplate1Data}/>;
      break;
    }
    case "2": {
      adTemplate = <AdTemplate2 data={props.data || MockAdTemplate2Data}/>
      break;
    }
    case "3": {
      adTemplate = <AdTemplate3 data={props.data || MockAdTemplate3Data}/>
      break;
    }
    default:
      adTemplate = null;
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
