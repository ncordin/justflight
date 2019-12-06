import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducers from './reducers';

export const configureStore = () => {
  const logger = createLogger({
    level: 'info',
    collapsed: true,
  });
  const middlewares = [thunk, logger];
  const extensions = compose(
    applyMiddleware(...middlewares),
    window['devToolsExtension'] ? window['devToolsExtension']() : f => f
  );

  return createStore(reducers, extensions);
};
