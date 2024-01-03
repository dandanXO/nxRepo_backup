import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import Drawer, { DrawerDelay } from "../../Drawers/AnimateDrawer";
import RMCDatePicker from "rmc-date-picker";
import 'rmc-date-picker/assets/index.css';
import 'rmc-picker/assets/index.css'
import { renderByPlatform } from "../../../utils/renderByPlatform";
import { DatePickerBlock as CocoDatePickerBlock } from './env/coco/DatePickerBlock'
import { DatePickerBlock as RioDatePickerBlock } from './env/riojungle/DatePickerBlock'

export const dateToString = (date: any) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`

export const datePickerStyle = {
  padding: '4px 8px',
  width: '250px',
  color: 'white',
  backgroundColor: 'var(--primary-variant)',
  border: '1px solid rgba(255,255,255,30%)',
  borderRadius: '4px',
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
};


export const DatePickerBlock = renderByPlatform({
  "coco777bet": CocoDatePickerBlock,
  "riojungle777bet": RioDatePickerBlock
},CocoDatePickerBlock)

interface IDatePickerProps {
  onConfirm: (values: string) => void
  value: string
  max?: string
  min?: string
}

const DatePicker = ({
  onConfirm,
  value,
  max,
  min
}: IDatePickerProps) => {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [open, setOpen] = useState(true)
  const [selectedDate, setSelectedDate] = useState(new Date(value))

  const handleConfirm = () => {
    setOpen(false)
    setTimeout(() => {
      setDrawerOpen(false);
      setOpen(true)
    }, DrawerDelay)
    onConfirm(dateToString(selectedDate))
  }

  const handleCancel = () => {
    setOpen(false)
    setTimeout(() => {
      setDrawerOpen(false);
      setOpen(true)
    }, DrawerDelay)
  }

  return (
    <>
      <DatePickerBlock
        onClick={() => setDrawerOpen(true)}
      >
        <div>
          {value}
        </div>
        <DownOutlined />
      </DatePickerBlock>
      {
        drawerOpen && (
          <Drawer
            className='w-full bg-[var(--white)] text-[var(--black)]'
            onClose={() => {
              setDrawerOpen(false)
              setOpen(true)
            }
            }
            open={open}
            setOpen={setOpen}
          >
            <div className='p-4 flex text-base font-medium justify-between items-center text-[var(--black)]'>
              <div className='text-xs' onClick={handleCancel}>Cancelar</div>
              <div className='font-bold'>Selecione a data</div>
              <div className='text-xs' onClick={handleConfirm}>Confirme</div>
            </div>

            <RMCDatePicker
              className="custom-date-picker"
              date={selectedDate}
              mode='date'
              onDateChange={(date) => setSelectedDate(date)}
              minDate={min ? new Date(min) : undefined}
              maxDate={max ? new Date(max) : undefined}
            />
          </Drawer>
        )
      }

    </>
  )
}

export default DatePicker;
