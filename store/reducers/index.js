import { combineReducers } from 'redux';
import auth from './auth';
import globalState from './globalState';
import payment from './payment';
import session from './session';

export default combineReducers({
    auth,
    globalState,
    session,
    payment
});
