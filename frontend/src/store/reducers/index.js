import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
// TODO import reducers here
import UserReducer from './UserReducer';
import PillReducer from './PillReducer';
import NotiReducer from './NotiReducer';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  pill: PillReducer,
  user: UserReducer,
  noti: NotiReducer,
  router: connectRouter(history),
});
export default rootReducer;
