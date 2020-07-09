import React, { useState } from 'react';
import Modal from 'react-modal';

import { useStoreState, useStoreActions } from 'easy-peasy';

const AddItem = () => {
  const [filter, setFilter] = useState('');
  const { isOpenModalAddItemTransaction } = useStoreState(
    (state) => state.modal
  );
  const { setIsOpenModalAddItemTransaction } = useStoreActions((actions) => ({
    setIsOpenModalAddItemTransaction:
      actions.modal.setIsOpenModalAddItemTransaction,
  }));

  const { addItemTransaction, updateQtyWithSelect } = useStoreActions(
    (actions) => ({
      addItemTransaction: actions.transaction.addItemTransaction,
      updateQtyWithSelect: actions.transaction.updateQtyWithSelect,
    })
  );

  const { services } = useStoreState((state) => state.services);
  const { items } = useStoreState((state) => state.transaction);

  const addItem = (service) => {
    const item = items.find((item) => item._id === service._id);
    item ? updateQtyWithSelect(item) : addItemTransaction({ item: service });
  };

  const filterServices = (e) => {
    e.persist();
    setFilter(e.target.value);
  };

  Modal.setAppElement('#app');
  return (
    <div className='addItem'>
      <Modal
        className='modalTransaction modalPilihLayanan'
        closeTimeoutMS={200}
        isOpen={isOpenModalAddItemTransaction}
        // shouldCloseOnOverlayClick={false}
        onRequestClose={() => setIsOpenModalAddItemTransaction(false)}>
        <h1 className='mb-5'>Pilih Layanan</h1>
        <input
          className='filter-services text-3xl px-10 appearance-none block w-full bg-gray-300 border border-gray-300 rounded py-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-700'
          type='text'
          placeholder='Nama Layanan'
          id='filter-services'
          name='filter-services'
          value={filter}
          onChange={filterServices}
        />
        <div className='service mt-4 overflow-y-scroll'>
          {(services || []).length !== 0 &&
            (services || [])
              // buat filter list services
              .filter(({ nama }) =>
                nama.toLowerCase().includes(filter.toLowerCase())
              )
              .map((service, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setIsOpenModalAddItemTransaction(false);
                    // find item, udah ada apa belum?, kalo ada, diupdate, kalo ngga, di create
                    addItem(service);
                  }}
                  className='service py-5 px-10 bg-gray-200 w-full justify-between hover:bg-gray-400'>
                  <h2 className='text-3xl font-bold'>{service.nama}</h2>
                  <div className='desc font-medium '>
                    <p className='text-biru'>
                      Rp. {service.harga} / 1.0 {service.satuan}
                    </p>
                    <p className='font-bold text-xl mt-2'>
                      {service.durasi} Hari
                    </p>
                  </div>
                </div>
              ))
              .sort((a, b) => {
                const textA = a.props.children[0].props.children.toLowerCase();
                const textB = b.props.children[0].props.children.toLowerCase();
                return textA < textB ? -1 : 1;
              })}
        </div>
      </Modal>
    </div>
  );
};

export default AddItem;
