import api from '../utils/api';
import { action, thunk } from 'easy-peasy';

export default {
  customers: [],
  editDisplay: false,

  // Fetch Customer From Database
  fetchCustomers: thunk(async (actions) => {
    const res = await api.get('/customers');
    actions.setCustomers(res.data);
  }),
  setCustomers: action((state, customers) => {
    state.customers = customers;
  }),

  // Add Customer
  addCustomer: thunk(async (actions, payload) => {
    try {
      const res = await api.post('/customers', payload);

      actions.addOneCustomer(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  addOneCustomer: action((state, customer) => {
    state.customers = [...state.customers, customer];
  }),

  // Edit Customer
  editCustomer: thunk(async (actions, payload) => {
    try {
      const res = await api.put(`/customers/${payload.id}`, payload);

      actions.editOneCustomer(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  editOneCustomer: action((state, customer) => {
    const customerIndex = state.customers.findIndex(
      (obj) => obj._id === customer._id
    );
    const updatedCustomer = {
      ...state.customers[customerIndex],
      ...customer,
    };
    state.customers = [
      ...state.customers.slice(0, customerIndex),
      updatedCustomer,
      ...state.customers.slice(customerIndex + 1),
    ];
  }),

  // Remove Customer
  removeCustomer: thunk(async (actions, id) => {
    try {
      await api.delete(`/customers/${id}`);

      actions.removeOneCustomer(id);
    } catch (err) {
      console.log(err.message);
    }
  }),
  removeOneCustomer: action((state, id) => {
    state.customers = state.customers.filter((customer) => customer._id !== id);
  }),

  setEditDisplay: action((state, status) => {
    state.editDisplay = status;
  }),
};
