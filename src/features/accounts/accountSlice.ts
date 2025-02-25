import { AccountState, DepositFn } from '../../types';

const initStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

export default function accountReducer(
  state: AccountState = initStateAccount,
  action: any
): AccountState {
  switch (action.type) {
    case 'account/deposit':
      return { ...state, balance: state.balance + action.payload, isLoading: false };
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
    case 'account/convertingCurrency':
      return { ...state, isLoading: true };
    default:
      return state;
  }
}

export function deposit(amount: number, currency: string): DepositFn {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch: any, getState: any) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await convert(currency, 'USD', amount);
    const data: TopLevel = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: 'account/deposit', payload: amount * convertedAmount });
  };
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

async function convert(from: string, to: string, amount: number) {
  return fetch(
    `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
  );
}

export interface TopLevel {
  amount: number;
  base: string;
  date: Date;
  rates: Rates;
}

export interface Rates {
  USD: number;
}
