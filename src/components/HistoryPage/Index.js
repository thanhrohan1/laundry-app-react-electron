import React, { useState, useEffect } from 'react';
import CurrencyFormat from 'react-currency-format';
import { MdUnfoldMore } from 'react-icons/md';
import moment from 'moment';
import DetailsHistory from './DetailsHistory';

import { useStoreState, useStoreActions } from 'easy-peasy';

const History = () => {
  const [optionFilter, setOptionFilter] = useState('nama');
  const [stringFilter, setStringFilter] = useState('');
  const [displayDetail, setDisplayDetail] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState('');

  const { transactions } = useStoreState((state) => state.transactions);

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

  const handleStringFilter = (e) => {
    setStringFilter(e.target.value);
  };

  const handleFilter = (noFaktur, customer) => {
    if (optionFilter === 'faktur') {
      return noFaktur.toLowerCase().includes(stringFilter.toLowerCase());
    } else {
      return customer.nama.toLowerCase().includes(stringFilter.toLowerCase());
    }
  };

  const handleShowDetails = (transaction) => {
    return <DetailsHistory transaction={transaction} />;
  };

  useEffect(() => {
    if (displayDetail === false) {
      setTransactionDetails('');
    }
  }, [displayDetail]);

  return (
    <div className='relative history container mx-auto'>
      <div className='head-history text-center text-biru font-bold text-4xl mb-10'>
        Riwayat Transaksi
      </div>
      <div className='content-history bg-biru rounded-app w-4/5 mx-auto pt-8 px-8'>
        <div className='filterHistory flex'>
          <select
            className='mr-2 rounded-lg px-4 text-2xl font-bold text-biru'
            name='filter'
            id='filter'
            onChange={(e) => {
              setStringFilter('');
              setOptionFilter(e.target.value);
            }}>
            <option className='font-medium' value='nama'>
              Nama
            </option>
            <option className='font-medium' value='faktur'>
              No Faktur
            </option>
          </select>
          <input
            className='rounded-lg text-biru appearance-none block bg-gray-200 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700'
            type='text'
            placeholder={optionFilter === 'faktur' ? '#NF-wsxxxx' : 'Jailani..'}
            id={optionFilter}
            name={optionFilter}
            value={stringFilter}
            onChange={(e) => handleStringFilter(e, optionFilter)}
          />
        </div>
        <div className='tableHistory mt-8 table-transaksi'>
          <table className='w-full p-10 text-white rounded-b-lg '>
            <thead className='flex w-full pr-4 mb-6 border-b'>
              <tr className='flex w-full items-center text-center py-4'>
                <th className='w-1/12'>No.</th>
                <th className='w-3/12'>Faktur</th>
                <th className='w-3/12'>Nama</th>
                <th className='w-3/12'>Tgl Terima</th>
                <th className='w-3/12'>Tgl Selesai</th>
                <th className='w-3/12'>Total</th>
                <th className='w-3/12'>Sisa</th>
                <th className='w-2/12'>Status</th>
                <th className='w-2/12'>Detail</th>
              </tr>
            </thead>
            <tbody className='flex flex-col w-full overflow-y-scroll'>
              {(transactions || [])
                .filter(({ noFaktur, customer }) => {
                  return handleFilter(noFaktur, customer);
                })
                .sort((a, b) => {
                  const dateA = moment(a.startDate);
                  const dateB = moment(b.startDate);
                  return dateA < dateB ? 1 : -1;
                })
                .map((transaction, index) => (
                  <React.Fragment key={index}>
                    <tr className='flex w-full items-center text-center mb-4'>
                      <td className='w-1/12'>{index + 1}</td>
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
                      {transaction.checkoutDate ? (
                        <td className='status w-2/12 text-hijau bg-white rounded-full font-bold text-2xl'>
                          Selesai
                        </td>
                      ) : (
                        <td className='status w-2/12 text-biru bg-white rounded-full font-bold text-2xl'>
                          Proses
                        </td>
                      )}
                      <td className='font-bold w-2/12'>
                        <button
                          onClick={() => {
                            setDisplayDetail(!displayDetail);
                            setTransactionDetails(transaction);
                          }}
                          disabled={
                            transactionDetails &&
                            transactionDetails._id !== transaction._id
                          }>
                          <MdUnfoldMore className='text-4xl mt-1' />
                        </button>
                      </td>
                    </tr>
                    {displayDetail &&
                      transactionDetails._id === transaction._id &&
                      handleShowDetails(transactionDetails)}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default History;
