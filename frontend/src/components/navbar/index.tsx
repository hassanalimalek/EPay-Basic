import React, { useState } from 'react';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { getJWTData } from '../../utils/helper';
import { FaUserCircle } from 'react-icons/fa';
import { signOutUser } from '../../api/user';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  let decodedData: any = getJWTData();
  let navigate = useNavigate();

  const logout = () => {
    signOutUser();
    navigate('/login');
  };

  return (
    <div>
      <nav className='bg-white border-gray-200 dark:bg-gray-900'>
        <div className='max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4 px-6'>
          <a
            href='#'
            className='flex items-center  text-2xl font-semibold text-gray-900 dark:text-white'
          >
            <RiSecurePaymentLine className='w-8 h-8 mr-2 text-[#6D69FB]' />
            E-Pay
          </a>
          <div className='flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <button
              type='button'
              className='flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600'
              id='user-menu-button'
              aria-expanded='false'
              onClick={() => setIsOpen(!isOpen)}
            >
              <span className='sr-only'>Open user menu</span>
              <FaUserCircle className='text-white h-8 w-8' />
            </button>
            {isOpen && (
              <div
                className='z-50 my-4 absolute  right-4 top-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
                id='user-dropdown'
              >
                <div className='px-4 py-3'>
                  <span className='block text-sm mb-1 text-gray-900 dark:text-white font-semibold'>
                    {decodedData?.firstName} {decodedData?.lastName}
                  </span>
                  <span className='block text-sm text-gray-900 dark:text-white'>
                    {decodedData?.username}
                  </span>
                </div>
                <ul className='py-1' aria-labelledby='user-menu-button'>
                  <li>
                    <button
                      onClick={logout}
                      className='w-full block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                    >
                      Sign out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
