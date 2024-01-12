// import { ReactElement, useState } from "react";
// import { QuestionCircleFilled, QuestionCircleOutlined } from "@ant-design/icons";
// import { ITabType } from "./index";

// import { CommonTableTabG } from "../../../components/TabItem/CommonTableTabG";
// import { TabItem } from "../../../components/TabItem/TabItem";
// import ConfirmDrawer from "../../../components/Drawers/ConfirmDrawer";

// import { renderByPlatform } from "../../../utils/renderByPlatform";
// import { MobileBlueBackgroundShadowContainer as PMobileBlueBackgroundShadowContainer } from "./env/pernambucana/MobileBlueBackgroundShadowContainer";
// import { MobileBlueBackgroundShadowContainer as WMobileBlueBackgroundShadowContainer } from "./env/wild/MobileBlueBackgroundShadowContainer";
// import { MobileBlueBackgroundShadowContainer as CMobileBlueBackgroundShadowContainer } from "./env/u1/MobileBlueBackgroundShadowContainer";
// import { environment } from "apps/gambling/src/environments/environment";
// import { tabItemProps } from "./env/u1/tabItemProps";
// import cx from 'classnames';
// import { MobileTableContainer } from "./env/components/MobileTableContainer";
// import { QuestionTipsIcon } from "../../../components/Icons/QuestionTipsIcon";


// const MobileBlueBackgroundShadowContainer = renderByPlatform({
//   "wild777bet": WMobileBlueBackgroundShadowContainer,
//   "coco777bet": CMobileBlueBackgroundShadowContainer,
// }, PMobileBlueBackgroundShadowContainer)



// export interface ITotal {
//   data: {
//     // 總邀請獎勵
//     totalReward: string;
//     // 邀請玩家總數
//     numRecharge: number;
//     // 邀請首充獎勵
//     firstRecharge?: string;
//     // 邀請玩家總流水
//     gameRecharge: string;
//     // 邀請玩家總流水獎金
//     gameRechargeReward: string;

//     dividendos: string;
//   };
//   isProxy: boolean;
// }

// type IMobileCommonBlueTable = ITabType & ITotal;

// export type IMobileTotalTable = ITabType & ITotal;


// export const MobileCommonBlueTotalTable = (props: IMobileCommonBlueTable) => {
//   const [inviteBonusInfoOpen, setInviteBonusInfoOpen] = useState(false)

//   const isCoco777bet = environment.assetPrefix === 'coco777bet'
//   const TableTabItem = isCoco777bet ? TabItem : CommonTableTabG;
//   return (
//     <MobileBlueBackgroundShadowContainer className={"flex flex-col rounded-2xl pb-2 text-[#ffffff] text-left"}>
//       <div className={cx("flex flex-row text-lg font-bold justify-around mb-2")}>
//         <TableTabItem  {...tabItemProps(props.type === "1",'mr-2')} active={props.type === "1"} onClick={() => props.onClick("1")} name={'Nível 1'} >Nível 1</TableTabItem>
//         <TableTabItem  {...tabItemProps(props.type === "2",'mr-2')} active={props.type === "2"} onClick={() => props.onClick("2")} name={'Nível 2'} >Nível 2</TableTabItem>
//         <TableTabItem  {...tabItemProps(props.type === "3")} active={props.type === "3"} onClick={() => props.onClick("3")} name={'Nível 3'} >Nível 3</TableTabItem>
//       </div>

//       <MobileTableContainer>
//         {props.isProxy && (
//           <div className={"flex flex-row justify-end"}>
//             <span className={"text-xs text-[var(--secondary-assistant)]"}>Dividends: R$ {props.data.dividendos || "0.00"}</span>
//           </div>
//         )}
//         {/* data: {
//         numRecharge: number;
//         firstRecharge?: string;
//         gameRecharge: string;
//         gameRechargeReward: string;
//         totalReward:string;
//       } */}
//         <div className={"flex flex-col mb-2"}>
//           <span className={"text-xl text-[#ffffff]"}>R$ {props.data.totalReward}</span>
//           <span className="text-xs font-hairline">Obter bônus</span>
//         </div>

//         {props.type === "1" && (
//           <div className={"flex flex-row justify-around items-center mb-5"}>
//             <div className={"flex flex-col flex-1 justify-center"}>
//               <span className={"text-sm text-[#ffffff]"}>{props.data.numRecharge || 0}</span>
//               <span className="text-xs font-hairline">Usuário de recarga</span>
//             </div>

//             <div className={"flex flex-col flex-1 justify-center"}>
//               <span className={"text-sm text-[#ffffff]"}>R$ {props.data.firstRecharge}</span>
//               <span className="text-xs font-hairline">Obter bônus</span>
//             </div>
//           </div>
//         )}

//         <div className={"flex flex-row justify-around mb-2"}>
//           <div className={"flex flex-col flex-1 justify-center"}>
//             <span className={"text-sm text-[#ffffff]"}>R$ {props.data.gameRecharge}</span>
//             <span className="text-xs font-hairline">Valor da transação do jogo</span>
//           </div>

//           <div className={"flex flex-col flex-1"} onClick={() => setInviteBonusInfoOpen(true)}>
//             <div className='flex items-center  justify-center'>
//               <span className={"text-sm text-[#ffffff]"}>R$ {props.data.gameRechargeReward}</span>
//               <QuestionTipsIcon  className="text-xs ml-1 self-baseline" />
//             </div>
//             <span className="text-xs font-hairline">Obter bônus</span>
//             {
//               inviteBonusInfoOpen && (
//                 <ConfirmDrawer
//                   onClose={() => setInviteBonusInfoOpen(false)}
//                   buttonText='Eu vejo'
//                   title='Descrição detalhada'
//                   content='As recompensas são liquidadas toda segunda-feira'
//                 />
//               )
//             }
//           </div>
//         </div>
//       </MobileTableContainer>
//     </MobileBlueBackgroundShadowContainer>
//   )
// }
