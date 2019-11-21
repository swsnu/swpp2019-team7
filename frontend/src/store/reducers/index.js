import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
// TODO import reducers here
import UserReducer from './UserReducer';
import PillReducer from './PillReducer';
import NotiReducer from './NotiReducer';
import DashboardReducer from './DashboardReducer';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  pill: PillReducer,
  user: UserReducer,
  noti: NotiReducer,
  dash: DashboardReducer,
  router: connectRouter(history),
});
export default rootReducer;
