import React, { useState } from 'react';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa6';

export default function BalanceCard({ data }) {
  const [isRevealed, setIsRevealed] = useState(true);
  return (
    <div className='bg-gradient-to-tl from-gray-900 to-gray-800 text-white w-full h-56 sm:w-96 max-w-96  p-6 rounded-xl shadow-md'>
      <div className='h-full flex flex-col justify-between'>
        <div className='flex items-start justify-between space-x-4'>
          <div className=' text-xl font-semibold tracking-tigh'>EPAY</div>

          <div className='inline-flex flex-col items-center justify-center'>
            <RiSecurePaymentLine className='w-9 h-9 mr-2 text-[#6D69FB]' />
          </div>
        </div>

        <div className='inline-block w-12 h-8 bg-gradient-to-tl from-yellow-200 to-yellow-100 rounded-md shadow-inner overflow-hidden'>
          <div className='relative w-full h-full grid grid-cols-2 gap-1'>
            <div className='absolute border border-gray-900 rounded w-4 h-6 left-4 top-1'></div>
            <div className='border-b border-r border-gray-900 rounded-br'></div>
            <div className='border-b border-l border-gray-900 rounded-bl'></div>
            <div className=''></div>
            <div className=''></div>
            <div className='border-t border-r border-gray-900 rounded-tr'></div>
            <div className='border-t border-l border-gray-900 rounded-tl'></div>
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <div>
            <div className='text-md font-semibold tracking-tight'>Balance</div>
            <div className=' flex items-center gap-4 '>
              <p className='text-xl font-semibold'>
                {isRevealed ? `$${data?.balance}` : '****'}
              </p>
              <button
                className='inline-block'
                onClick={() => setIsRevealed(!isRevealed)}
              >
                {isRevealed ? (
                  <FaEye className='white h-6 w-6' />
                ) : (
                  <FaEyeSlash className='white  h-6 w-6' />
                )}
              </button>
            </div>
          </div>
          <div>
            {data?.firstName && data?.lastName && (
              <p className='text-xl font-semibold'>{`${data?.firstName} ${data?.lastName}`}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
