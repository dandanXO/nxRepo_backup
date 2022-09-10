import React, { useCallback } from 'react';
import { Button, Modal, Popover } from './index';

const AllCallMethodModal = () => {
  const onButtonClick = useCallback(() => {
    setTimeout(() => {
      Modal.alert({
        mask: true,
        title: 'A Modal',
        content: 'Content',
        confirmText: 'Confirm',
      });
    }, 1000);
    setTimeout(() => {
      Modal.confirm({
        mask: true,
        title: 'B Modal',
        content: 'Content',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      });
    }, 2000);
    setTimeout(() => {
      Modal.confirm({
        mask: true,
        title: 'C Modal',
        content: 'Content',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      });
    }, 3000);
    setTimeout(() => {
      Modal.show({
        mask: true,
        content: (hide) => {
          return (
            <Popover>
              <Button
                onClick={() => {
                  hide();
                }}
              >
                Close
              </Button>
            </Popover>
          );
        },
      });
    }, 4000);
  });
  return (
    <div>
      <Button onClick={onButtonClick}>Click to generate 4 modals</Button>
    </div>
  );
};

export default AllCallMethodModal;
