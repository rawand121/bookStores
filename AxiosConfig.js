import axios from "axios";

const instance = axios.create({
    // baseURL : 'https://book-stores.vercel.app'
    baseURL : 'http://localhost:3000'
})

export default instance