import styled from "styled-components";
import {environment} from "../../../../environments/environment";
import {appSlice} from "../../../reduxStore/appSlice";

type IStyledPage = {

}

export const BaseStyledPageTemplate = styled.div.attrs((props) => ({
  className: "h-full"
}))<IStyledPage>`

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;
    background: url("assets/${environment.assetPrefix}/bg_web.png") center bottom no-repeat;

    @media (max-width: 768px) {
      background: url("assets/${environment.assetPrefix}/bg_h5.png") center bottom /130% auto;
    }
  }
`;

type IBasePageTemplateContainer = {
  children: React.ReactNode;
}
export const BasePageTemplateContainer = (props: IBasePageTemplateContainer) => {
  return (
    <BaseStyledPageTemplate
      onClick={() => {
        // NOTE: 關閉 Coco Desktop Logout Popover
        // if(isShowMobileLogoutModal) {
        //   dispatch(appSlice.actions.showMobileLogoutModal(false));
        // }
      }}
    >
      {props.children}
    </BaseStyledPageTemplate>
  )
}