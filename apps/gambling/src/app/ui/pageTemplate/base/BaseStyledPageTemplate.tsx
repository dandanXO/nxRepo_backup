import styled from "styled-components";
import {environment} from "../../../../environments/environment";

type IStyledPage = {
  style?: unknown;
  isCurrentPageCompanyProfile?: boolean;
  bgType?: "color" | "image";
}

export const BaseStyledPageTemplate = styled.div.attrs((props) => ({
  className: "h-full",
}))<IStyledPage>`

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -2;

    ${(props) => (typeof props.bgType === "undefined" || props.bgType === "image") && `
      background: url("assets/${environment.uVersion}/bg_web.png") center bottom no-repeat;

      @media (max-width: 768px) {
        background: url("assets/${environment.uVersion}/bg_tablet.png") center bottom /130% auto;
      }

      @media (max-width: 376px) {
        background: url("assets/${environment.uVersion}/bg_h5.png") center bottom /130% auto;
      }
    `}

    ${(props) => props.bgType === "color" && `
      background-color: var(--gray-scale-10);
    `}

    ${(props) => props.isCurrentPageCompanyProfile && `
      background: url("assets/${environment.uVersion}/bg_company_web.png") no-repeat center center/100% auto;
      background-color: var(--gray-scale-10);

      @media (max-width: 768px) {
        background: url("assets/${environment.uVersion}/bg_company_tablet.png") no-repeat center center/100% auto;
        background-color: var(--gray-scale-10);
      }

      @media (max-width: 376px) {
        background: url("assets/${environment.uVersion}/bg_company_h5.png") no-repeat center center/100% auto;
        background-color: var(--gray-scale-10);
      }
    `};

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
