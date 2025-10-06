import customerReducer from "./features/customers/customerSlice";
import accountReducer from "./features/accounts/accountsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;
