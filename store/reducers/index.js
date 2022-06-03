import { combineReducers } from 'redux';
import auth from './auth';
import globalState from './globalState';
import payment from './payment';
import session from './session';
import cart from './cart';
import purchased from './purchased';
import order from './order';

export default combineReducers({
    auth,
    globalState,
    session,
    payment,
    cart,
    purchased,
    order
});
