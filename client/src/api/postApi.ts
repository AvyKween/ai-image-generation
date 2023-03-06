import axios from 'axios';

const postsApi = axios.create({
    baseURL: 'http://localhost:4000',
})

export default postsApi;