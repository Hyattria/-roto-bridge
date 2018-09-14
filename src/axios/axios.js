import axios from 'axios'

let request

export default function (configs) {
  if (request === undefined) {
    // Create Axios instance and configure it
    request = axios.create({
      baseURL: process.env.API,
      headers: {
        Accept: 'application/json'
      }
    })
    // Listen response
    request.interceptors.response.use(null, error => {
      // 对响应错误做点什么
      return Promise.reject(error)
    })
  }
  return request(configs)
}
