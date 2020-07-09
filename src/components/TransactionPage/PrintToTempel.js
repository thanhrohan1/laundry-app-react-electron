import React from 'react';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import { useStoreState } from 'easy-peasy';

const PrintToTempel = () => {
  const {
    id,
    startDate,
    totalHarga,
    parfum,
    paket,
    uangCustomer,
    totalItem,
    items,
    customer,
    endDate,
    sisaBayar,
  } = useStoreState((state) => state.transaction);

  return (
    <form action='' id='printJS-form-Tempel' className='print-to-paper'>
      <div className='tempel-laundry mt-16 '>
        <hr className='dashed-hr'></hr>
        <p className='text-center text-xl'>Potong bagian ini</p>
        <div className='judul text-center mt-10 text-xl'>
          <h3 className='text-3xl'>Campus Laundry</h3>
          <h4 className='text-xl'>Perumahan ona raya paling depan</h4>
          <h2 className='text-4xl mt-6 uppercase'>{customer.nama}</h2>
          <p className='text-xl mb-6 uppercase'>{customer.ponsel}</p>
          <p className='uppercase'>Faktur : {id}</p>
          <p className='uppercase'>
            Tgl Masuk : {moment(startDate).format('DD/MM/YYYY')}
          </p>
          <p className='uppercase'>
            Tgl Diambil : {moment(endDate).format('DD/MM/YYYY')}
          </p>
          <p className='text-2xl mt-4'>ITEMS</p>
        </div>
        <hr />
        <div className='items text-lg px-4 pt-2 pb-2'>
          {(items || []).length !== 0 &&
            items.map((item, index) => (
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
                {index !== items.length - 1 && <hr className='dashed-hr'></hr>}
              </React.Fragment>
            ))}
        </div>
        <hr />
        <div className='bawah pl-4 mt-4 tex-center text-xl w-3/5 uppercase'>
          <div className='flex '>
            <p className='pr-4'>Parfum : </p>
            <p>{parfum}</p>
          </div>
          <div className='flex '>
            <p className='pr-4'>Paket : </p>
            <p>{paket}</p>
          </div>
          <div className='flex '>
            <p className='pr-4'>Total Item :</p>
            <p>{totalItem}</p>
          </div>
          <div className='flex '>
            <p className='pr-4'>Grand Total :</p>
            <CurrencyFormat
              value={totalHarga}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
            />
          </div>
          <div className='flex '>
            <p className='pr-4'>Bayar :</p>
            <CurrencyFormat
              value={uangCustomer}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'Rp. '}
            />
          </div>
          <div className='flex '>
            <p className='pr-4'>Sisa Bayar :</p>
            <CurrencyFormat
              value={sisaBayar}
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

export default PrintToTempel;
