import React, { useState } from 'react';
import { Button, content, Modal } from './index';

const DefaultModalDemo = () => {
  const [show, setShow] = useState(false);
  return (
    <div>
      <Button
        onClick={() =>
          setShow((show) => {
            return !show;
          })
        }
      >
        Show Modal
      </Button>
      <Modal
        show={show}
        mask={true}
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
export default DefaultModalDemo;
