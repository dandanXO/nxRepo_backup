import styled from "styled-components";
import {environment} from "../../../../../../environments/environment";

export const Container = styled.div`
  //width: 100%;
  //height: 100%;
  background-image: url(assets/${environment.assetPrefix}/ad_bg_1.png);
  background-size: 100% auto;
  border-radius: 20px;
  padding: 20px 24px;
`;
