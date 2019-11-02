import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
// TODO import reducers here
import UserReducer from './UserReducer';
import PillReducer from './PillReducer';


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  pill: PillReducer,
  user: UserReducer,
  router: connectRouter(history),
});
export default rootReducer;
