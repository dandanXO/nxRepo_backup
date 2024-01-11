import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";
import { QuestionTipsIcon } from "../../../../../components-bs/Icons/QuestionTipsIcon";
import { ITotal } from "../..";
import useBreakpoint from "../../../../../pageTemplate/hooks/useBreakpoint";
import { Table } from "../../../../../components-bs/Table";


export const DesktopTotalTable = (props: ITotal & { type: string }) => {
  const columns = [
    { title: 'Usuário De Recarga', name: 'numRecharge', key: 'numRecharge', render: (record: any) => record.numRecharge || 0 },
    { title: 'Valor Da Transação Do Jogo', name: 'gameRecharge', key: 'gameRecharge', render: (record: any) => `R$ ${record.gameRecharge || '0,00'}`},
    { title: 'Recompensas De Troca De Jogos', name: 'gameRechargeReward', key: 'gameRechargeReward', render: (record: any) => `R$ ${record.gameRechargeReward || '0,00'}` },
    { title: 'Recompensa Total', name: 'totalReward', key: 'totalReward', render: (record: any) => `R$ ${record.totalReward || '0,00'}` },
  ]
  if(props.type === '1'){
    // 插入index 1 的位置
    columns.splice(1,0, { title: 'Primeira Recarga Recompensas', name: 'firstRecharge', key: 'firstRecharge', render: (record: any) => `R$ ${record.firstRecharge || '0,00' }`})
  }
  return (
    <div className="border border-solid border-[var(--grayscale-40)] overflow-x-auto px-3 md:p-5 shadow-[inset_0px_-4px_4px_0px_rgba(0,_0,_0,_0.25),_inset_0px_4px_4px_0px_rgba(255,_255,_255,_0.25)] bg-[var(--grayscale-20)] rounded-lg">
      <Table 
              className='!bg-[#333333]'
              titleStyle='p-4 text-sm !border-b-0 text-[var(--grayscale-70)]'
              contentStyle='text-base !py-6 text-white '
              columns={columns} 
              dataSource={props?.data !== undefined && props?.data ? [props?.data] : [] } 
              dataCount={0}
              noDataClassName={'!bg-[#333333]'}
            />
    </div>
  );
};
