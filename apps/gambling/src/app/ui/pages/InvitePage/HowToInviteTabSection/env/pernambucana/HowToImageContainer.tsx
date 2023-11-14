import styled from "styled-components";
import {environment} from "../../../../../../../environments/environment";

export const HowToImageContainer = styled.div`
  position: relative;
  background-image: url("assets/${environment.assetPrefix}/banner_1.png");
  background-size: 1524px 423px;
  //background-size: cover;
  overflow: hidden;
  border-radius: 8px;

  //width: 1524px;
  //height: 423px;
  //padding: 20px

  display: flex;
  flex-direction: column;

  //background-image: url({{ section.settings.bgimg | image_url }});
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
  //height: 350px;
  min-height: 380px;

  align-items: center;
  justify-content: center;
  color: var(--white);

  padding: 20px;
`;
