import { DesktopBoard } from "../../components/DesktopBoard";
import { TabItem, Tabs } from "../../../../../components/TabItem/TabItem";
import { useNavigate } from "react-router";
import { environment } from "apps/gambling/src/environments/environment";
import cx from 'classnames';
import { tabItemProps } from "./tabItemProps";
import { DesktopDailyTable } from "./DesktopDailyTable";
import { IDesktopPanel } from "../..";
import { Container } from "apps/gambling/src/app/ui/components/container/Container";
import { DesktopTotalTable } from "./DesktopTotalTable";

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
    <Container>
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
    </Container>
  )
}
