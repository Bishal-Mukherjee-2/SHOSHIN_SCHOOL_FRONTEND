import axios from 'axios';

const url = 'https://shoshin-school-backend.herokuapp.com/api';

export const pushDashboardModule = (courseId, newModule, level) => {
  const endPoint = `${url}/admin/modules/${courseId}/${level}`;
  return axios.patch(endPoint, newModule).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const createAdminDashboard = (newDashboard) => {
  const endPoint = `${url}/admin/modules`;
  return axios.post(endPoint, newDashboard).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAdminDashboard = () => {
  const endPoint = `${url}/admin/modules`;
  return axios.get(endPoint).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const editAdminModule = (courseId, level, objectId, editedModule) => {
  const endPoint = `${url}/admin/modules/${courseId}/${level}/${objectId}`;
  return axios.patch(endPoint, editedModule, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAdminModuleById = (courseId) => {
  const endPoint = `${url}/admin/module`;
  return axios.post(endPoint, courseId, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const disableAdminModule = (courseId, level, id) => {
  const endPoint = `${url}/admin/modules/disable/${courseId}/${level}/${id}`;
  return axios.patch(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

//////// NEW SERVICES FOR NEW SCHEMA //////////

// SECTION SERVICE //

export const createSection = (sectionData) => {
  const endPoint = `${url}/admin/createNewSection`;
  return axios.post(endPoint, sectionData, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getSectionByCourseId = (courseIdObj) => {
  const endPoint = `${url}/admin/getSectionByCourseId`;
  return axios.post(endPoint, courseIdObj, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

// MODULE SERVICE //

export const createModule = (moduleData) => {
  const endPoint = `${url}/admin/createModule`;
  return axios.post(endPoint, moduleData, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const editModule = (moduleData) => {
  const endPoint = `${url}/admin/editModule`;
  return axios.post(endPoint, moduleData, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAllModules = () => {
  const endPoint = `${url}/admin/getAllModules`;
  return axios.get(endPoint, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};

export const getAllModuleByCourseId = (courseId) => {
  const endPoint = `${url}/admin/getModuleByCourseId`;
  return axios.post(endPoint, courseId, { withCredentials: true }).then((result) => {
    if (result.data) return result.data;
    return Promise.reject(result);
  });
};
