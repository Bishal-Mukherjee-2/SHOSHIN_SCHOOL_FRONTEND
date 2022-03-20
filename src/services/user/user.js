import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const toggleRedirectAdmin = (email) => {
  const endPoint = `${url}/user/updateAdminRedirect`;
  return axios.patch(endPoint, email, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};
