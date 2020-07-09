import api from '../utils/api';
import { action, thunk } from 'easy-peasy';

export default {
  services: [],
  editDisplay: false,

  // Fetch Data From Database
  fetchServices: thunk(async (actions) => {
    const res = await api.get('/services');
    actions.setServices(res.data);
  }),
  setServices: action((state, services) => {
    state.services = services;
  }),

  // Add Service
  addService: thunk(async (actions, payload) => {
    try {
      const res = await api.post('/services', payload);

      actions.addOneService(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  addOneService: action((state, service) => {
    state.services = [...state.services, service];
    // state.services.push(service);
  }),

  // Edit Services
  editService: thunk(async (actions, payload) => {
    try {
      const res = await api.put(`/services/${payload.id}`, payload);

      actions.editOneService(res.data);
    } catch (err) {
      console.log(err.message);
    }
  }),
  editOneService: action((state, service) => {
    const serviceIndex = state.services.findIndex(
      (obj) => obj._id === service._id
    );
    const updatedService = {
      ...state.services[serviceIndex],
      ...service,
    };
    state.services = [
      ...state.services.slice(0, serviceIndex),
      updatedService,
      ...state.services.slice(serviceIndex + 1),
    ];
  }),

  // Remove Service
  removeService: thunk(async (actions, id) => {
    try {
      await api.delete(`/services/${id}`);

      actions.removeOneService(id);
    } catch (err) {
      console.log(err.message);
    }
  }),
  removeOneService: action((state, id) => {
    state.services = state.services.filter((service) => service._id !== id);
  }),

  setEditDisplay: action((state, status) => {
    state.editDisplay = status;
  }),
};

/*
{
      id: 1,
      nama: 'Balmut',
      satuan: 'Pcs',
      harga: 10000,
      durasi: 4,
    },
    {
      id: 2,
      nama: 'Cuci Kiloan 3 Hari',
      satuan: 'Kg',
      harga: 7000,
      durasi: 3,
    },
    {
      id: 3,
      nama: 'Cuci Kiloan 1 Hari',
      satuan: 'Kg',
      harga: 10000,
      durasi: 1,
    },
    {
      id: 4,
      nama: 'Cuci Kiloan 6 Jam',
      satuan: 'Kg',
      harga: 10000,
      durasi: 0,
    },
    {
      id: 5,
      nama: 'Sepatu',
      satuan: 'Pcs',
      harga: 20000,
      durasi: 3,
    },
    {
      id: 6,
      nama: 'Helm',
      satuan: 'Pcs',
      harga: 25000,
      durasi: 3,
    },
*/
