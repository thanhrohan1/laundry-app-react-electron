import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
// Part of Pages
import Header from '../components/Parts/Header';
import Footer from '../components/Parts/Footer';
// Pages
import Home from '../components/HomePage/Index.js';
import Customer from '../components/CustomerPage/Index.js';
import Service from '../components/ServicePage/Index.js';
import Transaction from '../components/TransactionPage/Index.js';
import NotFound from '../components/NotFoundPage/Index.js';
import History from '../components/HistoryPage/Index.js';
import CheckOut from '../components/CheckoutPage/Index.js';
import Report from '../components/ReportPage/Index.js';
import Login from '../components/LoginPage/Index.js';
import PrivateRoutes from './PrivateRoutes.js';
import PublicRoute from './PublicRoute.js';

const Routes = () => (
  <Router>
    <Fragment>
      <Header />
      <Switch>
        <PublicRoute path='/login' component={Login} restricted={true} />
        <PrivateRoutes exact path='/' component={Home} />
        <PrivateRoutes path='/transactions' component={Transaction} />
        <PrivateRoutes path='/customers' component={Customer} />
        <PrivateRoutes path='/services' component={Service} />
        <PrivateRoutes path='/history' component={History} />
        <PrivateRoutes path='/checkout' component={CheckOut} />
        <PrivateRoutes path='/report' component={Report} />
        <PrivateRoutes component={NotFound} />
      </Switch>
      <Footer />
    </Fragment>
  </Router>
);

export default Routes;
