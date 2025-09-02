import axios from "axios";
const api = axios.create({
  baseURL: "/api",
});

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 添加认证token
    config.headers.Authorization = "Bearer fake-token";
    // 显示加载状态
    //   setLoading(true);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    // 隐藏加载状态
    // setLoading(false);
    // 直接返回响应数据
    return response.data;
  },
  (error) => {
    // setLoading(false);
    return Promise.reject(error);
  }
);

export default api;
