import React, { useState, useEffect } from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { MdPrint } from 'react-icons/md';
import PrintModalCheckout from './PrintModal';
import Swal from 'sweetalert2';

import { useStoreActions } from 'easy-peasy';

const TableCheckout = ({ transactions, optionFilter, stringFilter }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transactionToPrint, setTransactionToPrint] = useState('');

  const handleFilter = (noFaktur, customer) => {
    if (optionFilter === 'faktur') {
      return noFaktur.toLowerCase().includes(stringFilter.toLowerCase());
    } else {
      return customer.nama.toLowerCase().includes(stringFilter.toLowerCase());
    }
  };

  const handleShowDate = (date) => {
    return moment(date).format('DD/MM/YYYY');
  };

  const handleShowMoney = (money) => {
    return (
      <CurrencyFormat
        value={money}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp. '}
      />
    );
  };

  const handleAmbil = () => {
    Swal.fire({
      title: 'Yakin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ambil Donk',
    }).then((status) => {
      if (status.isConfirmed) {
        setIsModalOpen(true);
      }
    });
  };

  useEffect(() => {
    if (isModalOpen === false) {
      setTransactionToPrint('');
    }
  }, [isModalOpen]);

  return (
    <div className='tableCheckout tableHistory mt-8 table-transaksi'>
      {isModalOpen && (
        <PrintModalCheckout
          transaction={transactionToPrint}
          isModalOpen={isModalOpen}
          setIsModalOpen={() => setIsModalOpen(false)}
        />
      )}
      <table className='w-full p-10 text-white rounded-b-lg '>
        <thead className='flex w-full pr-4 mb-6 border-b'>
          <tr className='flex w-full items-center text-center py-4'>
            <th className='w-1/12'>No.</th>
            <th className='w-3/12'>Ambil</th>
            <th className='w-3/12'>Faktur</th>
            <th className='w-3/12'>Nama</th>
            <th className='w-3/12'>Tgl Terima</th>
            <th className='w-3/12'>Tgl Selesai</th>
            <th className='w-3/12'>Total</th>
            <th className='w-3/12'>Sisa</th>
          </tr>
        </thead>
        <tbody className='flex flex-col w-full overflow-y-scroll'>
          {(transactions || [])
            .filter(({ noFaktur, customer }) => {
              return handleFilter(noFaktur, customer);
            })
            .filter((transaction) => {
              return transaction.checkoutDate ? false : true;
            })
            .sort((a, b) => {
              const dateA = moment(a.startDate);
              const dateB = moment(b.startDate);
              return dateA < dateB ? -1 : 1;
            })
            .map((transaction, index) => (
              <React.Fragment key={index}>
                <tr className='flex w-full items-center text-center mb-4'>
                  <td className='w-1/12'>{index + 1}</td>
                  <td className='w-3/12 flex item-center justify-center'>
                    <button
                      className='w-4/5 flex items-center justify-center text-biru bg-white rounded-full text-2xl px-4 py-1 font-bold'
                      onClick={() => {
                        setTransactionToPrint(transaction);
                        handleAmbil();
                      }}>
                      <p className='mr-1'>Ambil</p>
                      <MdPrint className='block' />
                    </button>
                  </td>
                  <td className='w-3/12'>{transaction.noFaktur}</td>
                  <td className='w-3/12'>{transaction.customer.nama}</td>
                  <td className='w-3/12'>
                    {handleShowDate(transaction.startDate)}
                  </td>
                  <td className='w-3/12'>
                    {handleShowDate(transaction.endDate)}
                  </td>
                  <td className='w-3/12'>
                    {handleShowMoney(transaction.totalHarga)}
                  </td>
                  <td className='w-3/12'>
                    {handleShowMoney(transaction.sisaBayar)}
                  </td>
                </tr>
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableCheckout;
