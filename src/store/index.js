import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';

const persistConfig = {
  key: 'ANTD_DEMO',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  let store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  )
  let persistor = persistStore(store)

  return { store, persistor }
}
