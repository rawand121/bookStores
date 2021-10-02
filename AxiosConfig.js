import axios from "axios";

const instance = axios.create({
    baseURL : 'https://book-stores.vercel.app'
})

export default instance