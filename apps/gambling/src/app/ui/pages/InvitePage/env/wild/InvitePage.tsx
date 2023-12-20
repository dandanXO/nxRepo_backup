import { useEffect, useState } from "react";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";

import { TabItem, Tabs } from "../../../../components/TabItem/TabItem";
import { Container } from "../../../../components/container/Container";

import cx from "classnames";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { usePageNavigate } from "../../../../hooks/usePageNavigate";
import { IInvitePage } from "../..";



export const InvitePage = (props: IInvitePage) => {
  const { onClickToIndex } = usePageNavigate();
  const { children, panelMode, setPanelMode } = props;

  const { isMobile } = useBreakpoint();

  return (
    <Container className="pt-7 md:pt-0">
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
              className={cx("px-6 rounded-md mr-2 whitespace-nowrap text-sm sm:text-2xl", {

              })}
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
              className={cx("px-6 rounded-md whitespace-nowrap text-sm sm:text-2xl", {
              })}
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
    </Container>
  )
}
