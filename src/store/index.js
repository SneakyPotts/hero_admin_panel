import heroesReducer from "../reducers/heroes";
import filterReducer from "../reducers/filters";
import {configureStore} from "@reduxjs/toolkit";

// const reducer = combineReducers({
//   heroesReducer,
//   filterReducer
// });

const stringMiddleware = (store /*{dispatch, getState}*/) => (next /*dispatch*/) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
}

// const enhancer = createStore => (...args) => {
//   const store = createStore(...args);
//
//   const oldDispatch = store.dispatch;
//   store.dispatch = (action) => {
//     if (typeof action === 'string') {
//       return oldDispatch({
//         type: action
//       });
//     }
//     return oldDispatch(action);
//   }
//
//   return store;
// }

// const store = createStore(
//   reducer,
//   compose(
//     applyMiddleware(ReduxThunk,stringMiddleware),
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   ));

const store = configureStore({
  reducer: {heroesReducer, filterReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware), //ReduxThunk включён уже
  devTools: process.env.NODE_ENV !== 'production', //продакшн версия или разработка
})

export default store;