import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './components/App';
import Firebase, { FirebaseContext } from "./components/Firebase";
import store from './store/index';
import { history } from './store/reducers/index';


ReactDOM.render(
    <Provider store={store}>
      <FirebaseContext.Provider value={new Firebase()}>
        <App history={history} />
      </FirebaseContext.Provider>
    </Provider>,
  document.getElementById('root'),
);
