import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL;

export default axios;
