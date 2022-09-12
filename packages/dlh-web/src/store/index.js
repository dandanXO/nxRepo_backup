import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga, rootState } from './root';


const configStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const sagaMiddleware = createSagaMiddleware();
    const middleware = process.env.NODE_ENV === 'development' ?
        composeEnhancers(applyMiddleware(sagaMiddleware)) : applyMiddleware(sagaMiddleware);
    return {
        ...createStore(rootState,middleware),
        runSaga: sagaMiddleware.run
    }

}
export { rootSaga, configStore };