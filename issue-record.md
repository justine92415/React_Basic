# Redux Thunk 與 TypeScript 整合筆記

## 問題：使用 Redux Thunk 時遇到的 TypeScript 錯誤

當在 TypeScript 專案中使用 Redux Thunk 處理異步 action 時，常見的錯誤是：

```
類型 'DepositFn' 的引數不可指派給類型 'UnknownAction' 的參數。
類型 '(dispatch: AppDispatch, getState: GetState) => Promise<void>' 不可指派給類型 'UnknownAction'。
```

## 解決方案

### 1. 定義正確的 Action 類型

```typescript
// 定義 action 類型
export type DepositAction = { type: 'account/deposit'; payload: number };
export type WithdrawAction = { type: 'account/withdraw'; payload: number };
export type RequestLoanAction = { 
  type: 'account/requestLoan'; 
  payload: { amount: number; purpose: string } 
};
export type PayLoanAction = { type: 'account/payLoan' };
```

### 2. 定義 ThunkDispatch 相關類型

```typescript
import { AnyAction } from "redux";
import { ThunkDispatch } from "redux-thunk";

export interface IStore {
  account: AccountState;
  customer: CustomerState;
}

// Redux Thunk 特定類型
export type AppDispatch = ThunkDispatch<IStore, unknown, AnyAction>;
export type GetState = () => IStore;

// 定義可以返回 thunk 函數的 action creator 類型
export type DepositFn = DepositAction | ((dispatch: AppDispatch, getState: GetState) => Promise<void>);
```

### 3. 在 action creator 中使用正確的返回類型

```typescript
// 使用從 types.ts 引入的類型
export function deposit(amount: number, currency: string): DepositFn {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };
  return async function(dispatch: AppDispatch, getState: GetState) {
    const res = await convert(currency, 'USD', amount);
    const data: TopLevel = await res.json();
    const convertedAmount = data.rates.USD;
    dispatch({ type: 'account/deposit', payload: amount * convertedAmount });
  };
}
```

### 4. 關鍵：為 useDispatch 指定正確類型

```typescript
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../types';

// 在組件中使用 AppDispatch 類型
const dispatch = useDispatch<AppDispatch>();
```

## 重要知識點

1. **ThunkDispatch 是 Dispatch 的超集**：它不僅可以處理 thunk 函數，還能處理普通的 action 對象。

2. **為什麼需要指定 useDispatch 類型**：
   ```typescript
   const dispatch = useDispatch<AppDispatch>();
   ```
   這告訴 TypeScript 這個 dispatch 是增強版的，可以處理所有類型的 action，包括 thunk action。

3. **確保 store 設置包含 thunk 中間件**：
   ```typescript
   import { createStore, applyMiddleware } from 'redux';
   import thunk from 'redux-thunk';
   
   const store = createStore(rootReducer, applyMiddleware(thunk));
   ```

## 優點

正確地為 Redux Thunk 設置 TypeScript 類型可以：

1. 提高代碼的類型安全性
2. 提供更好的編輯器自動完成支援
3. 在編譯時捕獲潛在的錯誤
4. 使代碼結構更清晰，維護更容易