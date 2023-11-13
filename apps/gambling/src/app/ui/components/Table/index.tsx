
import { ReactElement, useEffect, useRef, useState } from 'react';
import {tcx} from "../../utils/tcx";


interface IColumns {
  title: string;
  name: string;
  key: string;
  render?: (i: any) => ReactElement;
}

interface ITable {
  dataSource: any[];
  columns: IColumns[];
  fetchData?: () => void;
  className?: string;
  titleStyle?: string;
  contentStyle?: string;
  dataCount: number;

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
    <div className={tcx('h-full w-full min-w-[500px] ')}>
      <div className={tcx(['pr-[3px]', isScrollbarVisible])}>
        <table className='relative table w-full no-scrollbar table-fixed '>
          <thead className=''>
            {columns?.map((col: any, colIndex: number) => (
              <th key={col.key}
                className={tcx('p-2 border-b border-white border-opacity-20 sm:break-all',
                  ['border-r', colIndex !== columns.length - 1],
                  [`w-[${col.width}]`, col.width !== undefined],
                  props.className,
                  props.titleStyle
                )}>
                {col.title}
              </th>
            ))}
          </thead>
        </table>
      </div>
      <div className='h-4/5 overflow-y-auto' ref={tbodyRef} onScroll={handleOnScroll}>
        <table className={tcx('table-zebra relative table w-full table-fixed ')}>
          <tbody className=''>
            {dataSource.length === 0 ? <tr>
              <td className='py-10'>
                no data
              </td>
            </tr> :
              dataSource.map((data: any) => {
                return <tr>
                  {columns?.map((col: any, colIndex: number) => (
                    <td key={col.key + colIndex}
                      className={tcx('p-2 border-white border-opacity-20 sm:break-all',
                        ['border-r', colIndex !== columns.length - 1],
                        [`w-[${col.width}]`, col.width !== undefined],
                        props.className,
                        props.contentStyle
                      )}>
                      {col.render !== undefined ? col.render(data as any) : data[col.name]}
                    </td>
                  ))}
                </tr>
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

