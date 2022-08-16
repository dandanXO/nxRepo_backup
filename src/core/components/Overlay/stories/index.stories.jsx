
import React from "react";
import {
    Overlay,
} from "./index";

import { storiesOf } from "@storybook/react";
import {AppThemeProvider} from "../../index";
import styled from "styled-components";

storiesOf("Overlay", module)
    .add("特製版", () => {
        const Paragraph = styled.div`
            margin-bottom: 10px;
        `;
        return (
            <AppThemeProvider>
                <div>
                    <div>Property: confirmText, cancelText</div>
                    <div>Value: string</div>
                    <Overlay
                        show={true}
                        mode="alert"
                        type="confirm"
                        title="Notice"
                        content={(
                            <div>

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
                    ></Overlay>
                </div>
            </AppThemeProvider>
        )
    })
