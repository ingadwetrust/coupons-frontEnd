import { authReducer, AuthState } from './AuthState';
import { combineReducers, createStore } from "redux";



const reducers = combineReducers({AuthState: authReducer});
const store = createStore(reducers);



export default store;
