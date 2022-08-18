
import React, { useState, useCallback } from "react";

import { storiesOf } from "@storybook/react";


import styled from "styled-components";
import {AppThemeProvider} from "../../core/components";
import Modal from "../../core/components/Modal";

const unistarTheme = {
    custom: {
        text: {
            primary: "#fff",
            secondary: "#fff",
        },
        // fontfamily: "Rubik",
        font: {

        },
        background: {
            primary: "rgba(45, 59, 88, 0.85)"
        },
        button: {
            primary: {
                background: "#f58b10",
                text: "f58b10",
            },
            secondary: {
                background: "",
                text: "",
            },
            alert: {
                background: "#f58b10",
                text: "f58b10",
            }
        }
    }
}
storiesOf("Page/RepaymentNoticeModal", module)
    .add("RepaymentNoticeModal", () => {
        const Paragraph = styled.div`
            margin-bottom: 10px;
        `;
        return (
            <AppThemeProvider>
                <div>
                    <div>Property: confirmText, cancelText</div>
                    <div>Value: string</div>
                    <Modal
                        show={true}
                        mode="alert"
                        type="confirm"
                        title="Notice"
                        content={(
                            <div>
                                <Paragraph>Dear customer, thank you for your trust and prompt repayment.</Paragraph>
                                <Paragraph>We have received your loan application again, and we will process it as soon as possible.</Paragraph>
                                <Paragraph>After you have completed the repayment, you can return to APP and check all the loan history on the Loan Record page.</Paragraph>
                            </div>
                        )}
                        confirmText="Repay"
                        onConfirm={() => {
                            alert("confirm")
                        }}
                        cancelText="你決定就好"
                        onCancel={() => {
                            alert("cancel")
                        }}
                        // NOTE: 特製版
                        enableClose={false}
                        enableIcon={false}
                        enableTitleHorizontal={true}
                    ></Modal>
                </div>
            </AppThemeProvider>
        )
    })
