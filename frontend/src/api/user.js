import axiosInstance from './index';
import Cookies from 'js-cookie';

const signInUser = async (email, password) => {
    console.log("axios -->",axiosInstance)
    console.log("import.meta.env.API_BASE_URL, -->",import.meta.env.VITE_API_BASE_URL)
    // axiosInstance
    try {
        const response = await axiosInstance.post('/user/signin', { username:email, password });
        console.log("response @@@ sign in", response)
        // Set JWT to a cookie
        Cookies.set('jwt', response.data.jwt); 
       
        return response.data;
    } catch (error) {
        console.log("error -->",error.response.data.message)
        return error;
   
    }
};

export default signInUser;
