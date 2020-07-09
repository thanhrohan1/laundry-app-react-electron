import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <Fragment>
    <h1 className='font-sans text-6xl text-gray-800 text-center'>
      404 Page Not Found ! -{' '}
      <Link className='text-biru' to='/'>
        Go home
      </Link>
    </h1>
  </Fragment>
);

export default NotFound;
