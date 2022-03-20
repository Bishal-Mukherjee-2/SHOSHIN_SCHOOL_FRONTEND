import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const getAdminLessions = () => {
  const endPoint = `${url}/admin/lessions`;
  return axios.get(endPoint).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getLessionByCourseByModule = (ids) => {
  const endPoint = `${url}/admin/lessions/by/course/module`;
  return axios.post(endPoint, ids, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const createAdminLession = (lession) => {
  const endPoint = `${url}/admin/lessions`;
  return axios.post(endPoint, lession, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const uploadFilesToS3 = (payload) => {
  const endPoint = `${url}/admin/lessions/uploadFiles`;
  return axios.post(endPoint, payload, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const uploadContentDataToS3 = (payload) => {
  const endPoint = `${url}/admin/lessions/uploadContent`;
  return axios.post(endPoint, payload, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getContentDataFromS3 = (payload) => {
  const endPoint = `${url}/admin/lessions/getContent`;
  return axios.post(endPoint, payload, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};
