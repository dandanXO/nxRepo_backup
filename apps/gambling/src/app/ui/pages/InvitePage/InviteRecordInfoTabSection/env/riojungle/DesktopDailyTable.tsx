import { IconTooltip } from "apps/gambling/src/app/ui/components/Tooltips/IconTooltip";
import { QuestionTipsIcon } from "../../../../../components-bs/theme/Icons/QuestionTipsIcon";
import { environment } from "apps/gambling/src/environments/environment";
import { Table } from "apps/gambling/src/app/ui/components/Table";
import { formatLocaleMoney } from "apps/gambling/src/app/ui/utils/format";

interface IDailyType {
  type: string;
  records?: any;
  isProxy: boolean;
}

export const DesktopDailyTable = (props: IDailyType) => {

  const columns = [
    { title: 'Data', name: 'day', key: 'day' },
    { title: 'Usuário De Recarga', name: 'numRecharge', key: 'numRecharge', render: (i: any) => `R$ ${formatLocaleMoney(i.numRecharge)}` },
    { title: 'Primeira Recarga Recompensas', name: 'firstRecharge', key: 'firstRecharge', isShow: props.type === "1", render: (i: any) => `R$ ${formatLocaleMoney(i.firstRecharge)}` },
    { title: 'Valor Da Transação Do Jogo', name: 'gameRecharge', key: 'gameRecharge', render: (i: any) => `R$ ${formatLocaleMoney(i.gameRecharge)}` },
    {
      title: <div className="flex items-center justify-center">
        <div>Recompensas De Troca De Jogos</div>
        <div className='ml-1 self-start'>
          <IconTooltip
            id='game-bonus-tooltip-desktop'
            icon={<QuestionTipsIcon className={'text-base'} />}
            content='As recompensas são liquidadas toda segunda-feira'
          />
        </div>
      </div>,
      name: 'gameRechargeReward', key: 'gameRechargeReward', render: (i: any) => `R$ ${formatLocaleMoney(i.gameRechargeReward)}`
    },
    { title: 'Recompensa Total', name: 'totalReward', key: 'totalReward', render: (i: any) => `R$ ${formatLocaleMoney(i.totalReward)}` },
  ]

  return (
    <div className=" riojungle777bet-table overflow-x-auto text-white text-center rounded-xl  p-5 bg-[#333]" >
      <Table
        containerClassName={`min-w-[500px] max-h-[400px]`}
        className={'w-full overflow-x-auto !bg-[#333] border-r-0 '}
        titleStyle={`text-[#B3B3B3] font-normal text-xs lg:text-sm`}
        contentStyle={`border-b text-sm`}
        dataSource={props.records !== undefined && props.records?.length > 0 ? props.records : []}
        columns={columns}
        dataCount={0}
      />
    </div>
  )
}
