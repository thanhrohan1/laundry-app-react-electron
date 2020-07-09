import React from 'react';
import Modal from 'react-modal';
import PrintToPaper from './PrintToPaper';
import PrintToTempel from './PrintToTempel';
import printJS from 'print-js';
import CurrencyFormat from 'react-currency-format';
import Swal from 'sweetalert2';
import { useStoreState, useStoreActions } from 'easy-peasy';
import moment from 'moment';

const SummaryPrint = () => {
  const { isOpenModalSummaryPrint } = useStoreState((state) => state.modal);
  const { setIsOpenModalSummaryPrint } = useStoreActions(
    (actions) => actions.modal
  );

  const {
    noFaktur,
    totalHarga,
    parfum,
    paket,
    tipeBayar,
    uangCustomer,
    sisaBayar,
    totalItem,
    customer,
    items,
    startDate,
    endDate,
  } = useStoreState((state) => ({
    noFaktur: state.transaction.noFaktur,
    totalHarga: state.transaction.totalHarga,
    parfum: state.transaction.parfum,
    paket: state.transaction.paket,
    tipeBayar: state.transaction.tipeBayar,
    uangCustomer: state.transaction.uangCustomer,
    sisaBayar: state.transaction.sisaBayar,
    totalItem: state.transaction.totalItem,
    customer: state.transaction.customer,
    items: state.transaction.items,
    startDate: state.transaction.startDate,
    endDate: state.transaction.endDate,
  }));

  const { resetTransaction } = useStoreActions(
    (actions) => actions.transaction
  );

  const { addTransaction } = useStoreActions((state) => state.transactions);

  const saveTransaction = async () => {
    await addTransaction({
      noFaktur,
      totalHarga,
      parfum,
      paket,
      tipeBayar,
      uangCustomer,
      sisaBayar,
      totalItem,
      customer,
      items,
      startDate,
      endDate,
    });
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Transaksi berhasil disimpan',
      showConfirmButton: false,
      timer: 1200,
    });
  };

  const handleHari = (date) => {
    const hari = date.weekday();
    switch (hari) {
      case 0:
        return 'Minggu';
      case 1:
        return 'Senin';
      case 2:
        return 'Selasa';
      case 3:
        return 'Rabu';
      case 4:
        return 'Kamis';
      case 5:
        return 'Jumat';
      case 6:
        return 'Sabtu';
      default:
        return 0;
    }
  };

  const handleShowDate = (date) => {
    const tgl = moment(date);
    const hari = handleHari(tgl);
    return `${hari}, ${tgl.format('DD/MM/YYYY')}`;
  };

  Modal.setAppElement('#app');
  return (
    <div>
      <div className='component-to-print hidden'>
        <PrintToTempel />
        <PrintToPaper onHandleShowDate={(value) => handleShowDate(value)} />
      </div>
      <Modal
        className='modalSummaryPrint'
        isOpen={isOpenModalSummaryPrint}
        onRequestClose={() => setIsOpenModalSummaryPrint(false)}>
        <h1>Review Transaksi</h1>
        <div className='content-print my-6'>
          <div className='detail-customer mb-4'>
            <h2 className='bg-gray-300 py-4 text-2xl font-bold px-6 rounded-t-lg'>
              Rincian Pelanggan
            </h2>
            <div className='content-customer flex rounded-b-lg'>
              <div className='bg-gray-100 py-4 px-6 flex-1'>
                <p className='block text-xl font-bold my-2'>Nama</p>
                <p className='text-2xl capitalize'>{customer.nama}</p>
              </div>
              <div className='bg-gray-100 py-4 px-6 flex-1'>
                <p className='block text-xl font-bold my-2'>Kontak</p>
                <p className='text-2xl'>{customer.ponsel}</p>
              </div>
            </div>
          </div>
          <div className='items mb-4 '>
            <h2 className='bg-gray-300 py-4 text-2xl font-bold px-6 rounded-t-lg'>
              Rincian Item
            </h2>
            <div className='content-items bg-gray-100 py-4 px-6 overflow-y-scroll rounded-b-lg'>
              {(items || []).map((item, index) => (
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
                <p>Paket</p>
                <p className='font-bold capitalize'>{paket}</p>
              </div>
              <div className='parfum flex justify-between items-center mb-4 text-2xl'>
                <p>Parfum</p>
                <p className='font-bold capitalize'>{parfum}</p>
              </div>
              <div className='selesai flex justify-between items-center mb-4 text-2xl'>
                <p>Waktu Selesai</p>
                <p className='font-bold'>{handleShowDate(endDate)}</p>
              </div>
              <div className='total flex justify-between items-center mb-4 '>
                <p>Grand Total</p>
                <CurrencyFormat
                  className='text-hijau font-bold text-3xl'
                  value={totalHarga}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
              </div>
              <div className='bayar flex justify-between items-center mb-4 '>
                <p>Bayar</p>
                <CurrencyFormat
                  className='text-biru font-bold text-3xl'
                  value={uangCustomer}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
              </div>
              <div className='sisa flex justify-between items-center '>
                <p>Sisa Bayar</p>
                <CurrencyFormat
                  className='text-biru font-bold text-3xl'
                  value={sisaBayar}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'Rp. '}
                />
              </div>
            </div>
          </div>
        </div>
        <div className='btn-summary flex justify-center items-center content-center w-full'>
          <button
            className='font-medium rounded-lg text-2xl bg-biru text-white w-1/2 py-4 mr-4'
            type='button'
            onClick={() => {
              saveTransaction();
            }}>
            Simpan
          </button>
          <button
            className='font-medium rounded-lg text-2xl text-white bg-hijau w-1/2 py-4 ml-4'
            type='button'
            onClick={() => {
              saveTransaction();
              setIsOpenModalSummaryPrint(false);
              resetTransaction();
              printJS({
                printable: 'printJS-form',
                type: 'html',
                maxWidth: '283px',
                targetStyles: ['*'],
              });
            }}>
            Print
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default SummaryPrint;
