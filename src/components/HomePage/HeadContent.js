import React, { useEffect, useState } from 'react';
import ButtonInfo from './ButtonInfo';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';
import { NavLink } from 'react-router-dom';

import { useStoreState } from 'easy-peasy';

const HeadContent = () => {
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

  const unixBeginToday = moment(
    moment(moment().unix() * 1000)
      .startOf('day')
      .unix() * 1000
  ).unix();

  const unixEndToday = moment(
    moment(moment().unix() * 1000)
      .endOf('day')
      .unix() * 1000
  ).unix();

  const unixTransactionDate = (date) => moment(date).unix();

  const filteredLaundryInToday = transactions.filter(
    (transaction) =>
      unixBeginToday <= unixTransactionDate(transaction.startDate) &&
      unixTransactionDate(transaction.startDate) < unixEndToday
  );

  const filteredLaundryOutToday = transactions.filter(
    (transaction) =>
      transaction.checkoutDate &&
      unixBeginToday <= unixTransactionDate(transaction.checkoutDate) &&
      unixTransactionDate(transaction.checkoutDate) < unixEndToday
  );

  const totalLaundryMasuk = filteredLaundryInToday.reduce(
    (sum, { uangCustomer }) => sum + Number(uangCustomer),
    0
  );

  const totalLaundryKeluar = filteredLaundryOutToday.reduce(
    (sum, { sisaBayar }) => sum + Number(sisaBayar),
    0
  );

  useEffect(() => {
    setTotalLaundryIn(totalLaundryMasuk);
    setTotalLaundryOut(totalLaundryKeluar);
  }, [transactions]);

  return (
    <React.Fragment>
      <div className='head-content flex justify-between items-center'>
        <div className='btn-home flex justify-between pl-6'>
          <NavLink
            to='/transactions'
            activeClassName='is-active'>
            <ButtonInfo
              text='Input Transaksi'
              bgColor='hijau'
              textColor='white'
            />
          </NavLink>

          <NavLink
            to='/checkout'
            activeClassName='is-active'>
            <ButtonInfo text='Ambil Laundry' bgColor='biru' textColor='white' />
          </NavLink>
          
        </div>
        <div className='info-home pr-20'>
          <div className='total-today flex justify-between text-gray-700 mb-2 text-3xl font-bold px-4'>
            <p className=''>Hari Ini</p>
            <p>{handleShowMoney(totalLaundryIn + totalLaundryOut)}</p>
          </div>
          <div className='info-laundry flex justify-between'>
            <div className='masuk text-center mr-4'>
              <p className='bg-biru rounded-t-lg py-2 px-6 text-white'>
                Laundry Masuk
              </p>
              <p className='py-2 text-3xl rounded-b-lg border text-biru'>
                {filteredLaundryInToday.length}
              </p>
            </div>
            <div className='keluar text-center'>
              <p className='bg-hijau rounded-t-lg py-2 px-6 text-white'>
                Laundry Keluar
              </p>
              <p className='py-2 text-3xl rounded-b-lg border text-hijau'>
                {filteredLaundryOutToday.length || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeadContent;
