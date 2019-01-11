import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index";

/* Redux modules */
import user from './modules/user'
import post from './modules/post'

const rootReducer = combineReducers({
  reducers,
  user,
  post,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  rootReducer,
  /* preloadedState, */ composeEnhancers(
    applyMiddleware(thunk),
  )
);

export default store;
