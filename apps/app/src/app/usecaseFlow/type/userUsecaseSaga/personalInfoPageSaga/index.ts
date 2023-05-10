import { createAction } from '@reduxjs/toolkit';

export const PersonalInfoPageSagaActions = {
  user: {},
  system: {
    init: createAction('PersonalInfoPageSagaActions-system-init'),
  },
};
