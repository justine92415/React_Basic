
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
      return { ...state, loan: action.payload };
    case 'account/payLoan':
      return {
        ...state,
        loan: 0,
        loanPurpose: '',
        balance: state.balance - action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);