import { SectionContainer } from "../../../../components/container/SectionContainer";
import moment, { Moment } from "moment/moment";
import { DatePicker } from "antd";
import { useAllowLoginRouterRules } from "../../../../router/useAllowLoginRouterRules";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { useLazyGetUserInviteRewardRecordQuery } from "../../../../../external";
import React, { useCallback, useEffect, useState } from "react";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { environment } from "../../../../../../environments/environment";
import { BackNavigation } from "../../../../components/BackNavigation/BackNavigation";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { formatLocaleMoney } from "../../../../utils/format";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import Index from "../../../../components/DatePickers/RangeDatePicker";
import { DragScrollContainer } from '../../../../components/DragScrollContainer';
import { Table } from '../../../../components/Table';
const { RangePicker } = DatePicker;

const NoData = () => {
  return (
    <td colSpan={2} className=''>
      <div className='p-12'>
        <img style={{ display: 'unset' }} alt="" className={'h-[100px] margin-auto'} src={`assets/${environment.assetPrefix}/noData.png`} />
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
      <SectionContainer id={"game-record-section"} className="px-4 md:px-24">
        <BackNavigation
          title={isMobile && <div className={"w-full text-center font-bold"}>Registros de liquidação</div>}
          onClick={() => navigate(PageOrModalPathEnum.InvitePage)}
        />

        <section className={"text-left mt-4 md:mt-5 mb-3 sm:mb-8 flex flex-row justify-between items-center"}>

          {!isMobile &&
            (<section>
              <button className="py-1.5 px-5 mr-2 text-lg shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[#10b98f] flex flex-row  cursor-pointer justify-center items-center rounded-[100px]" onClick={() => {
                refresh(moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'), moment().format('YYYY-MM-DD 23:59:59'));
              }}>Registros de liquidação
                <img className="w-[24px] h-[24px]" alt="reload" src={`assets/${environment.assetPrefix}/Repeat.png`}/>
              </button>
            </section>)
          }
          {
            isMobile ?
              (<Index
                min='2023-01-01'
                max={max.format('YYYY-MM-DD')}
                onConfirm={(values: any) => setDates([moment(values[0], 'YYYY-MM-DD'), moment(values[1], 'YYYY-MM-DD')])}
                value={[dates[0].format('YYYY-MM-DD'), dates[1].format('YYYY-MM-DD')]}
              />) :
              (
                <RangePicker
                  separator = {'-'}
                  value={[dates[0], dates[1]]}
                  allowClear={false}
                  suffixIcon={false}
                  format="YYYY-MM-DD"
                  onChange={(dates) => {
                    if (dates) {
                      setDates(dates as Moment[]);
                    }
                  }}
                  style={
                    {
                      padding: '6px 25px',
                      width: '250px',
                      color: 'white',
                      backgroundColor: '#333333',
                      border: '0px',
                      borderRadius: '100px',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }
                  }
                  disabledDate={(current) => current > max}
                />
              )
          }
        </section>

        <div className="overflow-x-auto rounded-lg mb-[80px]">
          <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr>
                <th className='text-[#B3B3B3] p-4 border-[rgba(255,255,255,0.2)]'>Hora De Entrada</th>
                <th className='text-[#B3B3B3] p-4'>Bônus</th>
              </tr>
            </thead>

            <tbody>
              {currentData?.rows.length === 0 ? <tr><NoData /></tr> : (
                currentData?.rows.map((itme, index) => {
                  return (
                    <tr key={index} className="bg-[#4d4d4d]">
                      <td className='!bg-[#4d4d4d] py-4 border-[rgba(255,255,255,0.2)]'>{moment(itme.updateTime).format('DD.MM-YYYY HH:mm:ss')}</td>
                      <td className='!bg-[#4d4d4d] py-4'>R$: {formatLocaleMoney(itme.reward / 100)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>

          </table>
        </div>
      </SectionContainer>
  )
}
