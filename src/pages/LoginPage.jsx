import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../api/axiosConfig"

function LoginPage() {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {

    try {

      const res = await axios.post("/auth/login", {
        phoneNumber,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.userId)
      localStorage.setItem("role", res.data.role)

      navigate("/")

    } catch (err) {

      const status = err.response?.status

      // User not registered
      if (status === 404 || status === 403) {

        console.log("User not found → redirecting to register")

        navigate("/register", {
          state: { phoneNumber }
        })

        return
      }

      // Wrong password
      if (status === 401) {
        alert("Invalid password")
        return
      }

      console.error(err)
      alert("Login failed")

    }
  }

  return (

    <div className="flex justify-center items-center h-screen bg-gray-100">

      <div className="bg-white shadow-md p-8 rounded w-80">

        <h2 className="text-xl font-bold mb-4">
          Login
        </h2>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-green-600 text-white w-full p-2 rounded"
        >
          Login
        </button>

      </div>

    </div>

  )
}

export default LoginPage