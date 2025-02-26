import { PayloadAction } from './../../../node_modules/@reduxjs/toolkit/src/createAction';
import { AccountState, DepositFn } from '../../types';

import { createSlice } from '@reduxjs/toolkit';

const initState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initState,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } };
      },
      // https://stackoverflow.com/questions/72486092/how-to-type-prepare-function-in-redux-toolkit
      reducer(
        state,
        action: PayloadAction<{ amount: number; purpose: string }>
      ) {
        if (state.loan > 0) return state;
        state.balance += action.payload.amount;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
      },
    },
    payLoan(state) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = '';
    },
    convertingCurrency(state) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount: number, currency: string): DepositFn {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function (dispatch: any, getState: any) {
    dispatch({ type: 'account/convertingCurrency' });

    const res = await convert(currency, 'USD');
    const data: TopLevel = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: 'account/deposit', payload: amount * convertedAmount });
  };
}

async function convert(from: string, to: string) {
  return fetch(
    `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`
  );
}

export default accountSlice.reducer;

// export default function accountReducer(
//   state: AccountState = initState,
//   action: any
// ): AccountState {
//   switch (action.type) {
//     case 'account/deposit':
//       return { ...state, balance: state.balance + action.payload, isLoading: false };
//     case 'account/withdraw':
//       return { ...state, balance: state.balance - action.payload };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       // LATER
//       return {
//         ...state,
//         balance: state.balance + action.payload.amount,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         loan: 0,
//         loanPurpose: '',
//         balance: state.balance - state.loan,
//       };
//     case 'account/convertingCurrency':
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// export function withdraw(amount: number) {
//   return { type: 'account/withdraw', payload: amount };
// }
// export function requestLoan(amount: number, purpose: string) {
//   return { type: 'account/requestLoan', payload: { amount, purpose } };
// }
// export function payLoan() {
//   return { type: 'account/payLoan' };
// }

export interface TopLevel {
  amount: number;
  base: string;
  date: Date;
  rates: Rates;
}

export interface Rates {
  USD: number;
}
