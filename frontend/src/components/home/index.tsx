import React, { useEffect, useState } from 'react';
import BalanceCard from '../balanceCard';
import BalanceTable from '../balanceTable';
import { getJWTData } from '../../utils/helper';
import { getUserBalance } from '../../api/user';

export default function Home() {
  let decodedData: any = getJWTData();
  const [accountData, setAccountData] = useState({
    id: null,
    firstName: '',
    lastName: '',
    userName: decodedData?.userName,
    balance: 0,
  });

  async function getBalance(id) {
    try {
      let response: any = await getUserBalance(id);
      setAccountData({
        id: decodedData?.id,
        userName: decodedData?.username,
        balance: response?.balance,
        firstName: decodedData?.firstName,
        lastName: decodedData?.lastName,
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  // Getting user balance
  useEffect(() => {
    (async () => {
      if (decodedData?.id) {
        getBalance(decodedData?.id);
      }
    })();
  }, [decodedData?.id]);
  return (
    <div className='max-w-screen-2xl m-auto p-4 px-6 border-2 rounded-md min-h-[85vh] mt-4'>
      <div className='mb-6 flex flex-col sm:flex-row  justify-between items-center '>
        <h2 className='mb-6 text-3xl font-bold '>Welcome!</h2>
        <BalanceCard data={accountData} />
      </div>
      <h2 className='mb-6 text-xl font-bold '>Users</h2>
      <BalanceTable currentUser={accountData} getBalance={getBalance} />
    </div>
  );
}
