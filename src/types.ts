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
}

export interface IStore {
  account: AccountState;
  customer: CustomerState;
}
