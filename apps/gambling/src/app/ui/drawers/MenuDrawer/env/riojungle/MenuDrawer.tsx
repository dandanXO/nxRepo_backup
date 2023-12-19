import {usePageNavigate} from "../../../../hooks/usePageNavigate";
import tenPercent from "./genie-3-wishes_genie3.png"
import twentyPercent from "./genie-3-wishes_genie2.png"
import icon＿calendarcheck from "./icon＿calendarcheck.png";
import icon＿crownsimple from "./icon＿crownsimple.png";

import icon＿telegramlogo from "./icon＿telegramlogo.png";
import icon＿thumbsup from "./icon＿thumbsup.png";
import icon＿users from "./icon＿users.png";

import icon＿favorite from "./icon＿favorite.png";
import icon＿recent from "./icon＿recent.png";
import icon＿download from "./icon＿download.png";

import icon＿slot from "./icon＿slot.png";
import icon＿fishing from "./icon＿fishing.png";
import icon＿vivo from "./icon＿vivo.png";
import icon＿viver from "./icon＿viver.png";
import cx from "classnames";
import {PageOrModalPathEnum} from "../../../../PageOrModalPathEnum";
import {useLocation} from "react-router";

export const MenuDrawer = () => {
  const {
    onClickToFirstDeposit,
    onClickToDepositCashback,
    onClickToInvite,
    onClickToVipGrade,
    onClickToCheckInDaily,
    onClickToTelegram,
    onClickToIndex,
  } = usePageNavigate();

  const location = useLocation();
  return (
    <div
      id="TabBarRoot"
      className="w-[248px] h-[calc(100vh-72px)] bg-[linear-gradient(90deg,_#262626_50%,#333333_100%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col justify-between pb-5 gap-3 items-start overflow-auto"
    >
      <div className="w-full flex flex-col items-start gap-3 pt-3">

        <div className={"w-full flex flex-col px-5"}>
          <button className="border-solid border-[#4d4d4d] shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.06),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] overflow-hidden bg-[#333333] flex flex-row justify-end gap-2 items-start border rounded-lg" onClick={onClickToDepositCashback}>
            <div className="flex flex-col mt-px items-start">
              <div className="text-sm font-medium leading-[20px] text-white">
                Recarregar
              </div>
              <div className="font-medium leading-[24px] text-white">
                Cashback+10%
              </div>
            </div>
            <img
              src={tenPercent}
              className="w-20 mt-0 mb-[-38px]"
            />
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className="border-solid border-[#4d4d4d] shadow-[0px_2px_4px_-1px_rgba(0,_0,_0,_0.06),_0px_4px_6px_-1px_rgba(0,_0,_0,_0.1)] overflow-hidden bg-[#333333] flex flex-row justify-end gap-2 items-start border rounded-lg" onClick={onClickToFirstDeposit}>
            <div className="flex flex-col mt-px items-start">
              <div className="text-sm font-medium leading-[20px] text-white">
                Primeira recarga
              </div>
              <div className="font-medium leading-[24px] text-white">
                +20%
              </div>
            </div>
            <img
              src={twentyPercent}
              className="w-20 mt-0 mb-[-38px]"
            />
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <div className="opacity-50 bg-gradient-to-r from-transparent via-white to-transparent h-px"></div>
        </div>


        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.InvitePage,
          })} onClick={onClickToInvite}>
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
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.VIPGradePage,
          })} onClick={onClickToVipGrade}>
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
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.DailySignInPage,
          })} onClick={onClickToCheckInDaily}>
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
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
          })} onClick={onClickToTelegram}>
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
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
          })} onClick={onClickToTelegram}>
            <img
              src={icon＿telegramlogo}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Gerente
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.TelegramPage,
          })} onClick={onClickToTelegram}>
            <img
              src={icon＿telegramlogo}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Sobre Nós
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <div className={"w-full flex flex-col px-5"}>
            <div className="opacity-50 bg-gradient-to-r from-transparent via-white to-transparent h-px"></div>
          </div>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿slot}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Slots
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿fishing}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Fishing
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿vivo}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Vivo
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿viver}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Viver
            </div>
          </button>
        </div>


        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿favorite}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Favoritos
            </div>
          </button>
        </div>

        <div className={"w-full flex flex-col px-5"}>
          <button className={cx("flex flex-row gap-3 items-start px-4 py-2 hover:bg-[#4D4D4D] hover:rounded-lg text-[#b3b3b3] hover:text-[rgb(255,255,255)]", {
            // "bg-[#4D4D4D] rounded-lg text-[rgb(255,255,255)]": location.pathname === PageOrModalPathEnum.IndexPage,
          })} onClick={onClickToIndex}>
            <img
              src={icon＿recent}
              className="w-5"
            />
            <div className="text-sm font-medium leading-[20px]">
              Recente
            </div>
          </button>
        </div>

      </div>


      <div className={"w-full flex flex-col px-5"}>
        <button className="shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#4d4d4d] flex flex-row justify-center pt-2 gap-3 w-full h-10 items-start rounded-lg">
          <img
            src={icon＿download}
            alt="DownloadSimple"
            id="DownloadSimple"
            className="w-5"
          />
          <div className="text-sm font-medium leading-[20px] text-[#b3b3b3]">
            Download
          </div>
        </button>
      </div>


    </div>
  )
}
