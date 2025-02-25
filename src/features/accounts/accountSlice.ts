const initStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

export default  function accountReducer(state = initStateAccount, action: any) {
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

export function deposit(amount: number) {
  return { type: 'account/deposit', payload: amount };
}
export function withdraw(amount: number) {
  return { type: 'account/withdraw', payload: amount };
}
export function requestLoan(amount: number, purpose: string) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}
export function payLoan() {
  return { type: 'account/payLoan' };
}
