import React, { useState } from "react";
import { Form, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../redux/alertsSlice";
import "../resourses/auth.css";
import api from "../helpers/axiosInstance";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await api.post("/api/users/login", values);
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        window.location.href = "/";
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-screen d-flex justify-content-center align-items-center auth">
      <div className="w-400 card p-3">
        <h1 className="text-lg">SaranBus - Login</h1>
        <hr />
        <Form layout="vertical" onFinish={onFinish} initialValues={formValues}>
          <Form.Item label="Email" name="email">
            <input
              type="text"
              name="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
            />
          </Form.Item>
          <div className="d-flex justify-content-between align-items-center my-3">
            <Link to="/register">Click Here To Register</Link>
            <button className="secondary-btn" type="submit">
              Login
            </button>
          </div>
          <div className="mt-3 admin-login-info">
            <p>For admin login: admin@gmail.com, pass: 12345678</p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
