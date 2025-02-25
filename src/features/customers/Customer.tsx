import { useSelector } from 'react-redux';
import { IStore } from '../../types';

function Customer() {
  const customer = useSelector<IStore, string>((store) => store.customer.fullName);
  return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;
