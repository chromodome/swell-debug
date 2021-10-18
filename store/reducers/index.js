import { combineReducers } from 'redux';
import auth from './auth';
import globalState from './globalState';
import payment from './payment';

export default combineReducers({
    auth,
    globalState,
    payment
});
