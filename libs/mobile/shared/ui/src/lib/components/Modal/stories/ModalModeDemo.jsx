import React, { useCallback, useState } from 'react';
import { Button, content, Modal } from './index';

const ModalModeDemo = () => {
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('alert');
  const clickHandler = useCallback(
    (mode) => {
      setMode(mode);
      setShow((show) => {
        return !show;
      });
    },
    [show, mode]
  );
  return (
    <div>
      <div>屬性: mode</div>
      <div>型別: string</div>
      <div>值: alert | confirm</div>
      <div>說明: 顯示 Alert 或是 Confirm</div>

      <div>
        <Button onClick={() => clickHandler('alert')}>alert</Button>
        <Button onClick={() => clickHandler('confirm')}>confirm</Button>
      </div>
      <Modal
        show={show}
        mode={mode}
        type="money"
        title="确认"
        content={content}
        onConfirm={() => {
          setShow(false);
        }}
        onCancel={() => {
          setShow(false);
        }}
      ></Modal>
    </div>
  );
};

export default ModalModeDemo;
