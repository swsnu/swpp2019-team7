/* istanbul ignore file */
import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import { connectRouter } from 'connected-react-router';
// import { createBrowserHistory } from 'history';
import { history } from '../store/reducers/index';

import { middlewares } from '../store/index';

export const getmockReducer = jest.fn(
  (initialState) => (state = initialState, action) => {
    switch (action.type) {
      default:
        break;
    }
    return state;
  },
);

export const stubPill1 = {
  id: 1,
  pillId: '1',
  name: 'testpill1',
  take_method: 'asdf',
  product_name: 'asdf',
  expiration_date: 'asdf',
  functions: 'asdf',
  store_method: 'asdf',
  company_name: 'asdf',
  standards: 'asdf',
  precautions: 'asdf',
  take_method_preprocessed: 'asdf',
  file: '',
};
export const stubPill2 = {
  id: 2,
  pillId: '2',
  name: 'testpill2',
  takeMethod: 'asdf',
  productName: 'asdf',
  expirationDate: 'asdf',
  functions: 'asdf',
  storeMethod: 'asdf',
  companyName: 'asdf',
  standards: 'asdf',
  precautions: 'asdf',
  takeMethodPreprocessed: 'asdf',
  file: '',
};
const stubPillState = {
  user_id: -1,
  pill_list: [stubPill1, stubPill2],
  selected_pill: null,
};

// stub user state for a logged out user
export const stubUserState = {
  current_user: {
    name: '',
  },
  noti_setting: {
    enable_noti: false,
    enable_segregation: false,
    enable_kakao: false,
  },
  logged_in: false,
};

// stub user state for a logged in user
export const stubUserStateLoggedIn = {
  logged_in: true,
};

export const stubNotiState = {
  webnoti_list: [{
    id: 1, 'pill-name': '마이더블유피아이에이치쉐이크', 'pill-id': 1, activated: true, time: ['0900'],
  }],
};

export const stubDashState = {
  itemNo: 0,
};

export const stubDialogState = {
  open: true,
};

// mock store for a logged out user
export const getMockStore = (...args) => {
  let userReducer; let pillReducer; let
    notiReducer;
  let dashReducer; let dialogReducer; let
    newReducer;

  userReducer = getmockReducer(stubUserState);
  pillReducer = getmockReducer(stubPillState);
  notiReducer = getmockReducer(stubNotiState);
  dashReducer = getmockReducer(stubDashState);
  dialogReducer = getmockReducer(stubDialogState);
  if (args.length) {
    newReducer = getmockReducer(args[1]);
    switch (args[0]) {
      case 'user': userReducer = newReducer; break;
      case 'pill': pillReducer = newReducer; break;
      case 'noti': notiReducer = newReducer; break;
      case 'dash': dashReducer = newReducer; break;
      case 'dialog': dialogReducer = newReducer; break;
      default: break;
    }
  }
  const rootReducer = combineReducers({
    user: userReducer,
    pill: pillReducer,
    noti: notiReducer,
    dash: dashReducer,
    dialog: dialogReducer,
    router: connectRouter(history),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};

// mock store for a logged in user
export const getMockStoreLoggedIn = () => {
  const rootReducer = combineReducers({
    user: getmockReducer(stubUserStateLoggedIn),
    pill: getmockReducer(stubPillState),
    router: connectRouter(history),
    dialog: getmockReducer(stubDialogState),
  });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const mockStore = createStore(rootReducer,
    composeEnhancers(applyMiddleware(...middlewares)));
  return mockStore;
};
