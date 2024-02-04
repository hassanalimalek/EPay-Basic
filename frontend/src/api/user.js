import axiosInstance from './index';
import Cookies from 'js-cookie';

const signInUser = async (userName, password) => {

    try {
        const response = await axiosInstance.post('/user/signin', { userName, password });
        // Set JWT to a cookie
        Cookies.set('jwt', response.data.jwt); 

        return response.data;
    } catch (error) {      
     
        throw new Error(error.message || error.response.data.message);
    }
};

const signUpUser = async (data) => {
    try {
        const response = await axiosInstance.post('/user/signup', data);
        // Set JWT to a cookie
        Cookies.set('jwt', response.data.jwt); 

        return response.data;
    } catch (error) {      
 
        throw new Error(error.message || error.response.data.message);
    }
}

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
        throw new Error(error.message || error.response.data.message);
    }
};

const getUsers = async (searchKeyword) => {
    try {
        const response = await axiosInstance.get('/user/bulk',{
            params: {
                filter: searchKeyword  
              }
         }
        )

        return response.data;
    } catch (error) {
        throw new Error(error.message || error.response.data.message);
    }
}

const transferFunds = async(data)=>{
    try{
        await axiosInstance.post('/account/transfer',data)
        return {message:'Transaction Successful'}
    }catch(error){
       throw new Error(error.message || error.response.data.message);
    }
}

export {signInUser, signUpUser,signOutUser,getUserBalance,getUsers,transferFunds};
