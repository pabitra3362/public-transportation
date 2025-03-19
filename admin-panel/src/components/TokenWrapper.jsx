import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TokenWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      return navigate('/');
    }
  }, [token]);

  return (
    <div>
    {children}
    </div>
  )
};

export default TokenWrapper;
