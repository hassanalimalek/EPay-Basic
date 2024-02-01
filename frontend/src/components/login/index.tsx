import React, { useState } from 'react';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { motion } from 'framer-motion';
import SignUpImg from '../../assets/signupImg.svg';
import LoginImg from '../../assets/loginImg.svg';
import signInUser from '../../api/user';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 3,
      staggerChildren: 4,
    },
  },
};
const slideInFromRight = {
  hidden: { x: '100vw' },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 30,
    },
  },
};

function Login() {
  const [pageType, setPageType] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('username-->', username);
    console.log('password-->', password);
    await signInUser(username, password);
    // TODO: Implement login logic here
  };

  return (
    <div className='flex justify-between '>
      <section className='] h-[100vh] bg-gray-50 dark:bg-gray-900 w-[100%] md:w-[50%] flex items-center justify-center'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='show'
          className='w-[100%]'
        >
          <div className='w-[80%] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
            <a
              href='#'
              className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'
            >
              <RiSecurePaymentLine className='w-8 h-8 mr-2 text-[#6D69FB]' />
              E-Pay
            </a>
            <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
              <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
                  {pageType === 'login' ? 'Login' : 'Create an account'}
                </h1>
                <form
                  className='space-y-4 md:space-y-6'
                  onSubmit={handleSubmit}
                >
                  <div>
                    <label
                      htmlFor='email'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Your username
                    </label>
                    <input
                      type='input'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@company.com'
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor='password'
                      className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                    >
                      Password
                    </label>
                    <input
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      onChange={handlePasswordChange}
                    />
                  </div>
                  {pageType === 'signup' && (
                    <div>
                      <label
                        htmlFor='confirm-password'
                        className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                      >
                        Confirm password
                      </label>
                      <input
                        type='confirm-password'
                        name='confirm-password'
                        id='confirm-password'
                        placeholder='••••••••'
                        className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      />
                    </div>
                  )}
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='terms'
                        aria-describedby='terms'
                        type='checkbox'
                        className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800'
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label
                        htmlFor='terms'
                        className='font-light text-gray-500 dark:text-gray-300'
                      >
                        I accept the{' '}
                        <a
                          className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                          href='#'
                        >
                          Terms and Conditions
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type='submit'
                    className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border'
                  >
                    Submit
                  </button>
                  {pageType === 'login' ? (
                    <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                      Don't have an account?{' '}
                      <a
                        href='#'
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        onClick={() => setPageType('signup')}
                      >
                        Create one here
                      </a>
                    </p>
                  ) : (
                    <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
                      Already have an account?{' '}
                      <a
                        href='#'
                        className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                        onClick={() => setPageType('login')}
                      >
                        Login here
                      </a>
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <div className='flex justify-center items-center w-[0%] md:w-[50%]'>
        {/* <img className='w-[70%]' src={SignUpImg}></img> */}
        <motion.img
          className='w-[70%]'
          src={SignUpImg}
          alt='Sign Up'
          variants={slideInFromRight}
          initial='hidden'
          animate='visible'
        />
      </div>
    </div>
  );
}

export default Login;
