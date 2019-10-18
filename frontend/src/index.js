import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {createBrowserHistory} from "history";

import './index.css';
import App from './components/App';
import reducers from './reducers';


const history = createBrowserHistory();
const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App history={history}/>
  </Provider>,
  document.getElementById('root'));
