import React, { useCallback, useEffect, useState } from 'react';
import { Button, Modal, Popover } from './index';

const ModalModeDemo = () => {
  const [show, setShow] = useState(false);
  const clickHandler = useCallback(() => {
    setShow((prevShow) => {
      return !prevShow;
    });
  }, [show]);
  useEffect(() => {
    const timerID = setTimeout(() => {
      console.log('hide');
      setShow(false);
    }, 4000);
    return () => {
      clearTimeout(timerID);
    };
  });
  return (
    <div>
      <div>屬性: custom</div>
      <div>型別: boolean</div>
      <div>值: true | false</div>
      <div>說明: 是否啟用客製化模式。</div>
      <br></br>
      <div>屬性: content</div>
      <div>型別: React.Element</div>
      <div>值: </div>
      <div>說明: 嵌入客製化的 React 元素</div>
      <br></br>

      <Button onClick={() => clickHandler()}>
        Show Custom and hide after 4 seconds
      </Button>
      <Modal
        custom
        show={show}
        content={
          <Popover>
            <div>Test</div>
          </Popover>
        }
      />
    </div>
  );
};

export default ModalModeDemo;
