import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const fetchActiveDoubts = (email) => {
  const endPoint = `${url}/getDoubt/${email}`;
  return axios.get(endPoint, { studentEmail: email }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};
