import { DesktopBoard } from "./components/DesktopBoard";
import { PageOrModalPathEnum } from "../../../PageOrModalPathEnum";
import { TabItem, Tabs } from "../../../components/TabItem/TabItem";
import { DesktopTotalType } from "./DesktopTotalType";
import { DesktopDailyType } from "./DesktopDailyType";
import { QuestionContainer } from "../index";
import { useNavigate } from "react-router";
import { RecordButton2 } from "../../../components-bs/Buttons/RecordButton";
import { environment } from "apps/gambling/src/environments/environment";
import { CocoTabItem } from "../../../components/TabItem/CocoTabItem";
import cx from 'classnames';
import { tabItemProps } from "./env/coco/tabItemProps";
import { DesktopTotalTable } from "./components/DesktopTotalTable";
import { DesktopDailyTable } from "./components/DesktopDailyTable";
import { PageContainer } from "../../../components-bs/PageContainer";

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

  return (
    <PageContainer>
      <DesktopBoard data={totalRewardData} />
      <section>
        <div className={"text-left text-white text-lg mb-2 font-bold"}>Dados totals</div>

        <div className={"flex flex-row justify-between items-center"}>

          <div className={"w-[510px] mb-4"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem {...tabItemProps(totalPanelMode === "1",'mr-5')} name={"Promoção nível 1"} active={totalPanelMode === "1"} size={"auto"}
                onClick={() => {
                  setTotalPanelMode("1")
                }}
              />
              <TabItem {...tabItemProps(totalPanelMode === "2",'mr-5')} name={"Promoção nível 2"} active={totalPanelMode === "2"} size={"auto"}
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
          <DesktopTotalTable isProxy={isProxy} type={totalPanelMode} data={totalInviteData}/>
        </div>

      </section>

      <section>
        <div className={"text-left text-white text-lg mb-2 font-bold"}>Dados diários</div>

        <div className={"flex flex-row justify-between items-center"}>

          <div className={"w-[510px] mb-4"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem {...tabItemProps(dailyPanelMode === "1",'mr-5')} name={"Promoção nível 1"} active={dailyPanelMode === "1"} size={"auto"} onClick={() => {
                setDailyPanelMode("1")
              }}
              />
              <TabItem {...tabItemProps(dailyPanelMode === "2",'mr-5')} name={"Promoção nível 2"} active={dailyPanelMode === "2"} size={"auto"} onClick={() => {
                setDailyPanelMode("2")
              }} />
              <TabItem {...tabItemProps(dailyPanelMode === "3",'mr-5')} name={"Promoção nível 3"} active={dailyPanelMode === "3"} size={"auto"} onClick={() => {
                setDailyPanelMode("3")
              }} />
            </Tabs>
          </div>

          <div className={"text-white"}>Atualize a cada 30 minutos</div>
        </div>

        <div className={"mb-4"}>
          <DesktopDailyTable isProxy={isProxy} type={dailyPanelMode} records={dailyData}/>
        </div>

      </section>
    </PageContainer>
  )
}
