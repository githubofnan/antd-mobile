import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './router/index';
import './assets/style/common.less';
import { Provider } from 'react-redux';
import configureStore from './store/index';
import { HashRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { renderRoutes } from 'react-router-config';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor } = configureStore();

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate loading={null} persistor={persistor}>
      <HashRouter>
        { renderRoutes(Routes) }
      </HashRouter>
    </PersistGate>
  </Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
