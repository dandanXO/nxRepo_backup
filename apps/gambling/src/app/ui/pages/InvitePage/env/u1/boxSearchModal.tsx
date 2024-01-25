import {ReactNode, useEffect, useState} from 'react';
import {
  useGetBoxInviteListMutation
} from "../../../../../external";
import useBreakpoint from '../../../../pageTemplate/hooks/useBreakpoint';
import cx from 'classnames'
import { Table } from "../../../../components-bs/Table";
import { Dropdown, Menu } from 'antd';
import {Input as DesktopInput} from "../../../../components-bs/Inputs/Input";
import { DownOutlined, SearchOutlined, CloseOutlined } from "@ant-design/icons";



type interfaceProps = {
  isOpen: boolean;
  children?: ReactNode;
  onClose?: ()=> void;
}

const Modal = (props: interfaceProps) => {
  const { isMobile, isDesktop } = useBreakpoint();
  const [triggerGetBoxInfo, {data:boxInfoRes}] = useGetBoxInviteListMutation();
  const {isOpen, onClose} = props
  const [effective, setEffective] = useState<boolean|null>(null)
  const [searchData, setSearchData] = useState<boolean|null>(null)
  const columns = [
    { title: 'Contas de subordinados', name: 'phone', key: 'phone' },
    { title: 'Hora de registo', name: 'registerTime', key: 'registerTime' },
    { title: 'Válido ou não', name: 'isEffective', key: 'isEffective', render:(record: boolean)=> record ? (<span>Eficiente</span>) : (<span>Inválido</span>) },
    { title: 'Condições válidas', name: 'condition', key: 'condition' },
  ]

  useEffect(()=>{
    triggerGetBoxInfo(
    {
      token: localStorage.getItem(localStorage.token) || '',
      "pageNum": 1,
      "pageSize": 100,
      "isEffective": effective,
      "phone": searchData || null
    }
  )
  }, [])
  useEffect(()=>{
    triggerGetBoxInfo(
    {
      token: localStorage.getItem(localStorage.token) || '',
      "pageNum": 1,
      "pageSize": 100,
      "isEffective": effective,
      "phone": searchData || null
    }
  )
  }, [isOpen])
  const closeModal = ()=>{
    if(onClose){
      // 初始化
      setEffective(null)
      return onClose()
    }
  }
  const handleMenuClick = (status: null| boolean)=>{
    if(!searchData) return
    setEffective(status)

    triggerGetBoxInfo(
      {
        "pageNum": 1,
        "pageSize": 100,
        "isEffective": status,
        "phone": searchData || null
      }
    ) 
  }
  const effectiveMenu = (
    <Menu className= "bg-[var(--primary-variant)] !p-0 text-[--white]" >
      <Menu.Item className='text-[var(--white)] hover:bg-[var(--primary-assistant-20)]' key='Tudo' onClick={()=> handleMenuClick(null)}>
        <div>
          Tudo
        </div>
      </Menu.Item>
      <Menu.Item className='text-[var(--white)] hover:bg-[var(--primary-assistant-20)]' key='Eficiente' onClick={()=> handleMenuClick(true)}>Eficiente</Menu.Item>
      <Menu.Item className='text-[var(--white)] hover:bg-[var(--primary-assistant-20)]' key='Inválido' onClick={()=> handleMenuClick(false)}>Inválido</Menu.Item>
    </Menu>
  );
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] z-50 flex justify-center items-center">
      <div className={cx({
        'w-full': isMobile,
        'h-full':isMobile,
        'w-10/12': isDesktop
      },'bg-[var(--background-primary)] p-5 rounded-lg  text-end'
      )}>
        <CloseOutlined onClick={closeModal}  className='text-[var(--white)] w-[24px] h-[24px]'/>
        <div className='text-center text-2xl text-[var(--white)]'>
          Meus Indicados
        </div>
        <div className='flex justify-between items-center'>
          <Dropdown overlay={effectiveMenu} trigger={['click']}>
            <div onClick={e => e.preventDefault()} className='max-h-[34px] rounded-lg text-white w-[100px] px-3 py-2 bg-[var(--primary-variant)] flex justify-between'>
              {effective === null ? 'Tudo': effective ? ('Eficiente'):('Inválido')}
              <DownOutlined className='mt-[5px]' />
            </div>
          </Dropdown>
          <DesktopInput
            placeholder='Conta'
            className={"py-1.5 px-3 text-base rounded !border-[var(--primary-assistant)] bg-[var(--background-primary)]"}
            inputClassName={"text-base  placeholder:text-[var(--white-30)]"}
            prefix={<SearchOutlined className={"text-[#969799] text-sm mr-2 flex justify-center items-center"} />}
            onChange={(event: any) => {
              setSearchData(event.target.value);
            }}
            onClick={handleMenuClick}
            type="number"
          />
        </div>
        <Table
           titleStyle='text-sm border-transparent !border-x-0'
           contentStyle='text-base !border-x-0 !border-b !py-6'
          //  fetchData={handleFetchData}
           dataSource={boxInfoRes?.rows as any[] || []}
           columns={columns}
           dataCount={0}
        ></Table>
      </div>
    </div>
  );
};

export default Modal;
