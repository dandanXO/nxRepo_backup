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

class ModelDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
    }
    hidden = () => {
        this.setState({
            show: false,
        });
    };
    render() {
        return (
            <Modal
                show={this.state.show}
                mode="custom"
                customButtons={
                    <>
                        <HelloButton
                            onClick={() => {
                                this.hidden();
                            }}
                        >
                            确认
                        </HelloButton>
                        <LinkedButton
                            onClick={() => {
                                this.hidden();
                            }}
                        >
                            遇到问题，联系客服
                        </LinkedButton>
                    </>
                }
                type="money"
                title="金額"
                content={content}
            ></Modal>
        );
    }
}
export default ModelDemo;
