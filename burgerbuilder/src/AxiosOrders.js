import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://react-my-burger-38432.firebaseio.com/'
})

export default axiosInstance;