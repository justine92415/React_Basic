import { connect } from "react-redux";
import { IStore } from "../../types";

function formatCurrency(value: any) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

function BalanceDisplay({ balance }: { balance: number }) {
  return <div className="balance">{formatCurrency(balance)}</div>;
}

// 舊方法，see^2 就好
function mapStateToProps(state:IStore) {
  return {
    balance: state.account.balance,
  };
}

export default connect(mapStateToProps)(BalanceDisplay);
