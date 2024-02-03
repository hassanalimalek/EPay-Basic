import React from 'react';

export default function BalanceTable() {
  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg  '>
      <div className='pb-4 bg-white dark:bg-gray-900 p-4'>
        <label htmlFor='table-search' className='sr-only'>
          Search
        </label>
        <div className='relative mt-1 '>
          <div className='absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none'>
            <svg
              className='w-4 h-4 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 20'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='block p-2 ps-10 text-md  border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white'
            placeholder='Search for users'
          />
        </div>
      </div>
      <table className='w-full p-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <tbody className='w-full '>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              Apple MacBook Pro 17"
            </th>
            <td className='text-right  px-6 py-4'>
              <button className='bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200'>
                Send Money
              </button>
            </td>
          </tr>
          <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
            <th
              scope='row'
              className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
            >
              Microsoft Surface Pro
            </th>
            <td className='ml-auto text-right  px-6 py-4'>
              <button className='bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200'>
                Send Money
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
