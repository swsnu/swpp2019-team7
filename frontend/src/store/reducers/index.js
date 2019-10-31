import { combineReducers } from "redux"; 
import { connectRouter } from "connected-react-router";
import { createBrowserHistory } from "history";
//TODO import reducers here
import UserReducer from "./UserReducer";


export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user: UserReducer,
  router: connectRouter(history),
});
export default rootReducer;