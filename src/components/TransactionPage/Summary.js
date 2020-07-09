import React, { useState, useEffect } from 'react';
import PickTime from './PickTime';
import SummaryPrint from './SummaryPrint';
import CurrencyFormat from 'react-currency-format';
import { FaChevronCircleRight } from 'react-icons/fa';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Summary = () => {
  const [kembalian, setKembalian] = useState(0);

  const { isOpenModalSummaryPrint } = useStoreState((state) => state.modal);
  const { setIsOpenModalSummaryPrint } = useStoreActions(
    (actions) => actions.modal
  );

  const {
    totalHarga,
    parfum,
    paket,
    tipeBayar,
    uangCustomer,
    totalItem,
    items,
  } = useStoreState((state) => state.transaction);

  const {
    setParfum,
    setPaket,
    setUangCustomer,
    setTipeBayar,
    setSisaBayar,
  } = useStoreActions((actions) => ({
    setParfum: actions.transaction.setParfum,
    setPaket: actions.transaction.setPaket,
    setUangCustomer: actions.transaction.setUangCustomer,
    setTipeBayar: actions.transaction.setTipeBayar,
    setSisaBayar: actions.transaction.setSisaBayar,
  }));

  useEffect(() => {
    if (totalHarga > 0) {
      if (uangCustomer >= totalHarga) {
        setKembalian(uangCustomer - totalHarga);
        setTipeBayar('lunas');
        setSisaBayar(0);
      } else {
        setTipeBayar('dp');
        setKembalian(0);
        setSisaBayar(totalHarga - uangCustomer);
      }
    } else {
      setTipeBayar('dp');
      setUangCustomer(0);
      setKembalian(0);
      setSisaBayar(totalHarga);
    }
  }, [uangCustomer, totalHarga]);

  const tampilKembalian = (
    <div className='kembalian text-white mb-4'>
      <h3 className=''>Kembalian</h3>
      <CurrencyFormat
        className='font-medium text-4xl rounded-lg px-6 py-1 w-4/5'
        value={kembalian}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp. '}
      />
    </div>
  );

  return (
    <div className='flex flex-col trans-content transaksi-kanan col-span-1 bg-biru rounded-app'>
      <div className='angka-total flex flex-col total-harga mx-8 text-center text-white mt-8 pb-3 mb-8'>
        <h3 className='text-4xl'>Total Harga</h3>
        <p className='text-5xl'>
          <CurrencyFormat
            value={totalHarga}
            displayType={'text'}
            thousandSeparator={true}
            prefix={'Rp. '}
          />
        </p>
      </div>
      <div className='detil-bayar flex flex-col mx-8 text-white '>
        <p className='total-item mb-8'>Total Items : {totalItem} </p>
        {/* <div className='tgl-selesai flex justify-between items-center mb-8 text-biru'>
          <p className='text-white'>Jam Pengambilan</p>
          <div className='time-picker w-48'>
            <PickTime />
          </div>
        </div> */}
        <div className='parfum flex justify-between items-center mb-8'>
          <p>Parfum</p>
          <select
            name='tipe-bayar'
            id='tipe-bayar'
            className='font-semibold rounded-lg text-biru px-6 py-3 w-auto'
            value={parfum}
            onChange={setParfum}>
            <option value='random'>Random</option>
            <option value='downy'>Downy Blue</option>
            <option value='buble'>Bublegum</option>
          </select>
        </div>
        <div className='tgl-selesai flex justify-between items-center mb-4'>
          <p>Paket</p>
          <select
            name='tipe-bayar'
            id='tipe-bayar'
            className='font-semibold rounded-lg text-biru px-6 py-3 w-auto'
            value={paket}
            onChange={setPaket}>
            <option value='Sesuai Item'>Sesuai Item</option>
            {/* <option value='regular'>Regular (3 hr)</option>
            <option value='express'>Express (1 hr)</option> */}
            <option value='Kilat'>Kilat (6 jam)</option>
          </select>
        </div>
        <div className='flex justify-between items-center'>
          <div className='tgl-selesai mb-2 mt-3 text-left'>
            <p>Berapa Uangnya ?</p>
            <div className='input-uang'>
              <CurrencyFormat
                className='font-medium rounded-lg text-3xl text-biru font-semibold px-6 py-1 w-4/5'
                value={uangCustomer}
                thousandSeparator={true}
                prefix={'Rp. '}
                placeholder='Rp. 0'
                onFocus={(e) =>
                  e.target.value === 'Rp. 0' ? setUangCustomer('') : null
                }
                onBlur={(e) => {
                  e.target.value === '' ? setUangCustomer(0) : null;
                }}
                onValueChange={({ formattedValue, value }) => {
                  // formattedValue = $2,223
                  // value ie, 2223
                  setUangCustomer(value);
                }}
              />
            </div>
          </div>
          <div className='tgl-selesai mb-2 mt-3 text-left '>
            <p className='mb-1'>Tipe Bayar</p>
            <select
              disabled={true}
              name='tipe-bayar'
              id='tipe-bayar'
              className='font-semibold rounded-lg text-biru px-6 py-3 w-40'
              value={tipeBayar}>
              <option value='dp'>DP</option>
              <option value='lunas'>Lunas</option>
            </select>
          </div>
        </div>

        {tipeBayar === 'lunas' ? (
          tampilKembalian
        ) : (
          <div className='mb-12'></div>
        )}

        <div className='lanjutkan flex flex-col items-center'>
          <button
            disabled={(items || []).length === 0 ? true : false}
            onClick={() => setIsOpenModalSummaryPrint(true)}
            className='add-item flex justify-center items-center bg-hijau text-white font-semibold py-2 px-10 rounded-full w-1/2'>
            <p>Lanjutkan</p>
            <span className='text-3xl ml-5'>
              <FaChevronCircleRight />
            </span>
          </button>
          {isOpenModalSummaryPrint && <SummaryPrint />}
        </div>
      </div>
    </div>
  );
};

export default Summary;
