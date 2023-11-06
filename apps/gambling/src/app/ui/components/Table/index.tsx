import { tcx } from '../../../../../../app/src/app/modules/ui/tailwindcss';
import { useEffect, useRef } from 'react';

// const columns=[
//   {title:'identificador',name:'identificador',key:'identificador',render:(record:any)=><div className='text-red-500'>{record.Bônus}{record.Estado}</div>},
//   {title:<div className='text-red-500'>{'BônusBônusBônus'}</div>,name:'Bônus',key:'Bônus'},
//   {title:'Método De Depósito',name:'Método',key:'Método'},
//   {title:'Estado Do Depósito',name:'Estado',key:'Estado'},
//   {title:'Tempo',name:'Tempo',key:'Tempo'},
// ]

// const data=[
//   {identificador:2111111111,Bônus:211111111111,Método:3,Estado:4,Tempo:5},
//   {identificador:11,Bônus:22,Método:33,Estado:44,Tempo:55},
//   {identificador:12,Bônus:23,Método:34,Estado:45,Tempo:56},
//   {identificador:13,Bônus:24,Método:35,Estado:46,Tempo:57},
//   {identificador:14,Bônus:24,Método:36,Estado:47,Tempo:58},
//   {identificador:1,Bônus:2,Método:3,Estado:4,Tempo:5},
//   {identificador:11,Bônus:22,Método:33,Estado:44,Tempo:55},
//   {identificador:12,Bônus:23,Método:34,Estado:45,Tempo:56},
//   {identificador:13,Bônus:24,Método:35,Estado:46,Tempo:57},
//   {identificador:14,Bônus:24,Método:36,Estado:47,Tempo:58},
//   {identificador:1,Bônus:2,Método:3,Estado:4,Tempo:5},
//   {identificador:11,Bônus:22,Método:33,Estado:44,Tempo:55},
//   {identificador:12,Bônus:23,Método:34,Estado:45,Tempo:56},
//   {identificador:13,Bônus:24,Método:35,Estado:46,Tempo:57},
//   {identificador:14,Bônus:24,Método:36,Estado:47,Tempo:588},
// ]
export const Table = (props: any) => {
  const { dataSource, columns } = props;

  const tbodyRef = useRef<HTMLDivElement>(null);

  const handleOnScroll = (e: any) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight;

    if (bottom <= 30 && props?.fetchData!==undefined) {
      props?.fetchData()
    }
  }

  return (
    <div className={tcx('h-full w-full')}>
      <div className=''>
        <table className='relative table w-full no-scrollbar table-fixed '>
          <thead className=''>
            {columns?.map((col: any, colIndex: number) => (
              <th key={col.key}
                className={tcx('p-2 border-b border-white border-opacity-20 sm:break-all' ,
                  ['border-r', colIndex !== columns.length - 1],
                  props.className,
                  props.titleStyle
                )}>
                {col.title}
              </th>
            ))}
          </thead>
        </table>
      </div>
      <div className='h-4/5 overflow-auto  no-scrollbar' ref={tbodyRef} onScroll={handleOnScroll}>
        <table className={tcx('table-zebra relative table w-full table-fixed')}>
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
                        props.className,
                        props.contentStyle
                      )}>
                      {col.render !== undefined ? col.render(data) : data[col.name]}
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


// const tableColumns = [
//   { title: 'identificador', name: 'identificador', key: 'identificador' },
//   { title: 'Bônus', name: 'Bônus', key: 'Bônus' },
//   { title: 'Método De Depósito', name: 'Método', key: 'Método' },
//   { title: 'Estado Do Depósito', name: 'Estado', key: 'Estado' },
//   { title: 'Tempo', name: 'Tempo', key: 'Tempo' },
// ]
// return (
//   <div className='h-[25vh]'>
//     <Table columns={tableColumns} dataSource={[
//       { identificador: 2111111111, Bônus: 211111111111, Método: 3, Estado: 4, Tempo: 5 },
//       { identificador: 11, Bônus: 22, Método: 33, Estado: 44, Tempo: 55 },
//       { identificador: 12, Bônus: 23, Método: 34, Estado: 45, Tempo: 56 },
//       { identificador: 13, Bônus: 24, Método: 35, Estado: 46, Tempo: 57 },
//       { identificador: 14, Bônus: 24, Método: 36, Estado: 47, Tempo: 58 },
//       { identificador: 1, Bônus: 2, Método: 3, Estado: 4, Tempo: 5 },
//       { identificador: 11, Bônus: 22, Método: 33, Estado: 44, Tempo: 55 },
//       { identificador: 12, Bônus: 23, Método: 34, Estado: 45, Tempo: 56 },
//       { identificador: 13, Bônus: 24, Método: 35, Estado: 46, Tempo: 57 },
//       { identificador: 14, Bônus: 24, Método: 36, Estado: 47, Tempo: 58 },
//       { identificador: 1, Bônus: 2, Método: 3, Estado: 4, Tempo: 5 },
//       { identificador: 11, Bônus: 22, Método: 33, Estado: 44, Tempo: 55 },
//       { identificador: 12, Bônus: 23, Método: 34, Estado: 45, Tempo: 56 },
//       { identificador: 13, Bônus: 24, Método: 35, Estado: 46, Tempo: 57 },
//       { identificador: 14, Bônus: 24, Método: 36, Estado: 47, Tempo: 588 },
//     ]} />
//   </div>
// )