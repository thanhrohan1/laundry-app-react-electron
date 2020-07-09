import { action } from 'easy-peasy';

export default {
  isOpenModalAddItemTransaction: false,
  isOpenModalSummaryPrint: false,
  isOpenModalAddCustomer: false,
  isOpenModalAddService: false,
  isOpenModalHistory: false,

  setIsOpenModalAddItemTransaction: action((state, newStatus) => {
    state.isOpenModalAddItemTransaction = newStatus;
  }),

  setIsOpenModalHistory: action((state, newStatus) => {
    state.isOpenModalHistory = newStatus;
  }),

  setIsOpenModalSummaryPrint: action((state, newStatus) => {
    state.isOpenModalSummaryPrint = newStatus;
  }),

  setIsOpenModalAddCustomer: action((state, newStatus) => {
    state.isOpenModalAddCustomer = newStatus;
  }),

  setIsOpenModalAddService: action((state, newStatus) => {
    state.isOpenModalAddService = newStatus;
  }),
};
