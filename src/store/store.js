import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store;
if(process.env.NODE_ENV === 'development') {
  store = createStore(
    persistedReducer,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
  );
} else {
  store = createStore(
    persistedReducer,
    applyMiddleware(thunk)
  );
}

export const persistor = persistStore(store)

export default store