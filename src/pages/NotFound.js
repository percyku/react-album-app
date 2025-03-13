import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigae = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigae("/profile");
    }, 2000);
  }, navigae);

  return (
    <div className="container">
      <h1>這是不存在的頁面</h1>
    </div>
  );
};

export default NotFound;
