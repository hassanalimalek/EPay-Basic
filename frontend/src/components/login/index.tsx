import React, { useState } from 'react';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

import { signInUser, signUpUser } from '../../api/user';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

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

const userDataInitialState = {
  firstName: '',
  lastName: '',
  userName: '',
  password: '',
};
function Login() {
  const [loading, setLoading] = useState(false);
  const [pageType, setPageType] = useState('login');
  const [userData, setUserData] = useState(userDataInitialState);

  const navigate = useNavigate();

  const handleUserData = (key, value) => {
    setUserData({ ...userData, [key]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pageType === 'login') {
      setLoading(true);
      try {
        await signInUser(userData.userName, userData.password);
        navigate('/');
      } catch (e) {
        toast.error(e?.message || 'Something went wrong', {
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(true);
      try {
        await signUpUser(userData);
        toast.success('Account created successfully', {
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
        setPageType('login');
      } catch (e) {
        toast.error(e?.message || 'Something went wrong', {
          style: {
            borderRadius: '8px',
            background: '#333',
            color: '#fff',
          },
        });
      } finally {
        setLoading(false);
        setUserData(userDataInitialState);
      }
    }
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
                      Your userName
                    </label>
                    <input
                      required
                      type='input'
                      name='email'
                      id='email'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='name@company.com'
                      onChange={(e) =>
                        handleUserData('userName', e.target.value)
                      }
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
                      required
                      type='password'
                      name='password'
                      id='password'
                      placeholder='••••••••'
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      onChange={(e) =>
                        handleUserData('password', e.target.value)
                      }
                    />
                  </div>
                  {pageType === 'signup' && (
                    <>
                      <div>
                        <label
                          htmlFor='firstName'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          First Name
                        </label>
                        <input
                          required
                          type='input'
                          name='firstName'
                          id='firstName'
                          placeholder='John'
                          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          onChange={(e) =>
                            handleUserData('firstName', e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor='lastName'
                          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                        >
                          Last Name
                        </label>
                        <input
                          required
                          type='input'
                          name='lastName'
                          id='lastName'
                          placeholder='Doe'
                          className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                          onChange={(e) =>
                            handleUserData('lastName', e.target.value)
                          }
                        />
                      </div>
                    </>
                  )}

                  <button
                    type='submit'
                    className='w-full flex items-center justify-center text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border'
                  >
                    {loading && (
                      <svg
                        aria-hidden='true'
                        className='inline-block w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600'
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
                    )}
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
        {pageType === 'login' ? (
          <motion.img
            className='w-[70%]'
            src={'/loginImg.svg'}
            alt='Sign Up'
            variants={slideInFromRight}
            initial='hidden'
            animate='visible'
          />
        ) : (
          <motion.img
            className='w-[70%]'
            src={'/signupImg.svg'}
            alt='Sign Up'
            variants={slideInFromRight}
            initial='hidden'
            animate='visible'
          />
        )}
      </div>
    </div>
  );
}

export default Login;
