import {SectionContainer} from "../../components/container/SectionContainer";
import {DatePicker} from "antd";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {useNavigate} from "react-router";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useGetSignInRecordMutation} from "../../../external";
import {useEffect} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";

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

  return (
    <>
      <div className={"p-8"}>

        <SectionContainer id={"game-record-section"}>

          <button className={"flex flex-row mb-8 items-center"} onClick={() => {
            navigate(PageOrModalPathEnum.DailySignInPage);
          }}>
            <img className={"w-[21px] h-[21px] mr-3"} alt={"back"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=="}/>
            <span className={"text-white text-2xl"}>Coletar cupons</span>
          </button>

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



