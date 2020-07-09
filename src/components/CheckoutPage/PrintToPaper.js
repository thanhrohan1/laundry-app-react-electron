import React from 'react';
import moment from 'moment';
import CurrencyFormat from 'react-currency-format';

// const Logo = '../images/logo.png';

const PrintToPaper = ({ transaction }) => {
  return (
    <form action='' id='printJS-form' className='print-to-paper'>
      <div className='text-center mb-2'>
        {/* <img className='mx-auto' src={Logo} /> */}
        <h3 className='text-3xl'>Campus Laundry</h3>
        <h4 className='text-xl'>Perumahan ona raya paling depan</h4>
        <p className='text-xl'>Telp. 0852 2222 3333</p>
      </div>
      <h2 className='text-4xl text-center my-6'>LUNAS</h2>
      <h2 className='text-2xl text-center'>BUKTI PEMBAYARAN</h2>
      <hr></hr>
      <div className='info flex flex-col p-4'>
        <div className='flex justify-between text-xl'>
          <p>No. Faktur</p>
          <p>{transaction.noFaktur}</p>
        </div>
        <div className='flex justify-between text-xl'>
          <p>Tanggal</p>
          <p>{moment().format('DD/MM/YYYY')}</p>
        </div>
        <div className='flex justify-between text-xl'>
          <p>Nama</p>
          <p className='capitalize'>{transaction.customer.nama}</p>
        </div>
        <div className='flex justify-between text-xl'>
          <p>Telp.</p>
          <p>{transaction.customer.ponsel}</p>
        </div>
      </div>
      <hr></hr>
      <div className='flex text-2xl judul-items justify-between px-4'>
        <p className='flex-1'>ITEMS</p>
        <p className='flex-1 text-center'>HARGA</p>
        <p className='flex-1 text-right'>TOTAL</p>
      </div>
      <hr></hr>
      <div className='items text-lg px-4 pt-2 pb-2'>
        {(transaction.items || []).map((item, index) => (
          <React.Fragment key={index}>
            <div className='item flex justify-between items-center mb-2 mt-2'>
              <div className='w-4/12'>
                <p>{item.nama}</p>
                <p className='text-sm'>{item.keterangan}</p>
              </div>
              <p className='w-4/12 text-center'>
                {item.harga} x {item.qty} {item.satuan}
              </p>
              <CurrencyFormat
                className='w-4/12 text-right'
                value={item.total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'Rp. '}
              />
            </div>
            {index !== transaction.items.length - 1 && (
              <hr className='dashed-hr'></hr>
            )}
          </React.Fragment>
        ))}
      </div>
      <hr></hr>
      <div className='w-full p-4 flex justify-between'>
        <p className='w-4/12 text-2xl'>{transaction.totalItem} Items</p>
        <div className='summary text-2xl'>
          <div className='flex'>
            <p className='mr-2'>Grand Total :</p>
            <CurrencyFormat
              value={transaction.totalHarga}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PrintToPaper;
