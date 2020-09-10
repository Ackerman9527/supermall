import axios from 'axios'

export function request(config) {
  const instance = new axios.create({
    baseURL:'http://152.136.185.210:8000/api/z8',
    // baseURL:'https://httpbin.org/',
    timeout:10000
  });

  // 请求拦截器
  instance.interceptors.request.use(config => {
    //拦截后需要将拦截下来的请求数据返回发送
    return config;
  }, err => {

  })

  // 相应拦截器
  instance.interceptors.response.use(res => {
    // 拦截后需要将拦截下来处理成的结果返回
    return res.data
  }, err => {
    console.log(err)
  })

  return instance(config)
}
