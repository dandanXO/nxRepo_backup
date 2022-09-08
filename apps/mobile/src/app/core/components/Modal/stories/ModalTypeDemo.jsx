import React, { useCallback, useState } from "react";
import { Button, content, Modal } from "./index";

const ModalTypeDemo = () => {
    const [show, setShow] = useState(false);
    const [iconType, setIconType] = useState("confirm");
    const clickHandler = useCallback(
        (type) => {
            setIconType(type);
            setShow((show) => {
                return !show;
            });
        },
        [show, iconType]
    );
    return (
        <div>
            <div>
                <Button onClick={() => clickHandler("confirm")}>confirm</Button>
                <Button onClick={() => clickHandler("notification")}>
                    notification
                </Button>
                <Button onClick={() => clickHandler("error")}>error</Button>
                <Button onClick={() => clickHandler("question")}>
                    question
                </Button>
                <Button onClick={() => clickHandler("money")}>money</Button>
            </div>
            <Modal
                show={show}
                mode="alert"
                type={iconType}
                title="确认"
                content={content}
                onConfirm={() => {
                    setShow(false);
                }}
                onCancel={() => {
                    setShow(false);
                }}
            ></Modal>
        </div>
    );
};

export default ModalTypeDemo;
