import React, { useEffect, useState } from 'react';
import BalanceCard from '../balanceCard';
import BalanceTable from '../balanceTable';
import { getJWTData } from '../../utils/helper';
import { getUserBalance } from '../../api/user';

export default function Home() {
  let decodedData: any = getJWTData();
  console.log('decodedData -->', decodedData);
  const [accountData, setAccountData] = useState({
    firstName: '',
    lastName: '',
    userName: decodedData?.username,
    balance: 0,
  });
  console.log('accountData -->', accountData);
  // Getting user balance
  useEffect(() => {
    (async () => {
      if (decodedData?.id) {
        let response = await getUserBalance(decodedData?.id);
        setAccountData({
          userName: decodedData?.username,
          balance: response?.balance,
          firstName: decodedData?.firstName,
          lastName: decodedData?.lastName,
        });
      }
    })();
  }, [decodedData?.id]);
  return (
    <div className='max-w-screen-2xl m-auto p-4 px-6 border-2 min-h-[85vh] mt-4'>
      <div className='mb-6 flex flex-col sm:flex-row  justify-between items-center '>
        <h2 className='mb-6 text-3xl font-bold '>Welcome!</h2>
        <BalanceCard data={accountData} />
      </div>
      <h2 className='mb-6 text-xl font-bold '>Users</h2>
      <BalanceTable />
    </div>
  );
}
