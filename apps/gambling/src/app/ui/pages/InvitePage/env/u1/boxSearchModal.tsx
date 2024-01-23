import {ReactNode, useEffect} from 'react';
import {
  useGetBoxInfoMutation
} from "../../../../../external";
import { Table } from "../../../../components-bs/Table";


type interfaceProps = {
  isOpen: boolean;
  children?: ReactNode;
  onClose?: ()=> void;
}

const Modal = (props: interfaceProps) => {
  const [triggerGetBoxInfo, {data:boxInfoRes}] = useGetBoxInfoMutation();
  const {isOpen, onClose} = props
  const columns = [
    { title: 'Contas de subordinados', name: 'phone', key: 'phone' },
    { title: 'Hora de registo', name: 'registerTime', key: 'registerTime' },
    { title: 'Válido ou não', name: 'isEffective', key: 'isEffective', render:(record: boolean)=> record ? (<span>Eficiente</span>) : (<span>Inválido</span>) },
    { title: 'Condições válidas', name: 'condition', key: 'condition' },
  ]

  useEffect(()=>{
    triggerGetBoxInfo({token: localStorage.getItem(localStorage.token) || ''})
  }, [])



  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex justify-center items-center">
      <div className="bg-[var(--background-primary)] p-5 rounded-lg w-10/12">
        <button 
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700"
          onClick={onClose}
        >
          Close
        </button>
        <Table
           titleStyle='text-sm border-transparent !border-x-0'
           contentStyle='text-base !border-x-0 !border-b !py-6'
          //  fetchData={handleFetchData}
           dataSource={boxInfoRes?.data.inviteList as any[]}
           columns={columns}
           dataCount={0}
        ></Table>
      </div>
    </div>
  );
};

export default Modal;
