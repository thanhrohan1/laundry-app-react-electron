import React, { Fragment, useState, useEffect } from 'react';
import ChartTransaction from './ChartTransaction';
import HeadContent from './HeadContent';
import moment from 'moment';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Home = () => {
  const [chartData, setChartData] = useState({});

  // ====== FETCH DATA KETIKA LOGIN KE HOME =======
  const { fetchCustomers, fetchServices, fetchTransactions } = useStoreActions(
    (actions) => ({
      fetchCustomers: actions.customers.fetchCustomers,
      fetchServices: actions.services.fetchServices,
      fetchTransactions: actions.transactions.fetchTransactions,
    })
  );

  useEffect(() => {
    fetchCustomers();
    fetchServices();
    fetchTransactions();
  }, []);
  // ==============================================

  // Component willmount
  useEffect(() => {
    getChartData();
    return () => {
      setChartData({});
    };
  }, []);

  const { transactions } = useStoreState((state) => state.transactions);

  const unix7DaysBefore = moment(
    moment(moment().subtract(7, 'd').unix() * 1000)
      .startOf('day')
      .unix() * 1000
  ).unix();

  const unixEndToday = moment(
    moment(moment().unix() * 1000)
      .endOf('day')
      .unix() * 1000
  ).unix();

  const unixTransactionDate = (date) => moment(date).unix();

  const aWeekLaundryIn = transactions
    .filter(
      (transaction) =>
        unix7DaysBefore <= unixTransactionDate(transaction.startDate) &&
        unixTransactionDate(transaction.startDate) < unixEndToday
    )
    .map(({ startDate, uangCustomer }) => ({
      date: moment(startDate).format('DD/MM/YY'),
      money: uangCustomer,
    }));

  const aWeekLaundryOut = transactions
    .filter(
      (transaction) =>
        transaction.checkoutDate &&
        unix7DaysBefore <= unixTransactionDate(transaction.checkoutDate) &&
        unixTransactionDate(transaction.checkoutDate) < unixEndToday
    )
    .map(({ checkoutDate, sisaBayar }) => ({
      date: moment(checkoutDate).format('DD/MM/YY'),
      money: sisaBayar,
    }));

  const listOfStartDate = aWeekLaundryIn.map(({ date }) => date);
  const listOfCheckOutDate = aWeekLaundryOut.map(({ date }) => date);
  let uniqueDates = [
    ...new Set(listOfStartDate),
    ...new Set(listOfCheckOutDate),
  ].sort();

  const combineLaundryInOut = aWeekLaundryIn.concat(aWeekLaundryOut);

  const totalMoneyPerDates = uniqueDates.map((uniqueDate) => {
    const filteredDate = combineLaundryInOut.filter(
      ({ date }) => uniqueDate == date
    );
    const total = filteredDate.reduce(
      (sum, { money }) => sum + Number(money),
      0
    );
    return total;
  });

  const getChartData = () => {
    setChartData({
      labels: uniqueDates,
      datasets: [
        {
          label: 'Transaksi Harian',
          data: totalMoneyPerDates,
          backgroundColor: 'rgba(255, 86, 7, .1)',
          borderColor: 'rgba(255, 86, 7, .6)',
        },
      ],
    });
  };

  return (
    <Fragment>
      <div className='dashboard container mx-auto'>
        <HeadContent />
        <ChartTransaction
          chartData={chartData}
          displayLegend='true'
          displayTitle='true'
          legendPosition='bottom'
        />
      </div>
    </Fragment>
  );
};

export default Home;
