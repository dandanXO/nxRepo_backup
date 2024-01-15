import {usePageNavigate} from "../../../../router/hooks/usePageNavigate";
import tabThree from "./assets/tab3.png"
import icon＿calendarcheck from "./assets/icon＿calendarcheck.png";
import icon＿crownsimple from "./assets/icon＿crownsimple.png";
import styled from 'styled-components';

import icon＿telegramlogo from "./assets/icon＿telegramlogo.png";
import icon＿thumbsup from "./assets/icon＿thumbsup.png";
import icon＿users from "./assets/icon＿users.png";

import icon＿favorite from "./assets/icon＿favorite.png";
import icon＿recent from "./assets/icon＿recent.png";
import icon＿download from "./assets/icon＿download.png";

import icon＿slot from "./assets/icon＿slot.png";
import icon＿fishing from "./assets/icon＿fishing.png";
import icon＿vivo from "./assets/icon＿vivo.png";
import icon＿viver from "./assets/icon＿viver.png";
import icon__buildings from "./assets/icon__buildings.png";
import icon__files from "./assets/icon__files.png";

import closeSVG from "./icon-close.svg";
import { gameSlice } from "../../../../../reduxStore/gameSlice";
import cx from "classnames";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {useLocation} from "react-router";
import {twMerge} from "tailwind-merge";
import useBreakpoint from "../../../../pageTemplate/hooks/useBreakpoint";
import {useDispatch, useSelector} from "react-redux";
import {uiSlice} from "../../../../../reduxStore/uiSlice";
import {CloseICON} from "../../../../components-bs/env/u1/CloseICON";
import {appSlice} from "../../../../../reduxStore/appSlice";
import { RootState } from "../../../../../reduxStore";
import {useScrollToPartPageTemplate} from "../../../../pageTemplate/hooks/useScrollToPartPageTemplate";
import { environment } from "../../../../../../environments/environment";


export type IGameType = "Slots" | "Fishing" | "Vivo" | "Viver";

type IMenuDrawer = {
  className?: string;
  onClickToDownload: () => void;
}
export const MenuDrawer = (props: IMenuDrawer) => {
  const {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
    onClickToCompanyProfile,
    onClickToLicense,
    onClickToIndex,
  } = usePageNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {isMobile, isDesktop, isTablet} = useBreakpoint();

  const { recharge_first_cashback_rate, recharge_cashback_rate } = useSelector((rootState: RootState) => rootState.app.config);

  const close = () => {
    const canClose = (isMobile || isTablet);
    canClose && dispatch(uiSlice.actions.setOpenMenuDrawer(false))
  }

  const { label } = useSelector((state: any) => state.gameList);
  const Wraaper = styled.div`
  height: calc(${document.body.clientHeight}px - 72px);
  overflow-y: auto;
  width:248px;
`;
  const {scrollToWindowTop} = useScrollToPartPageTemplate();

  return (
    <div
      className={twMerge((isMobile || isTablet) && "bg-[rgba(0,0,0,.6)] fixed left-0 top-0 right-0 bottom-0 w-full h-full", props.className)}
      // NOTE: onclick 改用，避免拖拉文字到modal外層會直接關閉
      onMouseDown={() => {
        // NOTE: 手機版用戶會誤點
        close();
      }}
    >
        <Wraaper
          id="TabBarRoot"
          // NOTICE: cx->twMerge 下面 bg 會失效 (refactor me)
          className={cx(
            "w-[248px]",
            // (isMobile) && `h-[calc(100dvh-72px)]`,
            // (isTablet) && "h-[calc(100dvh-72px)]",
            // (isDesktop) && "h-[calc(100dvh-72px)]",
            // (isTablet||isDesktop) && "h-full",
            "bg-[linear-gradient(90deg,_#262626_50%,#333333_100%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col justify-between pb-5 gap-3 items-start overflow-auto",
            "relative"
          )}
          onMouseDown={(event) => {
            event.stopPropagation();
          }}
        >
          {!isDesktop && (
            <div
              className={"absolute right-3 top-3"}
              onClick={() => {
              dispatch(uiSlice.actions.setOpenMenuDrawer(false));
              }}
            >
              <CloseICON
              />
            </div>
          )}

          {/*NOTICE: refactor me*/}
          <div className={twMerge("w-full flex flex-col items-start gap-3", (isDesktop) && "pt-7", (isTablet) && "pt-[72px]", (isMobile) && "pt-[64px]")}>

            <div className={"w-full flex flex-col px-5"}>
              <button
                className="border-solid border-[var(--grayscale-30)] shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.06),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] overflow-hidden bg-[#333333] flex flex-row justify-between pl-3 gap-2 items-start border rounded-lg"
                onClick={() => {
                  onClickToFirstDeposit();
                  close();
                }}
              >
                <div className="flex flex-col mt-px items-start">
                  <div className="text-sm font-medium leading-[20px] text-white">
                    Primeira recarga
                  </div>
                  <div className="font-medium leading-[24px] text-white">
                    +{recharge_first_cashback_rate}
                  </div>
                </div>
                <img
                  src={`assets/${environment.uVersion}/${environment.mvVersion}/genie-initial-charge.png`}
                  className="w-[64px] mt-0 mb-[-38px]"
                />
              </button>
            </div>


            <div className={"w-full flex flex-col px-5"}>
              <button
                className="border-solid border-[var(--grayscale-30)] shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.06),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] overflow-hidden bg-[#333333] flex flex-row justify-between pl-3 gap-2 items-start border rounded-lg"
                onClick={() => {
                  onClickToDepositCashback();
                  close();
                }}
              >
                <div className="flex flex-col mt-px items-start">
                  <div className="text-sm font-medium leading-[20px] text-white">
                    Recarregar
                  </div>
                  <div className="font-medium leading-[24px] text-white">
                    Cashback+{recharge_cashback_rate}
                  </div>
                </div>
                <img
                  src={`assets/${environment.uVersion}/${environment.mvVersion}/genie-recharge-activity.png`}
                  className="w-[60px] mt-0 mb-[-38px]"
                />
              </button>
            </div>

            {/*<div className={"w-full flex flex-col px-5"}>*/}
            {/*  <button*/}
            {/*    className="border-solid border-[var(--grayscale-30)] shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.06),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] overflow-hidden bg-[#333333] flex flex-row justify-between pl-3 gap-0 items-start border rounded-lg"*/}
            {/*    onClick={() => {*/}
            {/*      onClickToDepositCashback();*/}
            {/*      close();*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    <div className="flex flex-col mt-px items-start">*/}
            {/*      <div className="text-sm font-medium leading-[20px] text-white">*/}
            {/*        Bônus de suporte*/}
            {/*      </div>*/}
            {/*      <div className="font-medium leading-[24px] text-white">*/}
            {/*        diário de perdaa*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*    <img*/}
            {/*      src={tabThree}*/}
            {/*      className="w-20 mt-0 mb-[-38px]"*/}
            {/*    />*/}
            {/*  </button>*/}
            {/*</div>*/}



            <div className={"w-full flex flex-col px-5"}>
              <div className="opacity-50 bg-gradient-to-r from-transparent via-white to-transparent h-px"></div>
            </div>


            <div className={"w-full flex flex-col px-5"}>
              <button
                className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.InvitePage,
                })}
                onClick={() => {
                  onClickToInvite();
                  close();
                }}
              >
                <img
                  src={icon＿thumbsup}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Recomendar
                </div>
              </button>
            </div>

            <div className={"w-full flex flex-col px-5"}>
              <button
                className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.VIPGradePage,
                })}
                onClick={() => {
                  onClickToVipGrade();
                  close();
                }}
              >
                <img
                  src={icon＿crownsimple}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Regras VIP
                </div>
              </button>
            </div>

            <div className={"w-full flex flex-col px-5"}>
              <button
                className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.DailySignInPage,
                })}
                onClick={() => {
                  onClickToCheckInDaily();
                  close();
                }}
              >
                <img
                  src={icon＿calendarcheck}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Check-In
                </div>
              </button>
            </div>


            <div className={"w-full flex flex-col px-5"}>
              <button
                className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
                })}
                onClick={() => {
                  onClickToTelegram();
                  close();
                }}
              >
                <img
                  src={icon＿users}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Adicionar Telegrama
                </div>
              </button>
            </div>

            <div className={"w-full flex flex-col px-5"}>
              <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
              })}
              onClick={() => {
                onClickToCompanyProfile();
                close();
              }}
              >
                <img
                  src={icon__buildings}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Sobre Nós
                </div>
              </button>
            </div>

            <div className={"w-full flex flex-col px-5"}>
              <button
                className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
                })}
                onClick={() => {
                  onClickToLicense();
                  close();
                }}
              >
                <img
                  src={icon__files}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Gaming Curaçao
                </div>
              </button>
            </div>

            <div className={"w-full flex flex-col px-5"}>
              <div className={"w-full flex flex-col px-5"}>
                <div className="opacity-50 bg-gradient-to-r from-transparent via-white to-transparent h-px"></div>
              </div>
            </div>

            {label.map((item: IGameType) => {
              console.log("label", item);
              let img;
              if(item === "Slots") {
                img = icon＿slot;
              } else if(item === "Vivo") {
                img = icon＿vivo;
              } else if(item === "Viver") {
                img = icon＿viver;
              } else if(item === "Fishing") {
                img = icon＿fishing;
              }
              return (
                <div className={"w-full flex flex-col px-5"}>
                  <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                  })}
                  onClick={() => {
                    onClickToIndex();
                    dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel(item))
                    scrollToWindowTop();
                    close();
                  }}
                  >
                    <img
                      src={img}
                      className="w-5"
                    />
                    <div className="text-sm font-medium leading-[20px]">
                      {item}
                    </div>
                  </button>
                </div>
              )
            })}
            <div className={"w-full flex flex-col px-5"}>
              <div className="opacity-50 bg-gradient-to-r from-transparent via-white to-transparent h-px"></div>
            </div>
            <div className={"w-full flex flex-col px-5"}>
              <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[var(--grayscale-30)] hover:rounded-lg text-[var(--grayscale-70)] hover:text-[rgb(255,255,255)]", {
                // "bg-[var(--grayscale-30)] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
              })} onClick={() => {
                onClickToIndex();
                dispatch(gameSlice.actions.setIndexPagecurrentSelectLabel('Favoritos'))
                scrollToWindowTop();
                close();
              }}>
                <img
                  alt="icon＿favorite"
                  src={icon＿favorite}
                  className="w-5"
                />
                <div className="text-sm font-medium leading-[20px]">
                  Favoritos
                </div>
              </button>
            </div>

          </div>


          <div className={"w-full flex flex-col px-5"}>
            <button className="shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--grayscale-30)] flex flex-row justify-center pt-2 gap-3 w-full h-10 items-start rounded-lg"
              onClick={props.onClickToDownload}
            >
              <img
                src={icon＿download}
                alt="DownloadSimple"
                id="DownloadSimple"
                className="w-5"
              />
              <div className="text-sm font-medium leading-[20px] text-[var(--grayscale-70)]">
                Download
              </div>
            </button>
          </div>


        </Wraaper>
    </div>
  )
}
