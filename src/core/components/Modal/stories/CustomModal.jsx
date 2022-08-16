
import React, { useState, useCallback } from "react";
import styled from "styled-components";
import {
    textContent,
    longTextContent,
    htmlContnet,
    content,
    longContent,

    Button,
    HelloButton,
    LinkedButton,
    
    Popover,
    // Modal
    Modal,
} from "./index";
const CustomModal = (props) => (
    <Popover>
        <Button onClick={() => props.hide()}>Close</Button>
        <div>Show</div>
    </Popover>
)

export default CustomModal;
