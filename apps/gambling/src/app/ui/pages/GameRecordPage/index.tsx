import { DatePicker } from 'antd';
import moment, { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetUserGameRecordMutation } from '../../../external';
import { AppLocalStorage } from '../../../persistant/localstorage';
import { PageOrModalPathEnum } from '../../PageOrModalPathEnum';
import { SectionContainer } from '../../components/SectionContainer';
import {useAllowLoginRouterRules} from "../../router/useAllowLoginRouterRules";
import { environment } from 'apps/gambling-dashboard/src/environments/environment.prod.cat777bet';

const tableStyle = {
  thead: {
    borderCollapse: 'collapse',
  },
};


const { RangePicker } = DatePicker;

export const GameRecordPage = () => {
  useAllowLoginRouterRules();

  const min = moment().subtract(7, 'days');
  const max = moment();
  const dateFormat = 'YYYYMMDD';
  const [dates, setDates] = useState([min, max]);
  const navigate = useNavigate();

  const datePickerStyle = {
    backgroundColor: 'var(--table-main)',
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
      <div className={'flex h-full flex-col p-4 md:p-8'}>
        <SectionContainer
          className="flex h-full flex-col"
          id={'game-record-section'}
        >
          <button
            className={'flex flex-row items-center mb-4'}
            onClick={() => navigate(PageOrModalPathEnum.IndexPage)}
          >
            <img
              className={'mr-3 h-[21px] w-[21px]'}
              alt={'back'}
              src={
                'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAkCAMAAADfNcjQAAAAZlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Vn2moAAAAIXRSTlMA5QjW6825oZSHeFMpIRoUD/Xw397dxMOurWtpXUI9MzAmTIk1AAAAlElEQVQ4y7XURxbEIAwDUBzS+/RJD/e/ZKIDKFqF7ec9wLZwd63KrLryMYRgF16eHjz3Ah7v1HO41dQz+KdhHP3hvqWewpOOef+F/3rmXQJPI+athw/Umzc8Y+xqg+fUtxheUF+f8JL68oBP1N0LPhMkG+gR+pL6mbpQutS6WbrdemD0yOmh1WOvg6Ojp8Or468/kAMmXBWDCW3GHwAAAABJRU5ErkJggg=='
              }
            />
          </button>

          <span className={'text-2xl text-white mb-4 text-left'}>Registro do jogo</span>

          <section className={'mb-4 text-left text-white'}>
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
            <table className="table table-zebra w-full text-center" style={{
              tableLayout: "fixed"
            }}>
              {/* head */}
              <thead className="sticky top-0">
                <tr>
                  <th className="w-1/4 break-words md:p-4">Nome do jogo</th>
                  <th className="w-1/4 break-words md:p-4">Tempo</th>
                  <th className="w-1/4 break-words md:p-4">Valor Da Aposta</th>
                  <th className="w-1/4 break-words md:p-4">Lucro</th>
                </tr>
              </thead>

              {data?.rows && (
                <tbody className="">
                  {data.rows.map((record, index) => (
                    <tr
                      key={index}
                      className={"px-1"}
                      // className="py-1 odd:bg-opacity-[0.05] even:bg-opacity-10"
                    >
                      <td className={"p-0 md:p-4"}>
                        <div
                          style={{ width: '50px', margin: "auto" }}
                          className="hidden md:block mx-[10px] my-[6px] object-cover"
                        >
                          <img
                            alt="gameLogo"
                            src={`${environment.s3URLImages}/${record.gameId}.jpg`}
                          />
                        </div>
                        <div style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          padding: "0 10px",
                        }}>{record.gameName}</div>
                      </td>
                      <td>
                        <div>{record.createTime.split(" ")[0]}</div>
                        <div>{record.createTime.split(" ")[1]}</div>
                      </td>
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
