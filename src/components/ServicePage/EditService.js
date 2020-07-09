import React, { useState } from 'react';
import Swal from 'sweetalert2';
import CurrencyFormat from 'react-currency-format';

import { useStoreState, useStoreActions } from 'easy-peasy';

const EditService = ({ service }) => {
  const [serviceId] = useState(service._id);
  const [nama, setNama] = useState(service.nama);
  const [satuan, setSatuan] = useState(service.satuan);
  const [harga, setHarga] = useState(service.harga);
  const [durasi, setDurasi] = useState(service.durasi);

  const { setEditDisplay, editService } = useStoreActions(
    (actions) => actions.services
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

  const handleEditService = async (e) => {
    e.preventDefault();
    const service = await {
      id: serviceId,
      nama,
      satuan,
      harga,
      durasi,
    };
    await editService(service);
    Swal.fire({
      icon: 'success',
      title: 'Saved!',
      text: 'Data layanan berhasil diubah',
      showConfirmButton: false,
      timer: 1200,
    });
    setEditDisplay(false);
  };

  const classNameInput =
    'text-2xl px-6 py-4 appearance-none inline-block bg-gray-300 border border-gray-300 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-700 mr-4';

  return (
    <div className='mx-auto mb-4'>
      <form onSubmit={handleEditService} className=''>
        <div className='flex justify-between items-center mb-4'>
          <input
            className={`${classNameInput} w-1/2`}
            type='text'
            value={nama}
            onChange={(e) => setNama(capitalize(e.target.value))}
            required
          />

          <div className='radio-edit-service w-1/2 flex text-2xl text-black font-bold px-2 bg-white border border-gray-300 rounded-lg leading-tight py-4'>
            <div className='pcs px-6'>
              <input
                className='mr-2'
                type='radio'
                id='pcs'
                name='satuan'
                value='Pcs'
                onChange={handleRadio}
                checked={satuan === 'Pcs'}
                required
              />
              <label htmlFor='pcs'>Pcs / Satuan</label>
            </div>
            <div className='kg px-6 '>
              <input
                className='mr-2'
                type='radio'
                id='kg'
                name='satuan'
                value='Kg'
                onChange={handleRadio}
                checked={satuan === 'Kg'}
              />
              <label htmlFor='kg'>Kilogram</label>
            </div>
            <div className='psg px-6'>
              <input
                className='mr-2'
                type='radio'
                id='psg'
                name='satuan'
                value='Psg'
                onChange={handleRadio}
                checked={satuan === 'Psg'}
              />
              <label htmlFor='psg'>Pasang</label>
            </div>
          </div>
        </div>
        <div className='flex justify-between items-center'>
          <CurrencyFormat
            className={`${classNameInput} w-1/3`}
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
          <input
            className={`${classNameInput} w-1/3`}
            type='number'
            value={durasi}
            onChange={(e) => {
              e.persist();
              setDurasi(e.target.value);
            }}
            required
          />
          <button
            className='font-medium rounded-lg text-2xl text-white bg-hijau py-3 w-1/3'
            type='submit'>
            Simpan
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditService;
