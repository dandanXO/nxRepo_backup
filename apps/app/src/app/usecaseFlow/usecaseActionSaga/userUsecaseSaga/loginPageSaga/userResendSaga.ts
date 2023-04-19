import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put } from "redux-saga/effects";
import { catchSagaError } from "../../../utils/catchSagaError";
import { UserResendSecondsActionPayload } from "./index";
import { LoginPageSagaActions } from "./index";
import { loginSlice } from "./index";
export function* userResendSaga(action: PayloadAction<UserResendSecondsActionPayload>) {
    try {
        let resendSeconds = Number(action.payload.resendSeconds);
        yield put(loginSlice.actions.updateResendSeconds(resendSeconds));
        if (resendSeconds !== 0) {
            yield delay(1000);
            resendSeconds -= 1;
            yield put(LoginPageSagaActions.system.resendSeconds({ resendSeconds }));
        }
    } catch (error) {
        yield catchSagaError(error)
    }

}
