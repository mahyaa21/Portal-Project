import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';        
import rootReducer from '../_reducers';
//import createSagaMiddleware from 'redux-saga';
//import rootSaga from '../sagas/index';
//import { composeWithDevTools } from 'redux-devtools-extension';
//const sagaMiddleware = createSagaMiddleware();

const inititalState = {};

const store = createStore(
        rootReducer, 
        inititalState, 
        compose(applyMiddleware(thunk), 
                window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()));
        //composeWithDevTools(applyMiddleware(sagaMiddleware));
        //sagaMiddleware.run(rootSaga);
export default store;