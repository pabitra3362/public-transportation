/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDriverToken } from "../utils/token";
import { jwtDecode } from "jwt-decode";

const DriverWrapper = ({ children }) => {
  const navigate = useNavigate();
  const token = getDriverToken();

  useEffect(() => {
    if (!token) return navigate("/drive");
    const { role } = jwtDecode(token);
    if (role !== "captain") return navigate("/drive");
  }, [token]);

  
  return <div>{children}</div>;
};

export default DriverWrapper;
