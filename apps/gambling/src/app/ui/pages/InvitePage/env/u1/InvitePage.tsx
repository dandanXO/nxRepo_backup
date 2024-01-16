import { useEffect, useState } from "react";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";

import { TabItem, Tabs } from "../../../../components-bs/TabItem/TabItem";
import { PageContainer } from "../../../../components-bs/PageContainer";

import cx from "classnames";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../router/hooks/usePageNavigate";
import { IInvitePage } from "../..";
import { twMerge } from "tailwind-merge";



export const InvitePage = (props: IInvitePage) => {
  const { onClickToIndex } = usePageNavigate();
  const { children, panelMode, setPanelMode } = props;

  const { isMobile } = useBreakpoint();

  return (
    <PageContainer className="pt-7 md:pt-0">
      {
        !isMobile && (
          <BackNavigation
            className={'md:pb-2'}
            onClick={onClickToIndex}
          />
        )
      }
      <section className={"tab-item w-full flex flex-row justify-center item-center mb-4"}>
        <div>
          <Tabs className={"game-type-tab-list"}>
            <TabItem
              mode={"howto"}
              // pureColor={true}
              background={"var(--primary-variant)"}
              // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
              activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
              className={twMerge("px-6 text-white rounded-md mr-2 whitespace-nowrap text-sm sm:text-2xl",
                panelMode !== "howto" && 'border border-solid border-[rgba(255,255,255,0.3)]'
                )}
              name={"Como convidar"}
              active={panelMode === "howto"}
              size={"big"}
              onClick={() => {
                setPanelMode("howto")
              }}
            />
            <TabItem
              mode={"data"}
              // pureColor={true}
              background={"var(--primary-variant)"}
              // activeBackground={"bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]"}
              activeBackground={"linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%);"}
              className={twMerge("px-6 text-white rounded-md whitespace-nowrap text-sm sm:text-2xl",
                panelMode !== "daily" && 'border border-solid border-[rgba(255,255,255,0.3)]')}
              name={"Dados diários"}
              active={panelMode === "daily"}
              size={"big"}
              onClick={() => {
                setPanelMode("daily")
              }}
            />
          </Tabs>
        </div>
      </section>
      {children}
    </PageContainer>
  )
}
