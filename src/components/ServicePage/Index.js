import React, { useState, useEffect } from 'react';
import { MdAddCircle, MdDelete, MdEdit } from 'react-icons/md';
import CurrencyFormat from 'react-currency-format';
import AddService from './AddService';
import EditService from './EditService';
import Swal from 'sweetalert2';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Service = () => {
  const [serviceToEdit, setServiceToEdit] = useState({});

  const { services, editDisplay } = useStoreState((state) => state.services);
  const { removeService, setEditDisplay } = useStoreActions(
    (actions) => actions.services
  );

  // Modal Setting
  const { isOpenModalAddService } = useStoreState((state) => state.modal);
  const { setIsOpenModalAddService } = useStoreActions(
    (actions) => actions.modal
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Yakin ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Hapus',
    }).then((success) => {
      if (success.isConfirmed) {
        removeService(id);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', setEditDisplay(false));
  }, []);

  return (
    <div className='transaksi service relative container mx-auto'>
      <div className='head-service text-center text-biru font-bold text-4xl mb-10'>
        Layanan Laundry
      </div>
      <div className='w-7/12 mx-auto'>
        {editDisplay && <EditService service={serviceToEdit} />}
      </div>
      <div className='content-service bg-biru rounded-app w-8/12 mx-auto pt-8'>
        <button
          onClick={() => setIsOpenModalAddService(true)}
          className='add-item flex bg-white hover:opacity-75 text-biru font-semibold py-2 px-10 rounded-full ml-10 mb-10'>
          <p>Tambah Layanan</p>
          <span className='text-4xl ml-5'>
            <MdAddCircle />
          </span>
        </button>
        {isOpenModalAddService && <AddService />}
        <div className='tableService table-transaksi mx-10 mb-10'>
          <table className='text-left w-full'>
            <thead className='flex text-white w-full pr-4 mb-6'>
              <tr className='flex w-full items-center text-center mb-4'>
                <th className='w-1/12'>No.</th>
                <th className='w-4/12 text-left pl-16'>Nama Layanan</th>
                <th className='w-2/12'>Satuan</th>
                <th className='w-2/12'>Harga</th>
                <th className='w-2/12'>Durasi</th>
                <th className='w-2/12'>Edit</th>
                <th className='w-2/12'>Hapus</th>
              </tr>
            </thead>
            <tbody className='flex flex-col text-white w-full overflow-y-scroll'>
              {(services || []).map((service, index) => (
                <tr
                  key={index}
                  className='flex w-full items-center text-center mb-4'>
                  <td className='w-1/12'>{index + 1}</td>
                  <td className='w-4/12 text-left pl-16'>{service.nama}</td>
                  <td className='w-2/12'>{service.satuan}</td>
                  <td className='w-2/12'>
                    <CurrencyFormat
                      value={service.harga}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp. '}
                    />
                  </td>
                  <td className='w-2/12'>{service.durasi} hari</td>
                  <td className='w-2/12'>
                    <button
                      onClick={() => {
                        setEditDisplay(true);
                        setServiceToEdit(service);
                      }}
                      className='btn-hapus pt-4 text-4xl hover:opacity-75'
                      disabled={editDisplay}>
                      <MdEdit className='block mx-auto' />
                    </button>
                  </td>
                  <td className='w-2/12'>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className='btn-hapus pt-4 text-4xl hover:opacity-75'
                      disabled={editDisplay}>
                      <MdDelete className='block mx-auto' />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Service;
