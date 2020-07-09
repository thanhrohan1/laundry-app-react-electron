import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

import ModalDetails from './ModalDetails';

const LaundryOut = ({ transactions, totalLaundryOut }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToDetail, setTransactionToDetail] = useState('');

  const handleShowMoney = (money) => {
    return (
      <CurrencyFormat
        value={money}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp. '}
        suffix={',-'}
      />
    );
  };

  useEffect(() => {
    if (isModalOpen === false) {
      setTransactionToDetail('');
    }
  }, [isModalOpen]);

  return (
    <React.Fragment>
      {isModalOpen && (
        <ModalDetails
          transaction={transactionToDetail}
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(false)}
        />
      )}
      <div className='head-in flex justify-between px-10 pt-6'>
        <p className='text-3xl font-bold text-kuning'>Laundry Keluar</p>
        <div className='total-in flex text-white'>
          <p className='text-3xl font-bold mr-4'>Total :</p>
          <p className='text-3xl font-bold mr-4'>
            {handleShowMoney(totalLaundryOut)}
          </p>
        </div>
      </div>
      <div className='table-in'>
        <table className='w-11/12 table-transaksi mx-auto text-white rounded-b-lg'>
          <thead className='flex w-full mb-4 border-b pr-4'>
            <tr className='flex w-full items-center text-center py-4'>
              <td className='w-1/12'>No.</td>
              <td className='w-3/12'>Nama</td>
              <td className='w-3/12'>Tgl Masuk</td>
              <td className='w-3/12'>Uang Masuk</td>
              <td className='w-2/12'>Detail</td>
            </tr>
          </thead>
          <tbody className='flex flex-col w-full overflow-y-scroll'>
            {(transactions || [])
              .sort((a, b) => {
                const dateA = moment(a.startDate);
                const dateB = moment(b.startDate);
                return dateA < dateB ? -1 : 1;
              })
              .map((transaction, index) => (
                <React.Fragment key={index}>
                  <tr className='flex w-full items-center text-center mb-4'>
                    <td className='w-1/12'>{index + 1}</td>
                    <td className='w-3/12'>{transaction.customer.nama}</td>
                    <td className='w-3/12'>
                      {moment(transaction.startDate).format('DD/MM/YYYY')}
                    </td>
                    <td className='w-3/12'>
                      {handleShowMoney(transaction.sisaBayar)}
                    </td>
                    <td className='w-2/12'>
                      <button
                        onClick={() => {
                          setTransactionToDetail(transaction);
                          setIsModalOpen(true);
                        }}>
                        details
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
};

export default LaundryOut;
