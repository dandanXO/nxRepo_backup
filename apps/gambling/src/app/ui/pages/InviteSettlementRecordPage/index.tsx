import {SectionContainer} from "../../components/container/SectionContainer";
import moment, {Moment} from "moment/moment";
import {DatePicker} from "antd";
import {Button} from "../../components/Buttons/Button";
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import {PageOrModalPathEnum} from "../../PageOrModalPathEnum";
import {useNavigate} from "react-router";
import {useLazyGetUserInviteRewardRecordQuery} from "../../../external";
import React, {useCallback, useEffect, useState} from "react";
import {AppLocalStorage} from "../../../persistant/localstorage";
import {environment} from "../../../../environments/environment";
import {BackNavigation} from "../../components/BackNavigation/BackNavigation";
import {AppLocalStorageKey} from "../../../persistant/AppLocalStorageKey";
import { formatMoney } from "../../utils/formatMoney";

const { RangePicker } = DatePicker;

const NoData = () => {
  return (
    <td colSpan={2} className=''>
      <div className='p-12'>
        <img style={{display: 'unset'}} className={'h-[100px] margin-auto'} src={`assets/${environment.assetPrefix}/noData.png`} />
        <div>Nada aqui</div>
      </div>
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
    if(!AppLocalStorage.getItem(AppLocalStorageKey.userId)) return;
    triggerGetUserInviteReward({
      userId: AppLocalStorage.getItem(AppLocalStorageKey.userId) || "",
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
    backgroundColor: 'var(--table-main)',
    borderRadius: '10px',
    border: 'none',
    color: '#ffffff',
  };

  return (
    <>
      <div className={"p-8"}>

        <SectionContainer id={"game-record-section"}>

          <BackNavigation onClick={() => navigate(PageOrModalPathEnum.InvitePage)}/>

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

          <div className="overflow-x-auto rounded-xl">
            <table className="table table-zebra w-full text-center">
              {/* head */}
              <thead>
                <tr>
                  <th className='p-4 border-r border-[rgba(255,255,255,0.2)]'>Hora De Entrada</th>
                  <th className='p-4'>Bônus</th>
                </tr>
              </thead>

              <tbody>
              {currentData?.rows.length === 0 ? <tr><NoData/></tr> : (
                currentData?.rows.map((itme, index) => {
                  return (
                    <tr>
                      <td className='p-12 border-r border-[rgba(255,255,255,0.2)]'>{itme.updateTime}</td>
                      <td className='p-12'>R$: {formatMoney(itme.reward/100)}</td>
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
