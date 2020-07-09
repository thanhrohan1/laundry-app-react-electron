import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';

import { useStoreState, useStoreActions } from 'easy-peasy';

const Form = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { authData } = useStoreState((state) => state.auth);
  const { loginSuccess } = useStoreActions((actions) => actions.auth);

  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   loginSuccess({ email, password });
  // };

  if (authData.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div className='w-3/12 mx-auto block mt-56'>
      <form
        className='bg-white shadow appearance-none rounded px-16 pb-16 pt-10 mb-5'
        onSubmit={(e) => {
          e.preventDefault();
          loginSuccess({ email, password });
        }}>
        <h1 className='text-center text-4xl font-bold align-center mb-10'>
          Campus Laundry
        </h1>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-lg font-bold mb-4'
            htmlFor='username'>
            Email
          </label>
          <input
            className='text-2xl shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='username'
            type='email'
            placeholder='email@email.com'
            name='email'
            value={email}
            onChange={onChange}
            required={true}
          />
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-lg font-bold mb-4'
            htmlFor='password'>
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-4 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            placeholder='********'
            name='password'
            value={password}
            onChange={onChange}
            minLength='6'
            required={true}
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-2xl text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-48'
            type='submit'>
            Login
          </button>
        </div>
      </form>
      <p className='text-center text-gray-500 text-md'>
        &copy; 2020 Campus Dev. All rights reserved.
      </p>
    </div>
  );
};

export default Form;
