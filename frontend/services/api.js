import axios from 'axios';

const client = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    'http://localhost:5000/api',

  headers: {
    'Content-Type': 'application/json',
  },

  withCredentials: true,
});

// Attach token automatically
client.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {

    // FIXED HERE
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      config.headers.Authorization = `Bearer ${storedToken}`;
    }
  }

  return config;
});

export const jobsApi = {
  getAll: () => client.get('/jobs'),

  getById: (id) => client.get(`/jobs/${encodeURIComponent(id)}`),

  create: (payload) => client.post('/jobs', payload),

  updateStatus: (id, status) =>
    client.patch(`/jobs/${encodeURIComponent(id)}`, { status }),

  remove: (id) => client.delete(`/jobs/${encodeURIComponent(id)}`),
};

export default client;