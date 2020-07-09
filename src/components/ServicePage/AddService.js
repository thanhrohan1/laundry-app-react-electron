import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import CurrencyFormat from 'react-currency-format';

import { useStoreState, useStoreActions } from 'easy-peasy';

const AddService = () => {
  // State & Action
  const [nama, setNama] = useState('');
  const [satuan, setSatuan] = useState('');
  const [harga, setHarga] = useState('');
  const [durasi, setDurasi] = useState('');

  const { services } = useStoreState((state) => state.services);
  const { addService } = useStoreActions((actions) => actions.services);

  // Modal Setting
  const { isOpenModalAddService } = useStoreState((state) => state.modal);
  const { setIsOpenModalAddService } = useStoreActions(
    (actions) => actions.modal
  );

  const capitalize = (str, lower = false) => {
    return (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match) => match.toUpperCase()
    );
  };

  const handleRadio = (e) => {
    setSatuan(e.target.value);
  };

  Modal.setAppElement('#app');
  return (
    <Modal
      className='modal modalAddCustomer'
      isOpen={isOpenModalAddService}
      onRequestClose={() => setIsOpenModalAddService(false)}>
      <h1 className='text-4xl font-medium text-left bg-gray-300 py-10 px-10 rounded-t-lg'>
        Tambah Layanan
      </h1>
      <form
        className='flex flex-col w-full p-10 bg-gray-200 rounded-b-lg'
        onSubmit={(e) => {
          e.preventDefault();
          addService({
            id: `${services.length + 1}`,
            nama,
            satuan,
            harga,
            durasi,
          });
          setIsOpenModalAddService(false);
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Data customer berhasil disimpan',
            showConfirmButton: false,
            timer: 1200,
          });
        }}>
        <div className='input-row'>
          <label className='mb-2 block'>Nama Layanan</label>
          <input
            className='text-3xl px-8 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-4'
            type='text'
            value={nama}
            onChange={(e) => setNama(capitalize(e.target.value))}
            placeholder='Cuci sepatu'
            required={true}
          />
          {/* <Error touched={touched.email} message={errors.email} /> */}
        </div>

        <div className='input-row'>
          <label className='mb-2 block'>Pilih Satuan</label>
          <div className='text-2xl text-black font-bold px-2 block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight mb-4'>
            <div className='pcs mb-2 rounded-full px-6 py-2'>
              <input
                className='mr-2'
                type='radio'
                id='pcs'
                name='satuan'
                value='Pcs'
                onChange={handleRadio}
                required
              />
              <label htmlFor='pcs'>Pcs / Satuan</label>
            </div>
            <div className='kg mb-2 rounded-full px-6 py-2'>
              <input
                className='mr-2'
                type='radio'
                id='kg'
                name='satuan'
                value='Kg'
                onChange={handleRadio}
              />
              <label htmlFor='kg'>Kilogram</label>
            </div>
            <div className='psg mb-2 rounded-full px-6 py-2'>
              <input
                className='mr-2'
                type='radio'
                id='psg'
                name='satuan'
                value='Psg'
                onChange={handleRadio}
              />
              <label htmlFor='psg'>Pasang</label>
            </div>
          </div>
          {/* <Error touched={touched.email} message={errors.email} /> */}
        </div>

        <div className='input-row'>
          <label className='mb-2 block'>Harga {satuan && `/ ${satuan}`}</label>
          <CurrencyFormat
            className='text-3xl px-8 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-4'
            value={harga}
            thousandSeparator={true}
            prefix={'Rp. '}
            placeholder='Rp. 0'
            onFocus={(e) => (e.target.value === 'Rp. 0' ? setHarga('') : null)}
            onBlur={(e) => {
              e.target.value === '' ? setHarga(0) : null;
            }}
            onValueChange={({ value }) => {
              setHarga(value);
            }}
          />
          {/* <Error touched={touched.email} message={errors.email} /> */}
        </div>

        <div className='input-row '>
          <label className='mb-2 block'>Lama Pengerjaan</label>
          <div className='durasi flex items-center justify-between w-4/12'>
            <input
              className='text-3xl px-8 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-4'
              type='number'
              value={durasi}
              onChange={(e) => setDurasi(e.target.value)}
              placeholder='4'
              required={true}
            />
            <input
              className='text-3xl px-4 appearance-none block w-full  py-6 bg-gray-200  leading-tight mb-4 font-bold w-1/3 py-6'
              type='text'
              value='Hari'
              readOnly
            />
            {/* <Error touched={touched.email} message={errors.email} /> */}
          </div>
        </div>
        <button
          type='submit'
          className='font-medium rounded-lg text-3xl text-white bg-hijau py-2'>
          Simpan Data
        </button>
      </form>
    </Modal>
  );
};

export default AddService;
