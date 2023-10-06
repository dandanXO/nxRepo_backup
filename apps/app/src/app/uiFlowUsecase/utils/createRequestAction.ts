import {createAction} from '@reduxjs/toolkit';

export const createRequestAction = (type: string) => {
  const loadingAction = createAction(`${type}/loading`);
  const successAction = createAction(`${type}/success`);
  const failureAction = createAction(`${type}/failure`);
  return {
    loadingAction,
    successAction,
    failureAction,
  };
};
