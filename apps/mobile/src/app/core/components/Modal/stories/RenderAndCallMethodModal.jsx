import React, { useCallback, useState } from "react";
import { Button, Modal, Popover, textContent } from "./index";

const RenderAndCallMethodModal = () => {
    const [show, setShow] = useState(false);
    const onButtonClick = useCallback(() => {
        setTimeout(() => {
            Modal.alert({
                mask: true,
                title: "A",
                content: "Content",
                confirmText: "Confirm",
            });
        }, 1000);

        setTimeout(() => {
            Modal.confirm({
                mask: true,
                title: "B",
                content: "Content",
                confirmText: "Confirm",
                cancelText: "Cancel",
            });
        }, 2000);

        setTimeout(() => {
            Modal.show({
                mask: true,
                content: (hide) => (
                    <Popover>
                        <Button onClick={() => hide()}>Hide</Button>
                    </Popover>
                ),
            });
        }, 3000);
    });
    return (
        <div>
            <Modal
                show={show}
                // maskClosable={maskClosable}
                mode="confirm"
                type="confirm"
                title="注意"
                content={textContent}
                confirmText="好哦"
                onConfirm={() => {
                    setShow(false);
                }}
                cancelText="你決定就好"
                onCancel={() => {
                    setShow(false);
                }}
            ></Modal>
            <Button onClick={onButtonClick}>Click to generate 4 modals</Button>
        </div>
    );
};

export default RenderAndCallMethodModal;
