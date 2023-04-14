import {Route} from "react-router";
import React from "react";
import ApplicationProgressPage from "../ApplicationProgressPage";
import {PagePathEnum} from "../PagePathEnum";
import cx from "classnames";
import {Button} from "../../components/layouts/Button";
import {useNavigate} from "react-router";

import useErrorBoundary from "use-error-boundary"

import {ErrorBoundary as CustomErrorBoundary} from "../../../modules/ErrorBoundary"

const JustRenderMe = () => {
  throw new Error("💥")
}

export const ErrorPage = () => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      // For logging/reporting
      console.log("error", error)
      console.log("errorInfo", errorInfo)
    },
  })

  // NOTE: work
  return (
    <>
      {didCatch ? (
        <div>
          <p>An error has been caught: {error.message}</p>
          <Button dataTestingID={"apply"} text={"Reset Error"} bgColor={cx({
            "bg-[#F58B10]": true,
          })}
            onClick={() => reset()}
          />
        </div>

      ) : (
        <ErrorBoundary>
          <JustRenderMe />
        </ErrorBoundary>
      )}
    </>
  )

  // NOTE: didn't work
  // return (
  //   <>
  //     {didCatch ? (
  //       <p>An error has been caught: {error.message}</p>
  //     ) : (
  //       <ErrorBoundary>
  //         <Button dataTestingID={"apply"} text={"emit Error"} bgColor={cx({
  //           "bg-[#F58B10]": true,
  //         })}
  //           onClick={() => {
  //             throw new Error("error");
  //           }}
  //         />
  //       </ErrorBoundary>
  //     )}
  //   </>
  // )

  // NOTE: work
  return (
    <CustomErrorBoundary fallback={<p>Something went wrong</p>}>
      <Button dataTestingID={"apply"} text={"emit Error"} bgColor={cx({
        "bg-[#F58B10]": true,
      })}
          onClick={() => {
            try {
              throw new Error("error");
            } catch(error) {
              console.log("error", error)
            }
          }}
      />
    </CustomErrorBoundary>
  )

}
