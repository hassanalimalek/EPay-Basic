import React, { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import debounce from 'lodash/debounce';
import { getUsers } from '../../api/user';
import TransferModal from '../transferModal';

export default function BalanceTable({ currentUser, getBalance }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [transferUser, setTransferUser] = useState({} as any);
  const [fetchedUsers, setFetchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchUsers = useCallback(
    debounce(async (search) => {
      if (currentUser && currentUser?.id) {
        try {
          setLoading(true);
          let users = await getUsers(search);

          let filteredUsers = users?.user?.filter(
            (user) => user._id !== currentUser?.id
          );
          setFetchedUsers(filteredUsers);
        } catch (err) {
          toast.error('Error fetching users');
        } finally {
          setLoading(false);
        }
      }
    }, 1000),
    []
  );

  const handleInputChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearch(newSearchTerm);
    fetchUsers(newSearchTerm);
  };

  useEffect(() => {
    fetchUsers(search);
  }, [currentUser?.id, search]);

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
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
              />
            </svg>
          </div>
          <input
            type='text'
            id='table-search'
            className='block p-2 ps-10 text-md  border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-white'
            placeholder='Search for users'
            onChange={handleInputChange}
          />
        </div>
      </div>
      <table className='w-full p-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Name
            </th>
            <th scope='col' className='px-6 py-3'>
              Email
            </th>
            <th scope='col' className='px-6 py-3 text-right md:pr-20 '>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='w-full bg-gray'>
          {loading ? (
            <th colSpan={3} className=' p-4 text-center '>
              <svg
                aria-hidden='true'
                className='ml-auto mr-auto w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='currentColor'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='currentFill'
                />
              </svg>
            </th>
          ) : (
            fetchedUsers.length > 0 &&
            fetchedUsers.map((user: any) => {
              return (
                <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {user.firstName} {user.lastName}
                  </th>
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                    {user.userName}
                  </th>
                  <td className='text-right  px-6 py-4'>
                    <button
                      className='bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200'
                      onClick={() => {
                        setModalVisible(true);
                        setTransferUser(user);
                      }}
                    >
                      Send Money
                    </button>
                  </td>
                </tr>
              );
            })
          )}
          {!loading && fetchedUsers.length === 0 && (
            <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
              <th
                scope='row'
                className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center'
                colSpan={3} // Replace 3 with the actual number of columns in your table
              >
                No users found
              </th>
            </tr>
          )}
        </tbody>
      </table>
      <TransferModal
        getBalance={getBalance}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        transferUser={transferUser}
        currentUser={currentUser}
      />
    </div>
  );
}
