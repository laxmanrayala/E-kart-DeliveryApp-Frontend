import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axiosConfig";

function RegisterPage() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name.trim() || !phoneNumber.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    try {

      await axios.post("/auth/register", {
        name,
        phoneNumber,
        password
      });

      setSuccess("Registration successful! Please login.");
      setError("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration failed");
      } else {
        setError("Registration failed");
      }

    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "60px"
      }}
    >

      <form
        onSubmit={handleRegister}
        style={{
          width: "350px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          background: "#fff"
        }}
      >

        <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
          Register
        </h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        {success && (
          <p style={{ color: "green", marginBottom: "10px" }}>
            {success}
          </p>
        )}

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />

        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "15px",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#2f8f2f",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontWeight: "600",
            cursor: "pointer"
          }}
        >
          Register
        </button>

      </form>

    </div>
  );
}

export default RegisterPage;