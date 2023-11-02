import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetUserGameRecordMutation } from '../../../external';
import { AppLocalStorage } from '../../../persistant/localstorage';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { SectionContainer } from '../../components/SectionContainer';
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import { environment } from '../../../../environments/environment';

const { RangePicker } = DatePicker;

export const GameRecordPage = () => {
  useAllowLoginRouterRules();

  const min = moment().subtract(7, 'days');
  const max = moment();
  const dateFormat = 'YYYYMMDD';
  const [dates, setDates] = useState([min, max]);
  const navigate = useNavigate();

  const datePickerStyle = {
    backgroundColor: '#437B5D',
    borderRadius: '10px',
    border: 'none',
    color: '#ffffff',
  };

  const [triggerGetRecord, { data }] = useGetUserGameRecordMutation({});

  useEffect(() => {
    triggerGetRecord({
      dayMin: dates[0].format(dateFormat),
      dayMax: dates[1].format(dateFormat),
      pageNum: 1,
      pageSize: 1000,
      token: AppLocalStorage.getItem('token') || '',
    });
  }, [dates]);

  return (
    <>
      <div className={'flex h-full flex-col p-8'}>
        <SectionContainer
          className="flex h-full flex-col"
          id={'game-record-section'}
        >
          <button
            className={'mb-8 flex flex-row items-center'}
            onClick={() => navigate(PageOrModalPathEnum.IndexPage)}
          >
            <img
              className={'mr-3 h-[21px] w-[21px]'}
              alt={'back'}
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=='
              }
            />
            <span className={'text-2xl text-white'}>Retornar</span>
          </button>

          <section className={'mb-8 text-left'}>
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
            />
          </section>

          <div className="grow overflow-x-auto overflow-y-auto rounded-md">
            <table className="relative w-full text-center">
              {/* head */}
              <thead className="sticky top-0 text-sm">
                <tr style={{ backgroundColor: '#437B5D' }}>
                  <th className="w-1/4 break-words py-2">Nome do jogo</th>
                  <th className="w-1/4 break-words py-2">Tempo</th>
                  <th className="w-1/4 break-words py-2">Valor Da Aposta</th>
                  <th className="w-1/4 break-words py-2">Lucro</th>
                </tr>
              </thead>

              {data?.rows && (
                <tbody className="text-base">
                  {data.rows.map((record, index) => (
                    <tr
                      key={index}
                      className="bg-white py-1 odd:bg-opacity-[0.05] even:bg-opacity-10"
                    >
                      <td className={'flex flex-col items-center'}>
                        <div
                          style={{ width: '50px' }}
                          className="mx-[10px] my-[6px] object-cover"
                        >
                          <img
                            alt="gameLogo"
                            src={`${environment.s3URLImages}/${record.gameId}.jpg`}
                          />
                        </div>
                        <div>{record.gameName}</div>
                      </td>
                      <td>{record.createTime}</td>
                      <td>{parseFloat((record.bet / 100).toFixed(2))}</td>
                      <td>{parseFloat((record.win / 100).toFixed(2))}</td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </SectionContainer>
      </div>
    </>
  );
};
