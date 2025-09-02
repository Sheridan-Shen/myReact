import React, { useState, useEffect } from "react";
import axios from "axios";
const TodoList = () => {
  // 创建axios实例
  const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
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

  const [todos, setTodos] = useState([]);
  async function fetchTodos() {
    const data = await api.get("/todos");
    setTodos(data);
  }
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      {todos.map((todo) => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </div>
  );
};
export default TodoList;
