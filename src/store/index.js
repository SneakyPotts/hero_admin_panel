import heroesReducer from "../components/heroesList/heroesSlice";
import filterReducer from "../components/heroesFilters/filtersSlice";
import {configureStore} from "@reduxjs/toolkit";

const stringMiddleware = (store /*{dispatch, getState}*/) => (next /*dispatch*/) => (action) => {
  if (typeof action === 'string') {
    return next({
      type: action
    });
  }
  return next(action);
}

const store = configureStore({
  reducer: {heroesReducer, filterReducer},
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware), //ReduxThunk включён уже
  devTools: process.env.NODE_ENV !== 'production', //продакшн версия или разработка
})

export default store;