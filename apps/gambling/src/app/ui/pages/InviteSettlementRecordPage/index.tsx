import { SectionContainer } from "../../components/container/SectionContainer";
import moment, { Moment } from "moment/moment";
import { DatePicker } from "antd";
import { Button } from "../../components/Buttons/Button";
import { useAllowLoginRouterRules } from "../../router/useAllowLoginRouterRules";
import { PageOrModalPathEnum } from "../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { useLazyGetUserInviteRewardRecordQuery } from "../../../external";
import React, { useCallback, useEffect, useState } from "react";
import { AppLocalStorage } from "../../../persistant/localstorage";
import { environment } from "../../../../environments/environment";
import { BackNavigation } from "../../components/BackNavigation/BackNavigation";
import { AppLocalStorageKey } from "../../../persistant/AppLocalStorageKey";
import { formatMoney } from "../../utils/formatMoney";
import useBreakpoint from "../../hooks/useBreakpoint";
import RangeDatePicker from "../../components/DatePickers/RangeDatePicker";
import { datePickerStyle } from "../../components/DatePickers/DatePicker";

const { RangePicker } = DatePicker;

const NoData = () => {
  return (
    <td colSpan={2} className=''>
      <div className='p-12'>
        <img style={{ display: 'unset' }} className={'h-[100px] margin-auto'} src={`assets/${environment.assetPrefix}/noData.png`} />
        <div>Nada aqui</div>
      </div>
    </td>
  )
}

export const InviteSettlementRecordPage = () => {
  useAllowLoginRouterRules();

  const navigate = useNavigate();
  const { isMobile } = useBreakpoint();
  const [triggerGetUserInviteReward, { currentData }] = useLazyGetUserInviteRewardRecordQuery();

  const min = moment().subtract(7, 'days');
  const max = moment();
  const dateFormat = 'YYYY-MM-DD hh:mm:ss';
  const [dates, setDates] = useState([min, max]);

  const refresh = useCallback((startTime: string, endTime: string) => {
    if (!AppLocalStorage.getItem(AppLocalStorageKey.userId)) return;
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


  return (
    <div className={"p-4 sm:p-8"}>

      <SectionContainer id={"game-record-section"}>

        <BackNavigation onClick={() => navigate(PageOrModalPathEnum.InvitePage)} />

        <section className={"text-left mb-3 sm:mb-8 flex flex-row justify-between items-center"}>

          {!isMobile &&
            (<section>
              <button className="invisible sm:visible rounded-lg w-full text-xl py-3 px-16 bg-gradient-to-b from-[var(--primary-main-from)] to-[var(--primary-main-to)]" onClick={() => {
                refresh(moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59'));
              }}>Registros de liquidação</button>
            </section>)
          }
          {
            isMobile ?
              (<RangeDatePicker
                min='2023-01-01'
                max={max.format('YYYY-MM-DD')}
                onConfirm={(values: any) => setDates([moment(values[0], 'YYYY-MM-DD'), moment(values[1], 'YYYY-MM-DD')])}
                value={[dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]}
              />) :
              (
                <RangePicker
                  value={[dates[0], dates[1]]}
                  allowClear={false}
                  format="YYYY-MM-DD"
                  onChange={(dates) => {
                    if (dates) {
                      setDates(dates as Moment[]);
                    }
                  }}
                  style={datePickerStyle}
                  disabledDate={(current) => current > max}
                />
              )
          }
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
              {currentData?.rows.length === 0 ? <tr><NoData /></tr> : (
                currentData?.rows.map((itme, index) => {
                  return (
                    <tr>
                      <td className='p-12 border-r border-[rgba(255,255,255,0.2)]'>{itme.updateTime}</td>
                      <td className='p-12'>R$: {formatMoney(itme.reward / 100)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>

          </table>
        </div>
      </SectionContainer>

    </div>

  )
}
