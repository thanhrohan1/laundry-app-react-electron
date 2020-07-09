import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';

import { useStoreState, useStoreActions } from 'easy-peasy';

const AddCustomer = () => {
  // State & Action
  const [nama, setNama] = useState('');
  const [alamat, setAlamat] = useState('');
  const [ponsel, setPonsel] = useState('');

  const { customers } = useStoreState((state) => state.customers);
  const { addCustomer } = useStoreActions((actions) => actions.customers);

  // Modal Setting
  const { isOpenModalAddCustomer } = useStoreState((state) => state.modal);
  const { setIsOpenModalAddCustomer } = useStoreActions(
    (actions) => actions.modal
  );

  const capitalize = (str, lower = false) => {
    return (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match) => match.toUpperCase()
    );
  };

  Modal.setAppElement('#app');
  return (
    <Modal
      className='modal modalAddCustomer'
      isOpen={isOpenModalAddCustomer}
      onRequestClose={() => setIsOpenModalAddCustomer(false)}>
      <h1 className='text-4xl font-medium text-left bg-gray-300 py-10 px-10 rounded-t-lg'>
        Tambah Pelanggan
      </h1>
      <form
        className='flex flex-col w-full p-10 bg-gray-200 rounded-b-lg'
        onSubmit={(e) => {
          e.preventDefault();
          addCustomer({
            id: `${customers.length + 1}`,
            nama,
            alamat,
            ponsel,
          });
          setIsOpenModalAddCustomer(false);
          Swal.fire({
            icon: 'success',
            title: 'Saved!',
            text: 'Data customer berhasil disimpan',
            showConfirmButton: false,
            timer: 1200,
          });
        }}>
        <div className='input-row'>
          <label className='mb-2 block'>Nama</label>
          <input
            className='text-3xl px-10 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-4'
            type='text'
            value={nama}
            onChange={(e) => setNama(capitalize(e.target.value))}
            placeholder='Ahmad Mujafar'
            required={true}
          />
          {/* <Error touched={touched.email} message={errors.email} /> */}
        </div>
        <div className='input-row'>
          <label className='mb-2 block'>Alamat</label>
          <input
            className='text-3xl px-10 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-4'
            type='text'
            value={alamat}
            onChange={(e) => setAlamat(capitalize(e.target.value))}
            placeholder='Perumahan ona raya'
            required={true}
          />
          {/* <Error touched={touched.email} message={errors.email} /> */}
        </div>
        <div className='input-row'>
          <label className='mb-2 block'>Kontak</label>
          <input
            className='text-3xl px-10 appearance-none block w-full bg-white border border-gray-300 rounded-lg py-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mb-8'
            type='text'
            value={ponsel}
            onChange={(e) => setPonsel(e.target.value)}
            placeholder='0856xxxxx'
            required={true}
          />
          {/* <Error touched={touched.email} message={errors.email} /> */}
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

export default AddCustomer;
