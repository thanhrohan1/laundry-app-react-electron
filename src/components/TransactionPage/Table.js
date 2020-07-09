import React, { useEffect } from 'react';
import { MdAddCircle, MdDelete } from 'react-icons/md';
import CurrencyFormat from 'react-currency-format';
import AddItem from './AddItem';
import Swal from 'sweetalert2';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Table = () => {
  const { isOpenModalAddItemTransaction } = useStoreState(
    (state) => state.modal
  );
  const { setIsOpenModalAddItemTransaction } = useStoreActions((actions) => ({
    setIsOpenModalAddItemTransaction:
      actions.modal.setIsOpenModalAddItemTransaction,
  }));

  const { items, namaCustomer } = useStoreState((state) => ({
    items: state.transaction.items,
    namaCustomer: state.transaction.customer.nama,
  }));

  const { removeItemTransaction, updateQty, setKeterangan } = useStoreActions(
    (actions) => ({
      removeItemTransaction: actions.transaction.removeItemTransaction,
      updateQty: actions.transaction.updateQty,
      setKeterangan: actions.transaction.setKeterangan,
    })
  );

  const changeQty = (item, e) => {
    e.persist();
    updateQty({ item, e });
  };

  const { setTotalHarga, setTotalItem } = useStoreActions((actions) => ({
    setTotalHarga: actions.transaction.setTotalHarga,
    setTotalItem: actions.transaction.setTotalItem,
  }));

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
        removeItemTransaction(id);
      }
    });
  };

  useEffect(() => {
    const newTotalHarga = items.reduce((sum, { total }) => sum + total, 0);
    const newTotalItem = items.reduce((sum, { qty }) => sum + qty, 0);
    setTotalHarga(newTotalHarga);
    setTotalItem(newTotalItem);
  }, [items]);

  return (
    <div className='trans-content transaksi-kiri col-span-2 bg-biru rounded-app'>
      <button
        disabled={namaCustomer === '' ? true : false}
        onClick={() => setIsOpenModalAddItemTransaction(true)}
        className='add-item flex justify-between items-center bg-white hover:opacity-75 text-biru font-semibold py-2 px-10 rounded-full ml-10 my-10'>
        <p>Tambah Item</p>
        <span className='text-4xl ml-5'>
          <MdAddCircle />
        </span>
      </button>
      {isOpenModalAddItemTransaction && <AddItem />}
      <div className='table-transaksi mx-10 mb-10'>
        <table className='text-left w-full'>
          <thead className='flex text-white w-full pr-4 mb-6'>
            <tr className='flex w-full items-center text-center mb-4'>
              <th className='w-1/12'>No.</th>
              <th className='w-2/12 text-left mr-12'>Nama Item</th>
              <th className='w-1/12'>Qty</th>
              <th className='w-1/12 mx-5'>Satuan</th>
              <th className='w-2/12 mx-5'>Harga</th>
              <th className='w-3/12 pr-5'>Ket.</th>
              <th className='w-1/12'>Hapus</th>
            </tr>
          </thead>
          <tbody className='flex flex-col text-white w-full overflow-y-scroll w-full'>
            {(items || []).length !== 0 &&
              (items || []).map((item, index) => (
                <tr
                  key={index}
                  className='flex w-full items-center text-center mb-4'>
                  <td className='w-1/12'>{index + 1}</td>
                  <td className='w-2/12 text-left mr-12'>{item.nama}</td>
                  <td className='w-1/12'>
                    <input
                      className='w-24 font-semibold rounded-full text-biru text-center py-2'
                      type='number'
                      id='qty'
                      name='qty'
                      // min='0'
                      step='any'
                      value={item.qty}
                      onChange={(e) => {
                        changeQty(item, e);
                      }}
                    />
                  </td>
                  <td className='w-1/12 mx-5'>{item.satuan}</td>
                  <td className='w-2/12 mx-5'>
                    <CurrencyFormat
                      value={item.total}
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'Rp. '}
                    />
                  </td>
                  <td className='w-3/12 pr-5'>
                    <input
                      className='w-full font-medium rounded-full text-biru px-6 py-2'
                      type='text'
                      placeholder='baju bolong'
                      id='keterangan'
                      name='keterangan'
                      value={item.keterangan}
                      onChange={(e) => {
                        e.persist();
                        setKeterangan({ item, text: e.target.value });
                      }}
                    />
                  </td>
                  <td className='w-1/12'>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className='btn-hapus pt-4 text-5xl hover:opacity-75'>
                      <MdDelete className='block mx-auto' />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
