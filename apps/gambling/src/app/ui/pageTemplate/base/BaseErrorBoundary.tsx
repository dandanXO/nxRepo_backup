import {ErrorBoundary} from "react-error-boundary";
import React from "react";

type IBaseErrorBoundary = {
  children: React.ReactNode;
}
export const BaseErrorBoundary = (props: IBaseErrorBoundary) => {
  return (
    <ErrorBoundary
      fallback={
        <div className={"text-white"}>Children</div>
      }
    >
      {props.children}
    </ErrorBoundary>
  )
}
