
import { ReactElement, useEffect, useRef, useState } from 'react';
import { tcx } from "../../utils/tcx";
import { environment } from "../../../../environments/environment";
import cx from 'classnames';
import { NoData as CNoData } from './env/u1/NoData';
import { NoData as PNoData } from './env/pernambucana/NoData';
import { NoData as WNoData } from './env/wild/NoData';
import { NoData as RNoData } from './env/u2/NoData';
import { renderByUVersion } from '../../utils/renderByUVersion';

const NoData = (props?:{noDataClassName: string})=> renderByUVersion({
  "u1": <CNoData  />,
  "wild777bet": <WNoData  />,
  "u2": <RNoData className={props?.noDataClassName || ''} />,
}, <PNoData  />
)

interface IColumns {
  title: string | ReactElement;
  name: string;
  key: string;
  render?: (i: any) => ReactElement | string;
  isShow?: boolean;
}

interface ITable {
  dataSource: any[];
  columns: IColumns[];
  fetchData?: () => void;
  className?: string;
  titleStyle?: string;
  contentStyle?: string;
  dataCount: number;
  containerClassName?: string;
  noDataClassName?: string;

}

export const Table = (props: ITable) => {
  const { dataSource, columns } = props;

  const tbodyRef = useRef<HTMLDivElement>(null);
  const [isScrollbarVisible, setIsScrollbarVisible] = useState(false)

  const handleOnScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;

    if (bottom <= 30 && props?.fetchData !== undefined) {
      props?.fetchData()
    }
  }

  useEffect(() => {

    if (tbodyRef?.current?.scrollHeight !== undefined) {
      const scrollbarVisible = tbodyRef?.current?.scrollHeight > tbodyRef?.current?.clientHeight;
      setIsScrollbarVisible(scrollbarVisible);

      // 如果滾軸沒有出現，判斷是否還有資料
      if (!scrollbarVisible &&
        props?.fetchData !== undefined &&
        (Number(props.dataCount) - Number(dataSource.length) > 0)
      ) {
        props?.fetchData();
      }
    }

  }, [dataSource])

  return (
    <div className={tcx('h-full w-full overflow-hidden flex flex-col', props?.containerClassName)}>
      <div className={tcx(`${environment.uVersion}-customTable-thead customTable-thead`, ['customTable-thead-scrollPadding', isScrollbarVisible])}>
        <table className='relative table w-full no-scrollbar table-fixed'>
          <thead className='bg-[var(--table-thead)] text-[var(--table-thead-text)]'>
            {columns?.map((col: any, colIndex: number) => {
              if (col.isShow !== undefined ? col.isShow : true) {
                return (
                  <th key={col.key}
                    className={cx(`p-2 text-center break-normal border-[rgba(255,255,255,0.2)]`,
                      { 'border-r ': colIndex !== columns.length - 1 },
                      props.className,
                      props.titleStyle
                    )}
                    style={{ width: `${col.width !== undefined ? col.width : 'auto'}`
                  }}
                  >
                    {col.title}
                  </th>
                )
              }
            }
            )}
          </thead>
        </table>
      </div>
      <div className={`${environment.uVersion}-customTable-tbody customTable-tbody h-full overflow-y-auto flex-1`} ref={tbodyRef} onScroll={handleOnScroll}>
        <table className={tcx('table-zebra relative table w-full table-fixed')}>
          <tbody className=' bg-[var(--table-tbody)] [&>*:nth-child(even)]:bg-[var(--table-tbody-zebra)] text-[var(--table-tbody-text)]'>
            {dataSource.length === 0 ? <tr>
              <NoData noDataClassName={props?.noDataClassName || ''} />
            </tr> :
              dataSource.map((data: any, index: number) => {
                return <tr key={index}>
                  {columns?.map((col: any, colIndex: number) => {
                    if (col.isShow !== undefined ? col.isShow : true) {
                      return (
                        <td key={col.key + colIndex}
                          className={cx(`py-4 px-3 border-[rgba(255,255,255,0.2)] break-all text-center`,
                            { 'border-r': colIndex !== columns.length - 1 },
                            props.className,
                            props.contentStyle
                          )}
                          style={{ width: `${col.width !== undefined ? col.width : 'auto'}`,
                            maxWidth: col.maxWidth ? col.maxWidth : '100%'
                          }
                        }
                        >
                          {col.render !== undefined ? col.render(data as any) : data[col.name]}
                        </td>
                      )
                    }
                  })}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

