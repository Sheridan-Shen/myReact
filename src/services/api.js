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
    // 成功响应：直接返回响应数据（如 response.data）
    return response.data;
  },
  (error) => {
    // 统一错误处理
    let errorMessage = "未知错误";

    // 1. 判断是否有响应
    if (error.response) {
      // 服务器返回了响应（如 404, 500, 400 等）
      const { status, data } = error.response;

      if (data?.message) {
        errorMessage = data.message; // 优先使用后端返回的 message
      } else if (data?.error) {
        errorMessage = data.error;
      } else {
        switch (status) {
          case 400:
            errorMessage = "请求参数错误";
            break;
          case 401:
            errorMessage = "未授权，请重新登录";
            break;
          case 403:
            errorMessage = "拒绝访问";
            break;
          case 404:
            errorMessage = "请求的资源不存在";
            break;
          case 500:
            errorMessage = "服务器内部错误";
            break;
          case 502:
            errorMessage = "网关错误";
            break;
          case 503:
            errorMessage = "服务不可用";
            break;
          case 504:
            errorMessage = "网关超时";
            break;
          default:
            errorMessage = `请求失败：${status}`;
        }
      }
    } else if (error.request) {
      // 请求已发出，但无响应（如网络断开）
      errorMessage = "网络连接失败，请检查网络";
    } else {
      // 其他错误（如设置请求时出错）
      errorMessage = error.message || "请求失败";
    }

    // 统一弹出 alert
    alert(`请求错误：${errorMessage}`);

    // 仍然 reject 错误，以便调用处可以 catch
    return Promise.reject(new Error(errorMessage));
  }
);

export default api;
