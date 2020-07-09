import React from 'react';
import Modal from 'react-modal';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';

const ModalDetails = ({ transaction, isModalOpen, setIsModalOpen }) => {
  const handleShowMoney = (money, className) => {
    return (
      <CurrencyFormat
        className={className}
        value={money}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'Rp. '}
      />
    );
  };

  Modal.setAppElement('#app');
  return (
    <React.Fragment>
      <Modal
        className='modalSummaryPrint'
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen()}>
        <h1>Detail Transaksi</h1>
        <div className='content-print my-6'>
          <div className='detail-customer mb-4'>
            <h2 className='bg-gray-300 py-4 text-2xl font-bold px-6 rounded-t-lg'>
              Rincian Pelanggan
            </h2>
            <div className='content-customer flex rounded-b-lg'>
              <div className='bg-gray-100 py-4 px-6 flex-1'>
                <p className='block text-xl font-bold my-2'>Nama</p>
                <p className='text-2xl capitalize'>
                  {transaction.customer.nama}
                </p>
              </div>
              <div className='bg-gray-100 py-4 px-6 flex-1'>
                <p className='block text-xl font-bold my-2'>Kontak</p>
                <p className='text-2xl'>{transaction.customer.ponsel}</p>
              </div>
            </div>
          </div>
          <div className='items mb-4 '>
            <h2 className='bg-gray-300 py-4 text-2xl font-bold px-6 rounded-t-lg'>
              Rincian Item
            </h2>
            <div className='content-items bg-gray-100 py-4 px-6 overflow-y-scroll rounded-b-lg'>
              {(transaction.items || []).map((item, index) => (
                <div
                  key={index}
                  className='item flex justify-between items-center mb-4 text-2xl font-bold'>
                  <div className='nama-item flex-1'>
                    <p>{item.nama}</p>
                    <p className='text-xl font-medium'>{item.keterangan}</p>
                  </div>
                  <p className='text-xl font-medium flex-1 text-right'>
                    {item.harga} x {item.qty} {item.satuan}
                  </p>
                  <CurrencyFormat
                    className='flex-1 text-right'
                    value={item.total}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'Rp. '}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className='summary'>
            <h2 className='bg-gray-300 py-4 text-2xl font-bold px-6 rounded-t-lg'>
              Rincian Transaksi
            </h2>
            <div className='content-summary bg-gray-100 py-4 px-6 rounded-b-lg'>
              <div className='parfum flex justify-between items-center mb-4 text-2xl'>
                <p>Parfum</p>
                <p className='font-bold capitalize'>{transaction.parfum}</p>
              </div>
              <div className='selesai flex justify-between items-center mb-4 text-2xl'>
                <p>Waktu Selesai</p>
                <p className='font-bold'>
                  {moment(transaction.endDate).format('DD/MM/YYYY')}
                </p>
              </div>
              <div className='total flex justify-between items-center mb-4 '>
                <p>Grand Total</p>
                {handleShowMoney(
                  transaction.totalHarga,
                  'text-hijau font-bold text-3xl'
                )}
              </div>
              <div className='bayar flex justify-between items-center mb-4 '>
                <p>Uang Muka</p>
                {handleShowMoney(
                  transaction.uangCustomer,
                  'text-biru font-bold text-3xl'
                )}
              </div>
              <div className='sisa flex justify-between items-center '>
                <p>Sisa Bayar</p>
                {handleShowMoney(
                  transaction.sisaBayar,
                  'text-biru font-bold text-3xl'
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='btn-summary flex justify-center items-center content-center w-full'>
          <button
            className='font-bold rounded-lg text-2xl bg-biru text-white w-full py-4'
            type='button'
            onClick={() => setIsModalOpen()}>
            Tutup
          </button>
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default ModalDetails;
