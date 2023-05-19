import { createAction } from '@reduxjs/toolkit';

export const PersonalInfoPageSagaActions = {
  user: {
    logout: createAction('userLogoutSaga'),
  },
  system: {
    init: createAction('PersonalInfoPageSagaActions-system-init'),
  },
};


