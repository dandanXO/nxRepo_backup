import cx from 'classnames';
import React from 'react';
import useErrorBoundary from 'use-error-boundary';

import { ErrorBoundary as CustomErrorBoundary } from '../../../application/errorHandler/ErrorBoundary';
import { Button } from '../../core-components/Button';

const JustRenderMe = () => {
  throw new Error('💥');
};

export const ErrorPage = () => {
  const { ErrorBoundary, didCatch, error, reset } = useErrorBoundary({
    onDidCatch: (error, errorInfo) => {
      // For logging/reporting
      console.log('error', error);
      console.log('errorInfo', errorInfo);
    },
  });

  // NOTE: work
  return (
    <>
      {didCatch ? (
        <div>
          <p>An error has been caught: {error.message}</p>
          <Button
            dataTestingID={'apply'}
            text={'Reset Error'}
            onClick={() => reset()}
          />
        </div>
      ) : (
        <ErrorBoundary>
          <JustRenderMe />
        </ErrorBoundary>
      )}
    </>
  );

  // NOTE: didn't work
  // return (
  //   <>
  //     {didCatch ? (
  //       <p>An error has been caught: {error.message}</p>
  //     ) : (
  //       <ErrorBoundary>
  //         <Button dataTestingID={"apply"} text={"emit Error"} className={cx({
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
      <Button
        dataTestingID={'apply'}
        text={'emit Error'}
        className={cx({
          'bg-[#F58B10]': true,
        })}
        onClick={() => {
          try {
            throw new Error('error');
          } catch (error) {
            console.log('error', error);
          }
        }}
      />
    </CustomErrorBoundary>
  );
};
