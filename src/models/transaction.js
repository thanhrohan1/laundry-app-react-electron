import { action } from 'easy-peasy';
import uniqid from 'uniqid';
import moment from 'moment';

export default {
  noFaktur: uniqid('#NF-'),
  totalHarga: 0,
  parfum: 'random',
  paket: 'Sesuai Item',
  tipeBayar: 'dp',
  uangCustomer: 0,
  sisaBayar: 0,
  totalItem: 0,
  customer: {
    _id: '',
    nama: '',
    alamat: '',
    ponsel: '',
  },
  items: [],
  startDate: moment(),
  endDate: moment().add(2, 'd'),

  resetTransaction: action((state) => {
    state.noFaktur = uniqid('#NF-');
    state.totalHarga = 0;
    state.parfum = 'random';
    state.paket = 'Sesuai Item';
    state.tipeBayar = 'dp';
    state.uangCustomer = 0;
    state.sisaBayar = 0;
    state.totalItem = 0;
    (state.customer = {
      _id: '',
      nama: '',
      alamat: '',
      ponsel: '',
    }),
      (state.items = []);
    state.startDate = moment();
    state.endDate = moment().add(2, 'd');
  }),

  setStartDate: action((state, newStartDate) => {
    state.startDate = newStartDate;
  }),

  setEndDate: action((state, newEndDate) => {
    state.endDate = newEndDate;
  }),

  setCustomer: action((state, customer) => {
    state.customer = customer;
  }),

  // setJam: action((state, newJam) => {
  //   state.jam = newJam;
  // }),

  setParfum: action((state, event) => {
    state.parfum = event.target.value;
  }),

  setPaket: action((state, event) => {
    state.paket = event.target.value;
  }),

  setTipeBayar: action((state, tipeDP) => {
    state.tipeBayar = tipeDP;
  }),

  setUangCustomer: action((state, newUangCustomer) => {
    state.uangCustomer = newUangCustomer;
  }),

  setTotalItem: action((state, newTotalItem) => {
    state.totalItem = newTotalItem;
  }),

  setItems: action((state, items) => {
    state.items = items;
  }),

  setTotalHarga: action((state, newTotalHarga) => {
    state.totalHarga = newTotalHarga;
  }),

  setSisaBayar: action((state, sisa) => {
    state.sisaBayar = sisa;
  }),

  addItemTransaction: action((state, { item }) => {
    const newItem = {
      ...item,
      qty: 1,
      keterangan: '',
      total: item.harga,
    };
    state.items = [...state.items, newItem];
  }),

  updateQtyWithSelect: action((state, item) => {
    const newQty = item.qty + 1;
    const newTotal = item.harga * newQty;
    const itemIndex = state.items.findIndex((obj) => obj._id === item._id);
    const updatedItem = {
      ...state.items[itemIndex],
      qty: newQty,
      total: newTotal,
    };
    state.items = [
      ...state.items.slice(0, itemIndex),
      updatedItem,
      ...state.items.slice(itemIndex + 1),
    ];
  }),

  updateQty: action((state, { item, e }) => {
    const value = e.target.value;
    const newQty = value < 0 ? 0 : parseFloat(value);
    const newTotal = item.harga * newQty;
    const itemIndex = state.items.findIndex((obj) => obj._id === item._id);
    const updatedItem = {
      ...state.items[itemIndex],
      qty: newQty,
      total: newTotal,
    };
    state.items = [
      ...state.items.slice(0, itemIndex),
      updatedItem,
      ...state.items.slice(itemIndex + 1),
    ];
  }),

  removeItemTransaction: action((state, id) => {
    state.items = state.items.filter((item) => item._id !== id);
  }),

  setKeterangan: action((state, { item, text }) => {
    const itemIndex = state.items.findIndex((obj) => obj._id === item._id);
    const updatedItem = {
      ...state.items[itemIndex],
      keterangan: text,
    };
    state.items = [
      ...state.items.slice(0, itemIndex),
      updatedItem,
      ...state.items.slice(itemIndex + 1),
    ];
  }),
};
