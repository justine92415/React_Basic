import { useSelector } from 'react-redux';
import { IStore } from '../../types';

function Customer() {
  const customer = useSelector((store: IStore) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
