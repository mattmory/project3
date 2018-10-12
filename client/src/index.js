import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';



import { runInDebugContext } from "vm";

/* Redux Setup */
import authReducer from "./store/reducers/auth";
import favReducer from "./store/reducers/favorites";

const rootReducer = combineReducers({
  auth: authReducer,
  favs: favReducer
});

const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("root"));
