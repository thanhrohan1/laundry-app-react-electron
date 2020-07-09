import React from 'react';
import { useStoreState } from 'easy-peasy';

const Footer = () => {
  const { isAuthenticated } = useStoreState((state) => state.auth.authData);

  return isAuthenticated ? (
    <div>
      <footer className='flex justify-center items-center text-white'>
        <h2>Campus Laundry, perumahan ona raya paling depan</h2>
      </footer>
    </div>
  ) : null;
};

export default Footer;
