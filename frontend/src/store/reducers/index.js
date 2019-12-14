import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
// TODO import reducers here
import UserReducer from './UserReducer';
import PillReducer from './PillReducer';
import NotiReducer from './NotiReducer';
import DashboardReducer from './DashboardReducer';
import DialogReducer from './DialogReducer';
import IntervalSettingReducer from './IntervalSettingReducer';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  pill: PillReducer,
  user: UserReducer,
  noti: NotiReducer,
  dash: DashboardReducer,
  dialog: DialogReducer,
  interval: IntervalSettingReducer,
  router: connectRouter(history),
});
export default rootReducer;
