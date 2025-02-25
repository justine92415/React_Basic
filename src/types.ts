import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface RootState {
  account: (state: AccountState, action: any) => AccountState;
  customer: (state: CustomerState, action: any) => CustomerState;
}

export interface CustomerState {
  fullName: string;
  nationalID: string;
  createdAt: string;
}

export interface AccountState {
  balance: number;
  loan: number;
  loanPurpose: string;
  isLoading: boolean;
}

export interface IStore {
  account: AccountState;
  customer: CustomerState;
}

// 定義 action 類型
export type DepositAction = { type: 'account/deposit'; payload: number };
export type WithdrawAction = { type: 'account/withdraw'; payload: number };
export type RequestLoanAction = { 
  type: 'account/requestLoan'; 
  payload: { amount: number; purpose: string } 
};
export type PayLoanAction = { type: 'account/payLoan' };

// Redux Thunk 特定類型
export type AppDispatch = ThunkDispatch<IStore, unknown, AnyAction>;
export type GetState = () => IStore;

export type DepositFn = DepositAction | ((dispatch: AppDispatch, getState: GetState) => Promise<void>)