import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { LuArrowBigRightDash } from 'react-icons/lu';
import { transferFunds } from '../../api/user';

export default function TransferModal({
  getBalance,
  modalVisible,
  setModalVisible,
  transferUser,
  currentUser,
}) {
  const [transferLoading, setTransferLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formValues = Object.fromEntries(formData.entries());
    let data = {
      senderId: currentUser.id,
      receiverId: transferUser._id,
      amount: formValues.amount,
    };
    setTransferLoading(true);
    try {
      await transferFunds(data);
      toast.success('Funds transferred successfully');
      setModalVisible(false);
      getBalance(currentUser.id);
      // Resetting form values
      e.target.reset();
    } catch (e) {
      toast.error(e?.message || 'Failed to transfer funds');
    } finally {
      setTransferLoading(false);
    }
  }
  return (
    <div>
      <div
        id='crud-modal'
        tabIndex={-1}
        aria-hidden='true'
        className={`${
          modalVisible ? '' : 'hidden'
        } bg-gray-900 bg-opacity-90 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex `}
      >
        <div className=' relative p-4 w-full max-w-md max-h-full m-auto'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white'>
                Transfer Funds
              </h3>
              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='crud-modal'
                onClick={() => setModalVisible(false)}
              >
                <svg
                  className='w-3 h-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 14'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <form className='p-4 md:p-5' onSubmit={onSubmit}>
              <div className='grid gap-4 mb-4 grid-cols-2'>
                <div className='text-white text-lg w-60 flex justify-between '>
                  <p className='block '> Transfer To : </p>
                  <div className='text-left'>
                    <p>
                      {transferUser.firstName + ' ' + transferUser?.lastName}
                    </p>
                    <p>{transferUser.userName}</p>
                  </div>
                </div>

                <div className='col-span-2 mb-2'>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  >
                    Amount
                  </label>
                  <input
                    type='number'
                    name='amount'
                    id='amount'
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='100'
                    required
                    min={10}
                  />
                </div>
              </div>
              {transferLoading ? (
                <img
                  className='text-white h-16 w-16 mt-4 m-auto '
                  src='/money-transfer.gif'
                  alt='Money Transfer'
                />
              ) : (
                <button
                  type='submit'
                  className='text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
                >
                  Transfer <LuArrowBigRightDash className='ml-2' />
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
