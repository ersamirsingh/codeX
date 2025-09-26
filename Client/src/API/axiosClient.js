import axios from "axios"

const axiosClient =  axios.create({

    baseURL: 'https://codex-backend-ys74.onrender.com',
    
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
  
});


export default axiosClient;

