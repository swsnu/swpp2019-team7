import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import { history } from '../store/reducers/index';

import { middlewares } from '../store/index';

const getmockReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

const stubPill1 = {
  id: 1,
  name: 'testpill1',
};
const stubPill2 = {
  id: 2,
  name: 'testpill2',
};
const stubPillState = {
  user_id: -1,
  pill_list: [stubPill1, stubPill2],
  selected_pill: null,
};

const stubUserState = {
  logged_in: false,
};

const stubNotiState = {
  enable_noti: true,
  enable_segregate: false,
  enable_kakao: false,
};


// const history = createBrowserHistory();

export const getMockStore = () => {
  const rootReducer = combineReducers({
    user: getmockReducer(stubUserState),
    pill: getmockReducer(stubPillState),
    noti: getmockReducer(stubNotiState),
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
