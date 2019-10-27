import { combineReducers } from "redux"; 
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
//TODO import reducers here

export const history = createBrowserHistory();
const rootReducer = combineReducers({
  router: connectRouter(history)
});
export default rootReducer;