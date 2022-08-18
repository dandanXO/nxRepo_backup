import React from "react";

// 管理所有要傳入 Form 的資料 e.g., size 大小, onCheck 要執行的 function
interface formStateContextInterface {
    size?: "small" | "big";
    onCheck?: (...arg: any) => void;
}

const formStateContextValue: formStateContextInterface = {
    size: "small",
    onCheck: () => {}
};

const formStateContext = React.createContext<formStateContextInterface>(formStateContextValue);

export default formStateContext;
