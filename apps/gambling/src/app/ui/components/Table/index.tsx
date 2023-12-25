
import { ReactElement, useEffect, useRef, useState } from 'react';
import { tcx } from "../../utils/tcx";
import { environment } from "../../../../environments/environment";
import cx from 'classnames'

const NoData = () => {
  return (
    <td className='flex flex-col justify-center items-center py-[50px] gap-1'>
      <img className={'h-[100px]'} alt="NoData" src={`assets/${environment.assetPrefix}/noData.png`} />
      <div className='text-lg font-medium'>Nada aqui</div>
    </td>
  )
}

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
      <div className={tcx('customTable-thead', ['pr-[3px]', isScrollbarVisible])}>
        <table className='relative table w-full no-scrollbar table-fixed'>
          <thead className=''>
            {columns?.map((col: any, colIndex: number) => {
              if (col.isShow !== undefined ? col.isShow : true) {
                return (
                  <th key={col.key}
                    className={cx(`p-2 text-center sm:break-all border-[rgba(255,255,255,0.2)]`,
                      { 'border-r ': colIndex !== columns.length - 1 },
                      props.className,
                      props.titleStyle
                    )}
                    style={{ width: `${col.width !== undefined ? col.width : 'auto'}` }}
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
      <div className='customTable-tbody h-full overflow-y-auto flex-1' ref={tbodyRef} onScroll={handleOnScroll}>
        <table className={tcx('table-zebra relative table w-full table-fixed ')}>
          <tbody className=''>
            {dataSource.length === 0 ? <tr>
              <NoData />
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
                          style={{ width: `${col.width !== undefined ? col.width : 'auto'}` }}
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

