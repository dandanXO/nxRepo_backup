import { createAction } from '@reduxjs/toolkit';
import { InitialStateType } from 'apps/app/src/app/reduxStore/modalSlice';

export const BindBankcardAction = {
  user: {
    bindBankcardSaveAction: createAction<InitialStateType['bindBankcardModal']>(
      'bindBankcardSaveAction'
    ),
  },
};
