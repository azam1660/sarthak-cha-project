"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerDriver } from "@/utils/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    busCode: "",
    routeDetails: "",
    timing: "",
    coordinatorName: "",
    coordinatorEmail: "",
    driverMobile: "",
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerDriver({
        ...formData,
        role: "driver",
      });
      if (response.data.success) {
        alert("Registration successful!");
        router.push("/auth/login"); // Redirect to login page after successful registration
      } else {
        setError(response.data.error);
      }
    } catch (error) {
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <div>
      <h1>Driver Registration</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="busCode"
          placeholder="Bus Code"
          value={formData.busCode}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="routeDetails"
          placeholder="Route Details"
          value={formData.routeDetails}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="timing"
          placeholder="Bus Timing"
          value={formData.timing}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="coordinatorName"
          placeholder="Coordinator Name"
          value={formData.coordinatorName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="coordinatorEmail"
          placeholder="Coordinator Email"
          value={formData.coordinatorEmail}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="driverMobile"
          placeholder="Driver Mobile Number"
          value={formData.driverMobile}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
