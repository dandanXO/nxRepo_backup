import {SectionContainer} from "../../components/SectionContainer";
import moment, {Moment} from "moment/moment";
import {DatePicker} from "antd";
import {Button} from "../../components/Button";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {useLazyGetUserInviteRewardRecordQuery} from "../../../external";
import {useCallback, useEffect, useState} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";
import NoDataImg from "../../../../assets/noData.png";

const { RangePicker } = DatePicker;

const tableStyle = {
  thead: {
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#498D68',
    color: '#fff',
    border: '0.5px solid #333',
  },
  td: {
    backgroundColor: '#3F7659',
    color: '#fff',
    border: '0.5px solid #333',
  },
};

const NoData = () => {
  return (
    <td colSpan={2} className=''>
      <img className={'h-[100px] margin-auto'} src={NoDataImg} alt="NoData"/>
      <div>Nada aq</div>
    </td>
  )
}

export const InviteSettlementRecordPage = () => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();
  const [triggerGetUserInviteReward, { currentData}] = useLazyGetUserInviteRewardRecordQuery();

  const min = moment().subtract(7, 'days');
  const max = moment();
  const dateFormat = 'YYYY-MM-DD hh:mm:ss';
  const [dates, setDates] = useState([min, max]);

  const refresh = useCallback((startTime: string, endTime: string) => {
    if(!AppLocalStorage.getItem("userId")) return;
    triggerGetUserInviteReward({
      userId: AppLocalStorage.getItem("userId") || "",
      pageNum: "1",
      pageSize: "10000",
      startTime,
      endTime,
    })

  }, [])

  useEffect(() => {
    refresh(dates[0].format(dateFormat), dates[1].format(dateFormat));
  }, [dates])

  const datePickerStyle = {
    backgroundColor: '#437B5D',
    borderRadius: '10px',
    border: 'none',
    color: '#ffffff',
  };

  return (
    <>
      <div className={"p-8"}>

        <SectionContainer id={"game-record-section"}>

          <button className={"flex flex-row mb-8 items-center"}  onClick={() => {
            navigate(PageOrModalPathEnum.InvitePage);
          }}>
            <img className={"w-[21px] h-[21px] mr-3"} alt={"back"} src={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=="}/>
            <span className={"text-white text-2xl"}>Retornar</span>
          </button>

          <section className={"text-left mb-8 flex flex-row justify-between items-center"}>

            <section>
              <Button onClick={() => {
                refresh("2023-10-22 00:00:00", "2023-10-29 23:59:59");
              }}>Registros de liquidação</Button>
            </section>

            <RangePicker
              value={[dates[0], dates[1]]}
              allowClear={false}
              onChange={(dates) => {
                if (dates) {
                  setDates(dates as Moment[]);
                }
              }}
              format={dateFormat}
              style={datePickerStyle}
            />
          </section>

          <div className="overflow-x-auto">
            <table className="table table-zebra w-full text-center">
              {/* head */}
              <thead>
              <tr>
                <th style={tableStyle.th}>Hora De Entrada</th>
                <th style={tableStyle.th}>Bônus</th>
              </tr>
              </thead>

              <tbody>
              {currentData?.rows.length === 0 ? <tr><NoData/></tr> : (
                currentData?.rows.map((itme, index) => {
                  return (
                    <tr>
                      <td style={tableStyle.td}>{itme.updateTime}</td>
                      <td style={tableStyle.td}>R{parseFloat((itme.reward/1000).toFixed(2))}</td>
                    </tr>
                  )
                })
              )}
              </tbody>

            </table>
          </div>


        </SectionContainer>

      </div>

    </>
  )
}
