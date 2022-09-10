import React from 'react';
import { Button, Popover } from './index';

const CustomModal = (props) => (
  <Popover>
    <Button onClick={() => props.hide()}>Close</Button>
    <div>Show</div>
  </Popover>
);

export default CustomModal;
