import React, { useState, useEffect } from 'react';
import PickDate from './PickDate';
import LaundryIn from './LaundryIn';
import LaundryOut from './LaundryOut';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

import { useStoreState } from 'easy-peasy';

const Report = () => {
  const [startDate, setStartDate] = useState(moment());
  const [endDate, setEndDate] = useState(moment());

  const [totalLaundryIn, setTotalLaundryIn] = useState(0);
  const [totalLaundryOut, setTotalLaundryOut] = useState(0);

  const { transactions } = useStoreState((state) => state.transactions);

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

  const unixBeginStartDate =
    startDate !== null
      ? moment(
          moment(startDate.unix() * 1000)
            .startOf('day')
            .unix() * 1000
        ).unix()
      : '';

  const unixBeginEndDate =
    endDate !== null
      ? moment(
          moment(endDate.unix() * 1000)
            .endOf('day')
            .unix() * 1000
        ).unix()
      : '';

  const unixTransactionDate = (date) => moment(date).unix();

  const filteredLaundryIn = transactions.filter(
    (transaction) =>
      unixBeginStartDate <= unixTransactionDate(transaction.startDate) &&
      unixTransactionDate(transaction.startDate) < unixBeginEndDate
  );

  const filteredLaundryOut = transactions.filter(
    (transaction) =>
      transaction.checkoutDate &&
      unixBeginStartDate <= unixTransactionDate(transaction.checkoutDate) &&
      unixTransactionDate(transaction.checkoutDate) < unixBeginEndDate
  );

  const totalLaundryMasuk = filteredLaundryIn.reduce(
    (sum, { uangCustomer }) => sum + Number(uangCustomer),
    0
  );

  const totalLaundryKeluar = filteredLaundryOut.reduce(
    (sum, { sisaBayar }) => sum + Number(sisaBayar),
    0
  );

  useEffect(() => {
    setTotalLaundryIn(totalLaundryMasuk);
    setTotalLaundryOut(totalLaundryKeluar);
  }, [transactions, startDate, endDate]);

  return (
    <div className='report relative container mx-auto'>
      <div className='head-report text-center text-biru font-bold text-4xl mb-4'>
        Laporan Laundry
      </div>
      <div className='head-report flex justify-between items-center px-8'>
        <div className='filter-tgl flex items-center font-bold text-biru'>
          <p className='text-3xl mr-4'>Pilih Tanggal :</p>
          <PickDate
            startDate={startDate}
            endDate={endDate}
            setStartDate={(value) => setStartDate(value)}
            setEndDate={(value) => setEndDate(value)}
          />
        </div>
        <div className='total-uang text-hijau font-bold flex items-center'>
          <p className='text-3xl mr-4 text-biru'>Total Uang :</p>
          <h2 className='text-4xl'>
            {handleShowMoney(totalLaundryOut + totalLaundryIn)}
          </h2>
        </div>
      </div>
      <div className='content-report w-full mt-4 grid grid-cols-2 gap-5'>
        <div className='report-kiri bg-biru rounded-app'>
          <LaundryIn
            transactions={filteredLaundryIn}
            totalLaundryIn={totalLaundryIn}
          />
        </div>
        <div className='report-kanan bg-biru rounded-app '>
          <LaundryOut
            transactions={filteredLaundryOut}
            totalLaundryOut={totalLaundryOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Report;
