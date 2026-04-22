import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5005/api' });

// Automatically attach JWT token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  register: (data) => API.post('/auth/register', data),
  getMe: () => API.get('/auth/me'),
};

export const tenderAPI = {
  getAll: (params) => API.get('/tenders', { params }),
  getById: (id) => API.get(`/tenders/${id}`),
  create: (data) => API.post('/tenders', data),
};

export const bidAPI = {
  submit: (data) => API.post('/bids', data),
  getMyBids: () => API.get('/bids/my'),
  withdraw: (id) => API.put(`/bids/${id}/withdraw`),
  getByTender: (tenderId) => API.get(`/bids/tender/${tenderId}`),
  updateStatus: (id, status) => API.put(`/bids/${id}/status`, { status }),
};

export const recommendAPI = {
  get: () => API.get('/recommendations'),
};

export const notificationAPI = {
  getAll: () => API.get('/notifications'),
  markRead: (id) => API.put(`/notifications/${id}/read`),
  markAllRead: () => API.put('/notifications/read-all'),
};

export const adminAPI = {
  getStats: () => API.get('/admin/stats'),
  getUsers: () => API.get('/admin/users'),
};

export default API;
