import React, { useState } from "react";
import "./Login.css";
import login from "../assets/images/20.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [generatedOtp, setGeneratedOtp] = useState("");
  const navigate = useNavigate();

  const handleGenerateOtp = () => {
    if (!mobile || !role) {
      toast.error("Enter mobile & role first");
      return;
    }

    const randomOtp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(randomOtp);
    setOtp(randomOtp.split("")); // 🔥 auto fill 4 box
    alert("OTP : " + randomOtp);
  };

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // auto focus next
    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (!mobile || !role || enteredOtp.length < 4) {
      toast.error("All fields required");
      return;
    }

    if (enteredOtp !== generatedOtp) {
      toast.error("Invalid OTP ❌");
      return;
    }

    try {
      const res = await fetch(
        "https://696b49ac624d7ddccaa0b2d9.mockapi.io/users"
      );
      const users = await res.json();

      const existingUser = users.find(
        (u) => u.mobile === mobile && u.role === role
      );

      if (existingUser) {
        toast.success("Login successful ✅");
        localStorage.setItem("lognData", JSON.stringify(existingUser));
        navigate("/");
      } else {
        const response = await fetch(
          "https://696b49ac624d7ddccaa0b2d9.mockapi.io/users",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobile,
              role,
              otp: enteredOtp,
            }),
          }
        );

        const data = await response.json();
        toast.success("User created & logged in 🎉");
        localStorage.setItem("lognData", JSON.stringify(data));
        navigate("/");
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="login-container">
      <ToastContainer />

      <div className="login-left">
        <img src={login} alt="login" />
      </div>

      <div className="login-rigst">
        <h2>Hello Again</h2>

        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Mobile Number"
            className="input-field"
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <select
            className="input-field"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>

          <button type="button" className="btn primary" onClick={handleGenerateOtp}>
            Generate OTP
          </button>

          {/* 🔥 OTP BOXES */}
          <div className="otp-container">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength={1}
                className="otp-box"
                value={digit}
                onChange={(e) => handleOtpChange(e.target.value, index)}
              />
            ))}
          </div>

          <button type="submit" className="btn secondary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
