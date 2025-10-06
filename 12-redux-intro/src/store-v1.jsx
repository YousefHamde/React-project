import { combineReducers } from "redux";
import { createStore } from "redux";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function accountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };

    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };

    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };

    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };

    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };

    default:
      return state;
  }
}
// store 
// store all reducer in container combineReducers
const rootReducer = combineReducers({
  account : accountReducer,
  customer : customerReducer
})

const state = createStore(rootReducer);

// state.dispatch({ type: "account/deposit" , payload:500 });

// console.log(state.getState());
// state.dispatch({ type: "account/withdraw", payload: 200 });
// state.dispatch({
//   type: "account/requestLoan",
//   payload: { amount: 1000, purpose:"bay a car" },
// });
// console.log(state.getState());
// state.dispatch({ type: "account/payLoan" });

// console.log(state.getState());

function deposit(amount) {
  return {
    type: "account/deposit",
    payload: amount,
  };
}

function withdraw(amount) {
  return {
    type: "account/withdraw",
    payload: amount,
  };
}

function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: {
      amount,
      purpose,
    },
  };
}

function payLoan() {
  return {
    type: "account/payLoan",
  };
}

state.dispatch(deposit(500));

console.log(state.getState());
state.dispatch(withdraw(200));
state.dispatch(requestLoan(1000, "bay a car"));
console.log(state.getState());
state.dispatch(payLoan());
console.log(state.getState());

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
}

function updateName(fullName) {
  return {
    type: "customer/updateName",
    payload: fullName,
  };
}

state.dispatch(createCustomer("yousef hamdy","1234568788"))

console.log(state.getState());
