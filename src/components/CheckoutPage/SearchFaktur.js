import React from 'react';

const SearchFaktur = ({
  onStringFilterChange,
  setStringFilter,
  setOptionFilter,
  stringFilter,
  optionFilter,
}) => {
  return (
    <div className='cariFaktur flex'>
      <select
        className='mr-2 rounded-lg px-4 text-2xl font-bold text-biru'
        name='filter'
        id='filter'
        onChange={(e) => {
          setStringFilter('');
          setOptionFilter(e.target.value);
        }}>
        <option className='font-medium' value='nama'>
          Nama
        </option>
        <option className='font-medium' value='faktur'>
          No Faktur
        </option>
      </select>
      <input
        className='rounded-lg text-biru px-5 appearance-none block bg-gray-200 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-blue-700'
        type='text'
        placeholder={optionFilter === 'nama' ? 'jailani..' : '#NF-xxxxx'}
        value={stringFilter}
        onChange={onStringFilterChange}
      />
    </div>
  );
};

export default SearchFaktur;
