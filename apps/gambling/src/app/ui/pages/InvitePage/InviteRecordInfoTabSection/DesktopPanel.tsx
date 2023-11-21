import { DesktopColorfulBoard } from "./DesktopColorfulBoard";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { TabItem, Tabs } from "../../../components/TabItem/TabItem";
import { DesktopTotalType } from "./DesktopTotalType";
import { DesktopDailyType } from "./DesktopDailyType";
import { QuestionContainer } from "../index";
import { useNavigate } from "react-router";
import { RecordButton2 } from "../../../components/Buttons/RecordButton";
import { environment } from "apps/gambling/src/environments/environment";
import { CocoTabItem } from "../../../components/TabItem/CocoTabItem";
import cx from 'classnames';

type IDesktopPanel = {
  isProxy: boolean;

  totalRewardData: any;

  totalInviteData: any;
  // mobileTotalPanelMode: any;
  // setMobileTotalPanelMode: (value: "1" | "2" | "3") => void;
  totalPanelMode: any;
  setTotalPanelMode: (value: "1" | "2" | "3") => void;

  dailyData: any;
  // mobileDailyPanelMode: any;
  // setMobileDailyPanelMode: (value: "1" | "2" | "3") => void;
  dailyPanelMode: any;
  setDailyPanelMode: (value: "1" | "2" | "3") => void;
}
export const DesktopPanel = ({
  isProxy,
  totalRewardData,

  totalInviteData,
  // mobileTotalPanelMode,
  // setMobileTotalPanelMode,
  totalPanelMode,
  setTotalPanelMode,

  dailyData,
  // mobileDailyPanelMode,
  // setMobileDailyPanelMode,
  dailyPanelMode,
  setDailyPanelMode,
}: IDesktopPanel) => {

  const navigate = useNavigate();

  // const isCoco777bet = environment.assetPrefix !== 'coco777bet'

  const tabItemProps = (isActive: boolean) => {
    const isCoco777bet = environment.assetPrefix === 'coco777bet'
    if (isCoco777bet) {
      return {
        className: cx('rounded-lg mr-4 whitespace-nowrap', {
          'border border-solid border-[var(--primary-assistant)] text-[var(--primary-assistant)]': !isActive
        }),
        pureColor: true,
        background: "var(--primary-variant)",
        activeBackground: "linear-gradient(180deg, var(--primary-main-from) 0%, var(--primary-main-to) 100%) "
      }
    }

  }
  return (
    <QuestionContainer>
      <DesktopColorfulBoard data={totalRewardData} />
      <section>
        <div className={"text-left text-white text-lg mb-2"}>Dados totals</div>

        <div className={"flex flex-row justify-between items-center"}>

          <div className={"w-[510px] mb-4"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem {...tabItemProps(totalPanelMode === "1")} name={"Promoção nível 1"} active={totalPanelMode === "1"} size={"auto"}
                onClick={() => {
                  setTotalPanelMode("1")
                }}
              />
              <TabItem {...tabItemProps(totalPanelMode === "2")} name={"Promoção nível 2"} active={totalPanelMode === "2"} size={"auto"}
                onClick={() => {
                  setTotalPanelMode("2")
                }} />
              <TabItem {...tabItemProps(totalPanelMode === "3")} name={"Promoção nível 3"} active={totalPanelMode === "3"} size={"auto"}
                onClick={() => {
                  setTotalPanelMode("3")
                }} />
            </Tabs>
          </div>

          <div className={"text-white"}>Atualize a cada 30 minutos</div>
        </div>

        <div className={"mb-4"}>
          <DesktopTotalType isProxy={isProxy} type={totalPanelMode} data={totalInviteData}/>
        </div>

      </section>

      <section>
        <div className={"text-left text-white text-lg mb-2"}>Dados diários</div>

        <div className={"flex flex-row justify-between items-center"}>

          <div className={"w-[510px] mb-4"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem {...tabItemProps(dailyPanelMode === "1")} name={"Promoção nível 1"} active={dailyPanelMode === "1"} size={"auto"} onClick={() => {
                setDailyPanelMode("1")
              }}
              />
              <TabItem {...tabItemProps(dailyPanelMode === "2")} name={"Promoção nível 2"} active={dailyPanelMode === "2"} size={"auto"} onClick={() => {
                setDailyPanelMode("2")
              }} />
              <TabItem {...tabItemProps(dailyPanelMode === "3")} name={"Promoção nível 3"} active={dailyPanelMode === "3"} size={"auto"} onClick={() => {
                setDailyPanelMode("3")
              }} />
            </Tabs>
          </div>

          <div className={"text-white"}>Atualize a cada 30 minutos</div>
        </div>

        <div className={"mb-4"}>
          <DesktopDailyType isProxy={isProxy} type={dailyPanelMode} records={dailyData}/>
        </div>

      </section>
    </QuestionContainer>
  )
}
