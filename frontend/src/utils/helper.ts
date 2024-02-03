import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const getJWTData = () => {
  try {
    const jwtToken = Cookies.get('jwt');
    if (jwtToken) {
      // Parsing the jwt token to get data
      const decoded = jwtDecode(jwtToken);
      return decoded;
    } else {
      return null;
    }
  } catch (e) {
    console.log('Error in getJWTData', e);
    return null;
  }
};

export { getJWTData };
