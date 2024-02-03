import axiosInstance from './index';
import Cookies from 'js-cookie';

const signInUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('/user/signin', { username:email, password });
        // Set JWT to a cookie
        Cookies.set('jwt', response.data.jwt); 

        return response.data;
    } catch (error) {      
        throw new Error(error.response.data.message);
    }
};

const signOutUser = () => {
    Cookies.remove('jwt');
};

const getUserBalance = async (userId) => {
    try {
        // Add user id to body
        const response = await axiosInstance.get('/account/balance',{
            params: {
                userId: userId  
              }
         }
        )
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};

export {signInUser, signOutUser,getUserBalance};
