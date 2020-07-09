import React from 'react';
import Modal from 'react-modal';
import CurrencyFormat from 'react-currency-format';
import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from 'moment';

const HistoryTransaction = ({ customer }) => {
  const { transactions } = useStoreState((state) => state.transactions);

  const historiesCustomer = () => {
    return transactions.filter(
      (transaction) => transaction.customer._id === customer._id
    );
  };

  const grandTotalTransaksi = () => {
    return historiesCustomer().reduce(
      (sum, { totalHarga }) => sum + totalHarga,
      0
    );
  };

  // Modal Setting
  const { isOpenModalHistory } = useStoreState((state) => state.modal);
  const { setIsOpenModalHistory } = useStoreActions((actions) => actions.modal);

  Modal.setAppElement('#app');
  return (
    <Modal
      className='modal modalHistory'
      isOpen={isOpenModalHistory}
      onRequestClose={() => setIsOpenModalHistory(false)}>
      <div className='flex justify-between items-center bg-gray-300 py-10 px-10 rounded-t-lg'>
        <h1 className='text-4xl font-medium text-left '>
          Histori Laundry : <b>{customer.nama}</b>
        </h1>
        <p className='text-3xl font-bold text-right '>
          Total :
          <CurrencyFormat
            value={grandTotalTransaksi()}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
          />
        </p>
      </div>
      {(historiesCustomer() || []).length === 0 ? (
        <div className='historyKosong'>
          <p>Belum melakukan transaksi</p>
        </div>
      ) : (
        <div className='showHistory'>
          <table className='w-full p-10 bg-gray-200 rounded-b-lg'>
            <thead className='flex text-black w-full pr-4 mb-6 border-b'>
              <tr className='flex w-full items-center text-center py-4'>
                <th className='w-1/12'>No.</th>
                <th className='w-3/12'>No. Faktur</th>
                <th className='w-3/12'>Tgl Terima</th>
                <th className='w-3/12'>Tgl Selesai</th>
                <th className='w-2/12'>Total</th>
                <th className='w-2/12'>Sisa</th>
                <th className='w-2/12'>Status</th>
              </tr>
            </thead>
            <tbody className='flex flex-col text-black w-full overflow-y-scroll'>
              {(historiesCustomer(customer) || []).map((histories, index) => (
                <tr
                  key={index}
                  className='flex w-full items-center text-center mb-4'>
                  <td className='w-1/12'>{index + 1}</td>
                  <td className='w-3/12'>{histories.id}</td>
                  <td className='w-3/12'>
                    {moment(histories.startDate).format('DD/MM/YYYY')}
                  </td>
                  <td className='w-3/12'>
                    {moment(histories.endDate).format('DD/MM/YYYY')}
                  </td>
                  <td className='w-2/12'>{histories.totalHarga}</td>
                  <td className='w-2/12'>{histories.sisaBayar}</td>
                  {histories.checkoutDate ? (
                    <td className='w-2/12 text-hijau'>Selesai</td>
                  ) : (
                    <td className='w-2/12 text-biru'>Proses</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Modal>
  );
};

export default HistoryTransaction;
