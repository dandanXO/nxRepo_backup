import {SectionContainer} from "../../components/container/SectionContainer";
import {DatePicker} from "antd";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useGetSignInRecordMutation} from "../../../external";
import {useEffect} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {usePageNavigate} from "../../hooks/usePageNavigate";

const { RangePicker } = DatePicker;

export const DailySignInRecordPage = () => {
  useAllowLoginRouterRules();

  const dateFormat = 'YYYY/MM/DD';
  const navigate = useNavigate();
  const [triggerGetSignInRecord, {data}] = useGetSignInRecordMutation();

  useEffect(() => {
    triggerGetSignInRecord({
      page: 1,
      limit: 1000,
      token: AppLocalStorage.getItem("token") || "",
    })
  }, [])

  const {onClickToCheckInDaily} = usePageNavigate();
  return (
    <>
      <div className={"p-8"}>

        <SectionContainer id={"game-record-section"}>

          <BackNavigation onClick={() => onClickToCheckInDaily()}/>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              {/* head */}
              <thead>
              <tr>
                <th>ID</th>
                <th>Nivel VIP</th>
                <th>Coleta Contínua</th>
                <th>Obter Recompensas</th>
                <th>Tempo</th>
              </tr>
              </thead>

              <tbody>
              {data?.data.map((item, index) => {
                return (
                  <tr>
                    <td>{item.user_id}</td>
                    <td>LV{item.vip_level}</td>
                    <td>{item.days}</td>
                    <td>R${item.bonus}</td>
                    <td>{item.created_at}</td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>



        </SectionContainer>

      </div>

    </>
  )
}



