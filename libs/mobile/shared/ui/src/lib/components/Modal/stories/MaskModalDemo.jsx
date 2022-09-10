import React, { useState } from 'react';
import { Button, content, Modal } from './index';

const MaskModalDemo = () => {
  const [show, setShow] = useState(false);
  const [mask, setMask] = useState(false);
  return (
    <div>
      <div>屬性: mask</div>
      <div>型別: boolen</div>
      <div>值: true | false</div>
      <div>說明: 是否顯示遮罩層</div>
      <br></br>

      <div>
        <Button
          onClick={() => {
            setMask(true);
            setShow((show) => {
              return !show;
            });
          }}
        >
          Show Mask Modal
        </Button>
        <Button
          onClick={() => {
            setMask(false);
            setShow((show) => {
              return !show;
            });
          }}
        >
          Show Modal
        </Button>
      </div>
      <Modal
        show={show}
        mask={mask}
        title="预设"
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

export default MaskModalDemo;
