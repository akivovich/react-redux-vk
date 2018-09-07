import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
//import {ping} from '../enhancers/ping';
import {logger} from 'redux-logger';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const store = createStore(
      rootReducer, 
      initialState,
      //applyMiddleware(ping) //ping will be called on each action perform
      applyMiddleware(logger, thunk)
    );
  
    if (module.hot) {
        module.hot.accept('../reducers', () => {
        const nextRootReducer = require('../reducers');
        store.replaceReducer(nextRootReducer);
      });
    }
  
    return store;
  }
