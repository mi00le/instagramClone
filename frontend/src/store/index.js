import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

/* Redux modules */
import user from './modules/user'

const rootReducer = combineReducers({
  reducers,
  user,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
  )
);

export default store;
