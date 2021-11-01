import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import rootReducer from './reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash.throttle';

const persistedState = {
   // ...loadState(),
   // globalState: {lang: "ar"}
}

const middleware = process.env.NODE_ENV === 'development'
    ? [thunk, createLogger(), promise]
    : [thunk, promise];

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(applyMiddleware( ...middleware))
);

store.subscribe(throttle(() => {
    saveState({
        experienceDetails: store.getState().experienceDetails
    });
}, 1000));

export default store;