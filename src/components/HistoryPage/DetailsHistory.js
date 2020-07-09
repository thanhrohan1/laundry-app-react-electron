import React from 'react';
import CurrencyFormat from 'react-currency-format';

const DetailsHistory = ({ transaction }) => {
  return (
    <React.Fragment>
      <tr className='flex w-full pl-20 text-biru capitalize mb-4'>
        <td className='flex mr-4 bg-white py-2 px-6 rounded-lg'>
          <label htmlFor='parfum' className='block pr-2'>
            Parfum
          </label>
          <p>: {transaction.parfum}</p>
        </td>
        <td className='flex mr-4 bg-white py-2 px-6 rounded-lg'>
          <label htmlFor='paket' className='block pr-2'>
            Paket
          </label>
          <p>: {transaction.paket}</p>
        </td>
        <td className='flex mr-4 bg-white py-2 px-6 rounded-lg'>
          <label htmlFor='totalItem' className='block pr-2'>
            Total Item
          </label>
          <p>: {transaction.totalItem}</p>
        </td>
        <td className='flex mr-4 bg-white py-2 px-6 rounded-lg'>
          <label htmlFor='totalItem' className='block pr-2'>
            Kontak
          </label>
          <p>: {transaction.customer.ponsel}</p>
        </td>
      </tr>
      <tr className='flex flex-col text-biru ml-20 w-2/3 bg-white rounded-lg px-10 mb-4'>
        <td className='flex justify-between py-2 px-6 text-center my-2 border-b'>
          <label htmlFor='totalItem' className='block flex-1 text-left ml-8'>
            Nama
          </label>
          <label htmlFor='totalItem' className='block flex-1'>
            Harga
          </label>
          <label htmlFor='totalItem' className='block flex-1'>
            Total
          </label>
        </td>
        {(transaction.items || []).map((item, index) => (
          <React.Fragment key={index}>
            <td className='flex justify-between py-2 px-6 mt-2 mb-4'>
              <div className='flex-1 ml-8'>
                <p>{item.nama}</p>
                <p className='text-xl font-medium'>{item.keterangan}</p>
              </div>
              <div className='flex-1 text-center'>
                <p>
                  <CurrencyFormat
                    value={item.harga}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                  x {item.qty} {item.satuan}
                </p>
              </div>
              <div className='flex-1 text-center'>
                <CurrencyFormat
                  value={item.total}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
              </div>
            </td>
          </React.Fragment>
        ))}
      </tr>
    </React.Fragment>
  );
};

export default DetailsHistory;
