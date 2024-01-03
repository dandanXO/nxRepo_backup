import moment, { Moment } from "moment/moment";
import { DatePicker } from "antd";
import { useAllowLoginRouterRules } from "../../../../router/hooks/useAllowLoginRouterRules";
import { PageOrModalPathEnum } from "../../../../PageOrModalPathEnum";
import { useNavigate } from "react-router";
import { useLazyGetUserInviteRewardRecordQuery } from "../../../../../external";
import React, { useCallback, useEffect, useState } from "react";
import { AppLocalStorage } from "../../../../../persistant/localstorage";
import { environment } from "../../../../../../environments/environment";
import { BackNavigation } from "../../../../components-bs/BackNavigation/BackNavigation";
import { AppLocalStorageKey } from "../../../../../persistant/AppLocalStorageKey";
import { formatLocaleMoney } from "../../../../utils/format";
import useBreakpoint from "../../../../hooks/useBreakpoint";
import Index from "../../../../components-bs/DatePickers/RangeDatePicker";
import cx from "classnames"
const { RangePicker } = DatePicker;

const NoData = () => {
  return (
    <td colSpan={2} className='!bg-[#333333]'>
      <div className="bg-[#333333] p-2">
        <div className='flex flex-col py-4 justify-center items-center rounded-lg bg-[#333333] border-dashed border-2 border-[#B3B3B3]'>
          <img style={{ display: 'unset' }} alt="" className={'h-[100px] margin-auto'} src={`assets/${environment.assetPrefix}/noData.png`} />
          <div>Nada aqui</div>
        </div>
      </div>
    </td>
  )
}
const NoDataMobile = () => {
  return (
      <div className="bg-[#333333] p-2">
        <div className='flex flex-col py-4 justify-center items-center rounded-lg bg-[#333333] border-dashed border-2 border-[#B3B3B3]'>
          <img style={{ display: 'unset' }} alt="" className={'h-[100px] margin-auto'} src={`assets/${environment.assetPrefix}/noData.png`} />
          <div>Nada aqui</div>
        </div>
      </div>
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
      <div id={"game-record-section"} className="text-white px-4 md:px-24">
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
                <div>
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
                    className="before:translate-y-0.5 before:content-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAcCAYAAACdz7SqAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAF9SURBVHgB7VbRUcMwDJW5/FM2CBMQJiBMAExQmACYgGOClgnSDWADygZhgmSDphOYp0M5mmDXCnGBj767dzo7sl8sKVaI/iustZOYfpqNrsGV0rcC70J+iWMhv+3lxtQFOGFxCiMFz+DbyLgxxrwEV2FBYePita9hHKIVzDvYhontLXhMYfDaJ3Au4xmY4bSdtYln8QqOtbxECbNsx9vQ98V47fJLQhthgwXMghSA76nGzyfKhZPSeBy6Jn05TSkeam1O30gZ0gCm5DiAT7SSXI4Copa7RA/oDxCsXobcUgW4ebfeIxqlPH+AWWM81+ynEhW0grnYRir8GczAJX1dCluhCi9OwHfouWzMeJQLIKfPnNU0AENzmomdcsi52MCjnYpC4AqGT5xStxMNglqU+yTIJz2RqYZ+iCHVy51mJlOlqk+OEeVCgjCHlU/KL9AXvKHu5zReVIRr8hSMpu1pRHfaZb6Bfy9sXBR9DeMR5s8hzu8k8s81QXv8Fj4Axp4rRafIlxYAAAAASUVORK5CYII=')]"
                    style={
                      {
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
                </div>
              )
          }
        </section>

        <div className="overflow-x-auto rounded-lg mb-[80px]">
        {
          isMobile ?
          (currentData?.rows.length === 0 ? <NoDataMobile />:
            <div className='grow h-full overflow-y-auto mt-6 bg-[#333333] rounded-lg px-2'>
              {
                (
                  currentData?.rows.map((record, index: number) => {
                    return (
                        <div
                        key={record.id}
                        className={cx("flex flex-col rounded-lg text-white text-sm",
                          "bg-[#262626] border-[#4d4d4d] my-1 border-solid border-2",
                          {
                            'mt-2': index === 0
                          },
                          {
                            'mb-2': index === currentData?.rows.length-1
                          }
                        )}
                      >
                        <div className={'flex flex-row justify-between border-b-[1px] border-[var(--white-20)] p-2 items-center'}>
                          <div className='font-bold text-[var(--white-40)]'>Hora De Entrada</div>
                          <div>
                            <span className='mr-1'>{moment(record.updateTime).format('DD.MM-YYYY HH:mm:ss')}</span>
                          </div>
                        </div>
                        <div className={'flex flex-row justify-between border-[var(--white-20)] p-2'}>
                          <span className={'text-[var(--white-40)]'}>Bônus</span>
                          <span className={''}>{formatLocaleMoney(record.reward / 100)}</span>
                        </div>
                      </div>
                    )
                  })
                )
              }
            </div>
          )
          :
            <table className="table table-zebra w-full text-center">
            {/* head */}
            <thead>
              <tr>
                <th className='text-[#B3B3B3] !bg-[#333333] p-4 border-[rgba(255,255,255,0.2)]'>Hora De Entrada</th>
                <th className='text-[#B3B3B3] !bg-[#333333] p-4'>Bônus</th>
              </tr>
            </thead>

            <tbody>
              {currentData?.rows.length === 0 ? <tr><NoData /></tr> : (
                currentData?.rows.map((itme, index) => {
                  return (
                    <tr key={index} className="bg-[#4d4d4d]">
                      <td className='!bg-[#333333] py-4 border-[rgba(255,255,255,0.2)]'>{moment(itme.updateTime).format('DD.MM-YYYY HH:mm:ss')}</td>
                      <td className='!bg-[#333333] py-4'>R$: {formatLocaleMoney(itme.reward / 100)}</td>
                    </tr>
                  )
                })
              )}
            </tbody>

          </table>
          }
        </div>
      </div>
  )
}
