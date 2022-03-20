import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const createInstructor = (payload) => {
  const endPoint = `${url}/admin/instructor`;
  return axios.post(endPoint, payload, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAllInstructors = () => {
  const endPoint = `${url}/admin/instructors`;
  return axios.post(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const editAdminInstructor = (_id, editedInstructor) => {
  const endPoint = `${url}/admin/instructor/${_id}`;
  return axios.patch(endPoint, editedInstructor, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.resolve(result);
  });
};
