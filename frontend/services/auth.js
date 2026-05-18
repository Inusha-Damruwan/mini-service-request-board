import client from './api';

export const authApi = {
  register: async (payload) => {
    return await client.post('/auth/register', payload);
  },

  login: async (payload) => {
    return await client.post('/auth/login', payload);
  },

  logout: async () => {
    return await client.post('/auth/logout');
  },

  profile: async () => {
    return await client.get('/auth/profile');
  },
};