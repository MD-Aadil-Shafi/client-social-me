import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL;

let token = JSON.parse(localStorage.getItem("socialToken"));


export const publicRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,//30sec
});

export const privateRequest = axios.create({
    baseURL: BASE_URL,
    timeout: 30000,
    headers:{Authorization : `Bearer ${token}`}
})

// let reqInstance = axios.create({
//     headers: {
//       Authorization : `Bearer ${localStorage.getItem("access_token")}`
//       }
//     }
//   })