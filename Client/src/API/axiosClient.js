import axios from "axios"

const axiosClient =  axios.create({

    baseURL: 'https://codex-backend-ofca.onrender.com',
    // baseURL: 'http://localhost:3000',
    
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
  
});


export default axiosClient;

