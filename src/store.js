import {applyMiddleware, combineReducers, createStore} from "redux";
import contactsReducer from "./reducers/contact_reducer";
import logger from "redux-logger";

let store = combineReducers({contacts:contactsReducer});
store = createStore(store,applyMiddleware(logger));
export default store;
