import React from 'react';
import { NavLink } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import { FaSignOutAlt } from 'react-icons/fa';
import { useStoreState, useStoreActions } from 'easy-peasy';

// import img from '../../img/icon.png';

const Header = () => {
  const { isAuthenticated, user } = useStoreState(
    (state) => state.auth.authData
  );

  const { logout } = useStoreActions((actions) => actions.auth);

  return isAuthenticated ? (
    <div className='header'>
      <header className='flex justify-between items-center bg-biru text-white text-3xl'>
        <div className='flex justify-between items-center header-kiri ml-20'>
          <NavLink
            className='m-10 text-5xl'
            to='/'
            activeClassName='is-active'
            exact={true}>
            <MdHome />
          </NavLink>
          <NavLink
            className='m-10'
            to='/transactions'
            activeClassName='is-active'>
            Transaksi
          </NavLink>
          <NavLink className='m-10' to='/checkout' activeClassName='is-active'>
            Ambil
          </NavLink>
          <NavLink className='m-10' to='/history' activeClassName='is-active'>
            Riwayat
          </NavLink>
          <NavLink className='m-10' to='/services' activeClassName='is-active'>
            Layanan
          </NavLink>
          <NavLink className='m-10' to='/customers' activeClassName='is-active'>
            Pelanggan
          </NavLink>
          <NavLink className='m-10' to='/report' activeClassName='is-active'>
            Laporan
          </NavLink>
        </div>
        <div className='flex justify-between items-center header-kanan mr-20'>
          <p className='m-10'>{user ? user.name : null}</p>
          <button
            onClick={() => logout()}
            type='button'
            className='flex justify-between items-center'>
            <p className='ml-10 mr-3'>Keluar</p>
            <p className='mr-10'>
              <FaSignOutAlt />
            </p>
          </button>
        </div>
      </header>
      <div className='logo-group container mx-auto flex justify-center items-center text-biru my-8'>
        {/* <img className='logo border-biru mr-8' src={img} alt='' /> */}
        <div className='logo-text'>
          <h1 className='text-5xl font-semibold'>Campus Laundry</h1>
          <h2 className='text-3xl text-black'>Laundry premium terpercaya ..</h2>
        </div>
      </div>
    </div>
  ) : null;
};

export default Header;
