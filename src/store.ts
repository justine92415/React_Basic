import { createStore } from 'redux';

const initState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initState, action: any) {
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

const store = createStore(reducer);

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
