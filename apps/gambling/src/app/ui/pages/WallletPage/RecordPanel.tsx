import { useEffect, useState } from 'react';

import { SectionContainer } from '../../components/container/SectionContainer'
import useBreakpoint from '../../hooks/useBreakpoint';
import { DepositMobileTable, WithdrawMobileTable } from './MobileTable';
import { RecordPanelDeposit } from './RecordPanelDeposit';
import { RecordPanelWithdraw } from './RecordPanelWithdraw';
import cx from "classnames";
import {RecordButton,RecordButton2} from "../../components/Buttons/RecordButton";
import { renderByPlatform } from '../../utils/renderByPlatform';
import { RecordButton as CRecordButton } from '../../components/Buttons/env/coco/RecordButton';

type IRecordPanel = {
  recordPanelMode: 'deposit' | 'withdraw';
}


const RecordTabButton = renderByPlatform({
  "wild777bet": RecordButton,
  "coco777bet": CRecordButton,
}, RecordButton)



export const RecordPanel = (props: IRecordPanel) => {
  const [selectedValueIndex, setSelectedValueIndex] = useState(0);

  const [recordPanelMode, setRecordPanelMode] = useState<
    'deposit' | 'withdraw'
  >('deposit');

  useEffect(() => {
    if(props.recordPanelMode) {
      setRecordPanelMode(props.recordPanelMode);
    }
  }, [props.recordPanelMode])

  const { isMobile } = useBreakpoint();

  return (
    <SectionContainer id={'record-section'}>
      {/*{isMobile && <BlueBoard />}*/}

      {/* {isMobile && (
        <TotalSectionContainer/>
      )} */}

      <section className={cx('button-list flex flex-row mb-2',{"md:mb-4":!isMobile})}>
        <RecordTabButton
          className={cx("py-1 px-3.5 md:py-2 md:px-6 flex-none")}
          active={recordPanelMode === 'deposit'}
          onClick={() => {
            setRecordPanelMode('deposit');
          }}
        >
          Depósito
        </RecordTabButton>
        <RecordTabButton
          className={cx("py-1 px-3.5 md:py-2 md:px-6 flex-none")}
          active={recordPanelMode === 'withdraw'}
          onClick={() => {
            setRecordPanelMode('withdraw');
          }}
        >
          Retirar
        </RecordTabButton>
      </section>

      {isMobile && recordPanelMode === 'deposit' && (
        <DepositMobileTable />
      )}
      {isMobile && recordPanelMode === 'withdraw' && (
        <WithdrawMobileTable  />
      )}

      {/*<section className={"table"}>*/}
      {/*  <section className={"flex flex-row"}>*/}
      {/*    <div className={"text-white border-[1px] border-white"}>identificador </div>*/}
      {/*    <div className={"text-white border-[1px] border-white"}>Valor</div>*/}
      {/*    <div className={"text-white border-[1px] border-white"}>Bônus</div>*/}
      {/*    <div className={"text-white border-[1px] border-white"}>Método De Depósito</div>*/}
      {/*    <div className={"text-white border-[1px] border-white"}>Estado Do Depósito</div>*/}
      {/*    <div className={"text-white"}>Tempo</div>*/}
      {/*  </section>*/}

      {/*  <section>*/}
      {/*    {([{*/}
      {/*      "identificador": "BB2806ECC6E67271",*/}
      {/*      "Valor": "R$100.00",*/}
      {/*      "Bônus": "R$20.00",*/}
      {/*      "Método De Depósito": "pixpay",*/}
      {/*      "Estado Do Depósito": "Pending",*/}
      {/*      "Tempo": "09.10 13:38",*/}
      {/*    }] as any).map((item: any, index: number) => {*/}
      {/*      return (*/}
      {/*        <section className={"flex flex-row"}>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["identificador"]}</div>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["Valor"]}</div>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["Bônus"]}</div>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["Método De Depósito"]}</div>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["Estado Do Depósito"]}</div>*/}
      {/*          <div className={"text-white border-[1px] border-white"}>{item["Tempo"]}</div>*/}
      {/*          <div className={"text-white"}>Tempo</div>*/}
      {/*        </section>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </section>*/}
      {/*</section>
       */}

      {/*<div className="overflow-x-auto mb-10">*/}
      {/*  <table className="table table-zebra w-full">*/}
      {/*    /!* head *!/*/}
      {/*    <thead>*/}
      {/*    <tr>*/}
      {/*      <th>identificador</th>*/}
      {/*      <th>Valor</th>*/}
      {/*      <th>Bônus</th>*/}
      {/*      <th>Método De Depósito</th>*/}
      {/*      <th>Estado Do Depósito</th>*/}
      {/*      <th>Tempo</th>*/}
      {/*    </tr>*/}
      {/*    </thead>*/}

      {/*    <tbody>*/}
      {/*    /!* noData 1 *!/*/}
      {/*    <tr>*/}
      {/*      <section>*/}
      {/*        <img alt={"no data"} src-={""}/>*/}
      {/*        <div>Nada aqui</div>*/}
      {/*      </section>*/}

      {/*    </tr>*/}
      {/*    </tbody>*/}
      {/*  </table>*/}
      {/*</div>*/}

      {isMobile ? null : recordPanelMode === 'deposit' ? (
        <RecordPanelDeposit />
      ) : (
        <RecordPanelWithdraw />
      )}
    </SectionContainer>
  );
};
