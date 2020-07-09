import React, { useState } from 'react';
import Swal from 'sweetalert2';

import { useStoreActions } from 'easy-peasy';

const UpdateCustomer = ({ customer }) => {
  const [customerId] = useState(customer._id);
  const [nama, setNama] = useState(customer.nama);
  const [alamat, setAlamat] = useState(customer.alamat);
  const [ponsel, setPonsel] = useState(customer.ponsel);

  const { setEditDisplay, editCustomer } = useStoreActions(
    (actions) => actions.customers
  );

  const capitalize = (str, lower = false) => {
    return (lower ? str.toLowerCase() : str).replace(
      /(?:^|\s|["'([{])+\S/g,
      (match) => match.toUpperCase()
    );
  };

  const handleEditCustomer = async (e) => {
    e.preventDefault();
    const customer = await {
      id: customerId,
      nama,
      alamat,
      ponsel,
    };
    await editCustomer(customer);
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Data customer berhasil diubah',
      showConfirmButton: false,
      timer: 1200,
    });
    setEditDisplay(false);
  };

  return (
    <div className='w-2/3 mx-auto mb-4'>
      <form
        onSubmit={handleEditCustomer}
        className='flex justify-between items-center'>
        <input
          className='text-2xl px-6 py-4 appearance-none inline-block w-4/12 bg-gray-300 border border-gray-300 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mr-4'
          type='text'
          value={nama}
          onChange={(e) => setNama(capitalize(e.target.value))}
          required
        />
        <input
          className='text-2xl px-6 py-4 appearance-none inline-block w-4/12 bg-gray-300 border border-gray-300 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mr-4'
          type='text'
          value={alamat}
          onChange={(e) => setAlamat(e.target.value)}
          required
        />
        <input
          className='text-2xl px-6 py-4 appearance-none inline-block w-4/12 bg-gray-300 border border-gray-300 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mr-4'
          type='text'
          value={ponsel}
          onChange={(e) => {
            e.persist();
            setPonsel(e.target.value);
          }}
          required
        />
        <button
          className='font-medium rounded-lg text-2xl text-white bg-hijau py-3 w-2/12'
          type='submit'>
          Simpan
        </button>
      </form>
    </div>
  );
};

export default UpdateCustomer;
