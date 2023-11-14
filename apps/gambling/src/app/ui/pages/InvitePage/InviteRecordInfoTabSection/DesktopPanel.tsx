import {DesktopColorfulBoard} from "./env/pernambucana/DesktopColorfulBoard";
import {PageOrModalPathEnum} from "../../../PageOrModalPathEnum";
import {TabItem, Tabs} from "../../../components/TabItem";
import {DesktopTotalType} from "./env/pernambucana/DesktopTotalType";
import {DesktopDailyType} from "./env/pernambucana/DesktopDailyType";
import {QuestionContainer} from "../index";
import {useNavigate} from "react-router";
import {RecordButton2} from "../../../components/Buttons/RecordButton";

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
    <QuestionContainer>
      <DesktopColorfulBoard data={totalRewardData}/>

      <section className={"flex flex-row justify-end mb-4"}>
        <RecordButton2
          onClick={() => {
            navigate(PageOrModalPathEnum.InviteSettlementRecordPage);
          }}
          className={"text-white px-4 py-2"}>Registro</RecordButton2>
      </section>

      <section>
        <div className={"text-left text-white text-lg mb-2"}>Dados totals</div>

        <div className={"flex flex-row justify-between items-center"}>

          <div className={"w-[510px] mb-4"}>
            <Tabs className={"game-type-tab-list"}>
              <TabItem name={"Promoção nível 1"} active={totalPanelMode === "1"} size={"auto"} onClick={() => {
                setTotalPanelMode("1")
              }}
              />
              <TabItem name={"Promoção nível 2"} active={totalPanelMode === "2"} size={"auto"} onClick={() => {
                setTotalPanelMode("2")
              }}/>
              <TabItem name={"Promoção nível 3"} active={totalPanelMode === "3"} size={"auto"} onClick={() => {
                setTotalPanelMode("3")
              }}/>
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
              <TabItem name={"Promoção nível 1"} active={dailyPanelMode === "1"} size={"auto"} onClick={() => {
                setDailyPanelMode("1")
              }}
              />
              <TabItem name={"Promoção nível 2"} active={dailyPanelMode === "2"} size={"auto"} onClick={() => {
                setDailyPanelMode("2")
              }}/>
              <TabItem name={"Promoção nível 3"} active={dailyPanelMode === "3"} size={"auto"} onClick={() => {
                setDailyPanelMode("3")
              }}/>
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
