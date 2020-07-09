import React, { useState, useEffect, useMemo } from 'react';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import HistoryTransaction from './HistoryTransaction';
import Swal from 'sweetalert2';
import { MdAddCircle, MdDelete, MdEdit, MdHistory } from 'react-icons/md';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Customers = () => {
  const [customerToEdit, setCustomerToEdit] = useState({});
  const [customerHistory, setCustomerHistory] = useState({});

  const { customers, editDisplay } = useStoreState((state) => state.customers);
  const { removeCustomer, setEditDisplay } = useStoreActions(
    (actions) => actions.customers
  );

  const { isOpenModalAddCustomer, isOpenModalHistory } = useStoreState(
    (state) => state.modal
  );
  const { setIsOpenModalAddCustomer, setIsOpenModalHistory } = useStoreActions(
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
        removeCustomer(id);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('mousedown', setEditDisplay(false));
  }, []);

  return (
    <div className='customer relative container mx-auto'>
      <div className='head-customer text-center text-biru font-bold text-4xl mb-10'>
        Data Customers
      </div>
      {editDisplay && <EditCustomer customer={customerToEdit} />}
      <div className='content-customer-table bg-biru rounded-app w-2/3 mx-auto pt-8'>
        <button
          onClick={() => setIsOpenModalAddCustomer(true)}
          className='add-item flex bg-white hover:opacity-75 text-biru font-semibold py-2 px-10 rounded-full ml-10 mb-10'>
          <p>Tambah Customer</p>
          <span className='text-4xl ml-5'>
            <MdAddCircle />
          </span>
        </button>
        {isOpenModalAddCustomer && <AddCustomer />}
        {isOpenModalHistory && (
          <HistoryTransaction customer={customerHistory} />
        )}
        <div className='tableCustomer table-transaksi mx-10 mb-10'>
          <table className='text-left w-full'>
            <thead className='flex text-white w-full pr-4 mb-6'>
              <tr className='flex w-full items-center text-center mb-4'>
                <th className='w-1/12'>No.</th>
                <th className='w-3/12 text-left pl-12'>Nama Customer</th>
                <th className='w-3/12'>Alamat</th>
                <th className='w-2/12'>Kontak</th>
                <th className='w-1/12'>History</th>
                <th className='w-1/12'>Edit</th>
                <th className='w-1/12'>Hapus</th>
              </tr>
            </thead>
            <tbody className='flex flex-col text-white w-full overflow-y-scroll'>
              {(customers || []).map((customer, index) => (
                <tr
                  key={index}
                  className='flex w-full items-center text-center mb-4'>
                  <td className='w-1/12'>{index + 1}</td>
                  <td className='w-3/12 text-left pl-12'>{customer.nama}</td>
                  <td className='w-3/12'>{customer.alamat}</td>
                  <td className='w-2/12'>{customer.ponsel}</td>
                  <td className='w-1/12'>
                    <button
                      onClick={() => {
                        setIsOpenModalHistory(true);
                        setCustomerHistory(customer);
                      }}
                      className='btn-hapus pt-4 text-4xl hover:opacity-75'
                      disabled={editDisplay}>
                      <MdHistory className='block mx-auto' />
                    </button>
                  </td>
                  <td className='w-1/12'>
                    <button
                      onClick={() => {
                        setEditDisplay(true);
                        setCustomerToEdit(customer);
                      }}
                      className='btn-hapus pt-4 text-4xl hover:opacity-75'
                      disabled={editDisplay}>
                      <MdEdit className='block mx-auto' />
                    </button>
                  </td>
                  <td className='w-1/12'>
                    <button
                      onClick={() => handleDelete(customer._id)}
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

export default Customers;
