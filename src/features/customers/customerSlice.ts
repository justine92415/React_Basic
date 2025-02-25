
const initialStateCustomer = {
  fullName: '',
  nationalID: '',
  createdAt: '',
};

export default function customerReducer(state = initialStateCustomer, action: any) {
  switch (action.type) {
    case 'customer/createCustomer':
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case 'customer/updateName':
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
}

export function createCustomer(fullName: string, nationalID: string) {
  return {
    type: 'customer/createCustomer',
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

export function updateName(fullName: string) {
  return {
    type: 'customer/updateName',
    payload: fullName,
  };
}