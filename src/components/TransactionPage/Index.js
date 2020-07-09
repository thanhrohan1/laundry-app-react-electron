import React, { useState, useRef, useEffect, lazy } from 'react';

import PickDate from './PickDate';
import Summary from './Summary';
import Table from './Table';
import AddCustomer from '../CustomerPage/AddCustomer';

import { MdAddCircle, MdClearAll } from 'react-icons/md';
import { useStoreState, useStoreActions } from 'easy-peasy';

const Transaction = () => {
  const [display, setDisplay] = useState(false);
  const [filterNama, setFilterNama] = useState('');
  const wrapperRef = useRef(null);

  const { customers } = useStoreState((state) => state.customers);
  const { namaCustomer } = useStoreState((state) => ({
    namaCustomer: state.transaction.customer.nama,
  }));

  const { isOpenModalAddCustomer } = useStoreState((state) => state.modal);
  const { setIsOpenModalAddCustomer } = useStoreActions(
    (actions) => actions.modal
  );

  const { setCustomer } = useStoreActions((actions) => ({
    setCustomer: actions.transaction.setCustomer,
  }));

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showCustomer = (e) => {
    e.persist();
    setFilterNama(e.target.value);
  };

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setDisplay(false);
    }
  };

  const setCustomerOnClick = (customer) => {
    setCustomer({
      _id: customer._id,
      nama: customer.nama,
      alamat: customer.alamat,
      ponsel: customer.ponsel,
    });
    setFilterNama('');
    setDisplay(false);
  };

  return (
    <div className='transaksi relative container mx-auto'>
      <div className='head-transaksi flex justify-between items-center text-biru font-semibold text-3xl mb-10'>
        <div ref={wrapperRef} className='flex items-center nama-cust ml-5'>
          {namaCustomer === '' ? (
            <React.Fragment>
              <p className='flex-none mr-5'>Cari Nama : </p>
              <input
                className='rounded-lg appearance-none block w-full bg-gray-200 border border-gray-200 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700'
                type='text'
                placeholder='Nama Pelanggan'
                id='nama-cust'
                name='nama-cust'
                value={filterNama}
                onChange={showCustomer}
                onClick={() => setDisplay(!display)}
              />
              {display && (
                <div className='show-customer flex flex-col rounded-lg absolute -mt-10 bg-gray-200 shadow-xl overflow-y-scroll text-black'>
                  {(customers || [])
                    .filter(({ nama }) =>
                      nama.toLowerCase().includes(filterNama.toLowerCase())
                    )
                    .map((customer, index) => (
                      <div
                        key={index}
                        tabIndex='0'
                        className='customer py-3 px-5 w-full hover:bg-gray-400 font-medium'
                        onClick={() => setCustomerOnClick(customer)}>
                        <h3 className='text-3xl'>{customer.nama}</h3>
                        <p className='text-xl'>{customer.ponsel}</p>
                      </div>
                    ))
                    .sort((a, b) => {
                      return customers.indexOf(a) < customers.indexOf(b)
                        ? 1
                        : -1;
                    })}
                </div>
              )}
              <button
                className='add-cust text-5xl ml-5'
                onClick={() => setIsOpenModalAddCustomer(true)}>
                <MdAddCircle />
              </button>
              {isOpenModalAddCustomer && <AddCustomer />}
            </React.Fragment>
          ) : (
            <React.Fragment>
              <p className='flex-none mr-5 font-medium'>Nama Customer : </p>
              <p>{namaCustomer}</p>
              <button
                className='flex add-cust text-4xl ml-6 items-center'
                onClick={() => {
                  setCustomer({
                    id: '',
                    nama: '',
                    alamat: '',
                    ponsel: '',
                  });
                }}>
                <MdClearAll />
                <span className='ml-1 text-xl'>ganti</span>
              </button>
            </React.Fragment>
          )}
        </div>
        <div className='flex justify-center items-center tgl mr-5'>
          <p className='mr-5'>Tanggal Pengerjaan : </p>
          <PickDate />
        </div>
      </div>

      <div className='content container mx-auto grid grid-cols-3 gap-5 mt-4'>
        <Table />
        <Summary />
      </div>
    </div>
  );
};

export default Transaction;
