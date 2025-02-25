import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { RootState } from './types';


const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer);

export default store;