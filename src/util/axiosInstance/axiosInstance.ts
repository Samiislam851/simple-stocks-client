import axios from "axios";

const customAxios = axios.create({
    baseURL: 'https://basic-stocks-server.onrender.com',
})
export default customAxios