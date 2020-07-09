import React, { useState } from 'react';
import SearchFaktur from './SearchFaktur';
import TableCheckout from './TableCheckout';

import { useStoreState } from 'easy-peasy';

const CheckOut = () => {
  const [optionFilter, setOptionFilter] = useState('nama');
  const [stringFilter, setStringFilter] = useState('');

  const { transactions } = useStoreState((state) => state.transactions);

  const handleStringFilter = (e) => {
    setStringFilter(e.target.value);
  };

  return (
    <div className='checkout relative container mx-auto'>
      <div className='head-checkout text-center text-biru font-bold text-4xl mb-10'>
        Ambil Laundry
      </div>
      <div className='content-checkout bg-biru rounded-app w-4/5 mx-auto pt-8 px-8'>
        <SearchFaktur
          stringFilter={stringFilter}
          optionFilter={optionFilter}
          setStringFilter={(value) => setStringFilter(value)}
          setOptionFilter={(value) => setOptionFilter(value)}
          onStringFilterChange={handleStringFilter}
        />
        {/* {transactions.length !== 0 && ( */}
        <TableCheckout
          transactions={transactions}
          optionFilter={optionFilter}
          stringFilter={stringFilter}
        />
      </div>
    </div>
  );
};

export default CheckOut;
