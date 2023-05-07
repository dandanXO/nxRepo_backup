// NOTE: Redux Saga stops after error
// https://stackoverflow.com/questions/48423464/redux-saga-stops-after-error
export function* errorFallback(sagaFunction: any, action: any) {
  try {
    yield sagaFunction(action);
  } catch (error) {
    // exception log to your server
  }
}
