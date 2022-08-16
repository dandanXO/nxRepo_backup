
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

const FixedLongContentComponent = () => {
    return (
        <div style={{ width: "1000px", padding: "0px 20px" }}>
            {longTextContent}
        </div> 
    )
}

export default FixedLongContentComponent
