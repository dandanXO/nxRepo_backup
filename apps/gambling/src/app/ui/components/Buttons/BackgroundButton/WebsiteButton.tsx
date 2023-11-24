import styled from "styled-components";
import {BackgroundButton} from "../BackgroundButton";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {environment} from "../../../../../environments/environment";

const StyledWebsiteButton = styled(BackgroundButton)`
  background: url(assets/${environment.assetPrefix}/group_di.png) no-repeat center/400px 80px;
  align-items: center;
  height: 80px;
`

export const WebsiteButton = () => {
  const navigate = useNavigate();
  return (
    <StyledWebsiteButton
      className={"cursor-default"}
      // onClick={() => navigate(PageOrModalPathEnum.CompanyProfilePage)}
    >
      <span className={"text-white font-bold"}>Produtos do {environment.platformGroup} </span>
    </StyledWebsiteButton>
  )
}
