import { applyMiddleware, combineReducers, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { RootState } from './types';


const rootReducer = combineReducers<RootState>({
  account: accountReducer,
  customer: customerReducer,
})

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;