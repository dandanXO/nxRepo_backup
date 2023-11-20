import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Drawer, { DrawerDelay } from "../Drawers/Drawer";
import DatePicker from "rmc-date-picker";
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/index.css'
import { tcx } from "../../utils/tcx";


interface IRangeDatePackerProps {
  onConfirm: (values: [string, string]) => void
  value: [string, string]
  max?: string
  min?: string
}

const RangeDatePacker = ({
  min,
  max,
  onConfirm,
  value
}: IRangeDatePackerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [open, setOpen] = useState(true);
  const [anchor, setAnchor] = useState(1)
  const [selectedDate, setSelectedDate] = useState([new Date(value[0]), new Date(value[1])])

  const onDateChange = (anchor: number, date: any) => {
    if(anchor === 1){
      setSelectedDate([date, selectedDate[1]])
    }else {
      setSelectedDate([selectedDate[0], date])
    }
  }

  const dateToString  = (date: any) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

  const handleConfirm = () => {
    setOpen(false)
    setTimeout(()=>{
      setDrawerOpen(false);
      setOpen(true)
    }, DrawerDelay)
    onConfirm([dateToString(selectedDate[0]), dateToString(selectedDate[1])])
  }

  return (
    <>
      <div
        className='bg-[#0d3a7e] w-fit px-4 py-1 rounded-full flex items-center gap-2'
        onClick={()=>setDrawerOpen(true)}
      >
        <div>
          {value[0]}
          {' - '}
          {value[1]}
        </div>
        <DownOutlined />
      </div>

      {
        drawerOpen && (
          <Drawer
            className='w-full bg-[#20498E]'
            onClose={()=> {
              setDrawerOpen(false)
              setOpen(true)
            }}
            open={open}
            setOpen={setOpen}
          >
            <div className='p-4 flex text-base justify-between items-center'>
              <div className='text-sm text-[#969799]'>Cancelar</div>
              <div className='font-bold'>Selecione a data</div>
              <div className='text-sm text-[#ffe700]' onClick={handleConfirm}>Confirme</div>
            </div>

            <div className='flex p-4 gap-4'>
              <div className='flex flex-col items-center gap-1'>
                <div className={tcx(['opacity-50', anchor === 2])} onClick={()=>setAnchor(1)}>data de início</div>
                { anchor === 1 && <div className='h-1 bg-white w-12 rounded-full' />}
              </div>
              <div className='flex flex-col items-center gap-1'>
                <div className={tcx(['opacity-50', anchor === 1])} onClick={()=>setAnchor(2)}>data final</div>
                { anchor === 2 && <div className='h-1 bg-white w-12 rounded-full' />}
              </div>
            </div>

            {
              anchor === 1 &&
              <DatePicker
                date={selectedDate[0]}
                mode='date'
                onDateChange={(date) => onDateChange(1, date)}
                minDate={min ? new Date(min): undefined}
                maxDate={selectedDate[1]}
              />
            }

            {
              anchor === 2 &&
              <DatePicker
                date={selectedDate[1]}
                onDateChange={(date) => onDateChange(2, date)}
                mode='date'
                minDate={selectedDate[0]}
                maxDate={max ? new Date(max): undefined}
              />
            }

          </Drawer>
        )
      }
    </>
  )
}

export default RangeDatePacker;
