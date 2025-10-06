import { applyMiddleware, combineReducers, createStore } from "redux";
import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountsSlice";
import {thunk} from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// store
// store all reducer in container combineReducers
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer, composeWithDevTools( applyMiddleware(thunk)));

export default store;
