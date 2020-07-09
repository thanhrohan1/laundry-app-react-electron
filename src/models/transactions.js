import api from '../utils/api';
import { action, thunk } from 'easy-peasy';
import moment from 'moment';

export default {
  transactions: [],

  // Fetch Data Transaction from Database
  fetchTransactions: thunk(async (actions) => {
    const res = await api.get('/transactions');
    actions.setTransactions(res.data);
  }),
  setTransactions: action((state, transactions) => {
    state.transactions = transactions;
  }),

  // Add Transaction
  addTransaction: thunk(async (actions, payload) => {
    try {
      const res = await api.post('/transactions', payload);
      actions.addOneTransaction(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  addOneTransaction: action((state, transaction) => {
    state.transactions = [...state.transactions, transaction];
  }),

  checkoutTransaction: thunk(async (actions, id) => {
    try {
      const res = await api.put(`/transactions/checkout/${id}`);

      actions.checkoutOneTransaction(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  checkoutOneTransaction: action((state, transaction) => {
    const transactionIndex = state.transactions.findIndex(
      (obj) => obj._id === transaction._id
    );

    const updatedTransaction = {
      ...state.transactions[transactionIndex],
      ...transaction,
    };
    state.transactions = [
      ...state.transactions.slice(0, transactionIndex),
      updatedTransaction,
      ...state.transactions.slice(transactionIndex + 1),
    ];
  }),
};
