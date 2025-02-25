import { combineReducers, createStore } from 'redux';

const initStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

function accountReducer(state = initStateAccount, action: any) {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload };
    case 'account/withdraw':
      return { ...state, balance: state.balance - action.payload };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      // LATER
      return {
        ...state,
        balance: state.balance + action.payload.amount,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
}

function customerReducer(state = initialStateCustomer, action: any) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer);

function deposit(amount: number) {
  return { type: 'account/deposit', payload: amount };
}
function withdraw(amount: number) {
  return { type: 'account/withdraw', payload: amount };
}
function requestLoan(amount: number, purpose: string) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
function payLoan() {
  return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
store.dispatch(withdraw(200));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'business'));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

function createCustomer(fullName: string, nationalID: string) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}

store.dispatch(createCustomer('John Doe', '123456789'));
console.log(store.getState());
store.dispatch(updateName('Jane Doe'));
console.log(store.getState());
