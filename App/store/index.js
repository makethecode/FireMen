/**
 * Created by dingyiming on 2017/5/26.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from '../reducers/index';

const middlewares = [thunk];
import logger from  'redux-logger'

if (process.env.NODE_ENV === 'development') {

    middlewares.push(logger);
}
const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);

let store = createStoreWithMiddleware(reducer);
module.exports= store;
