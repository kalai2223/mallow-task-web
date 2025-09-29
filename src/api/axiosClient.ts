import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'https://reqres.in/api',
  headers: {
    'x-api-key': 'reqres-free-v1',
    'Content-Type': 'application/json', // ensure JSON
  },
});

export default axiosClient;
