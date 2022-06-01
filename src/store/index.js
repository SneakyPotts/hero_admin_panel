import { createStore } from 'redux';
import {combineReducers} from "@reduxjs/toolkit";
import heroesReducer from "../reducers/heroes";
import filterReducer from "../reducers/filters";

const reducer = combineReducers({
  heroesReducer,
  filterReducer
});

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;