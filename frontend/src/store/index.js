import { createStore, applyMiddleware, compose } from "redux"; 
import { routerMiddleware } from "connected-react-router";
import thunk from 'redux-thunk';

import rootReducer, {history} from "./reducers/index";

export const middlewares = [ thunk, routerMiddleware(history)]

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(...middlewares)));

export default store