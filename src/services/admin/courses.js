import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const createAdminCourse = (newCourse) => {
  const endPoint = `${url}/admin/createCourse`;
  return axios.post(endPoint, newCourse, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAdminCourses = () => {
  const endPoint = `${url}/admin/getCourses`;
  return axios.get(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAdminCourseById = (courseId) => {
  const endPoint = `${url}/admin/getCourseById`;
  return axios.get(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.resolve(result);
  });
};

export const editAdminCourse = (courseId, editedCourse) => {
  const endPoint = `${url}/admin/editCourse/${courseId}`;
  return axios.post(endPoint, editedCourse, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.resolve(result);
  });
};

export const deleteAdminCourse = (courseId) => {
  const endPoint = `${url}/admin/deleteCourse/${courseId}`;
  return axios.post(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.resolve(result);
  });
};
