import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import Routes from './routers/Routes';
import { StoreProvider } from 'easy-peasy';
import store from './store';

import 'normalize.css/normalize.css';
import './styles/styles.scss';
import './styles/styles.css';
import './styles/tailwind/tailwind.css';

// Auth
import setAuthToken from './utils/setAuthToken';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.getActions().auth.loadUser();
  }, []);

  return (
    <StoreProvider store={store}>
      <Routes />
    </StoreProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
