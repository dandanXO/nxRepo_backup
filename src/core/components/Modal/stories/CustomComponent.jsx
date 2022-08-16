
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

const CustomComponent = (props) => {
    return (
        <div>
            <div>Custom Component</div>            
            <div style={{ color: "pink" }}> Type: Alert</div>
            <div style={{ color: "red" }}> Status: Done</div>
            <div style={{ color: "skyblue" }}> Mask: None</div>
        </div>
    )
}

export default CustomComponent;
