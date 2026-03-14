import { useState } from "react"
import axios from "../../api/axiosConfig"

function LoginModal({ onClose }) {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [isRegister, setIsRegister] = useState(false)

  const handleLogin = async () => {

    try {

      const res = await axios.post("/auth/login", {
        phoneNumber,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.userId)
      localStorage.setItem("role", res.data.role)

      window.location.reload()

    } catch (err) {

      const status = err.response?.status

      // user not found → switch to register mode and clear form
      if (status === 404 || status === 403) {

        setIsRegister(true)

        setName("")
        setPhoneNumber("")
        setPassword("")

        return
      }

      if (status === 401) {
        alert("Invalid password")
        return
      }

      alert("Login failed")

    }

  }

  const handleRegister = async () => {

    try {

      const res = await axios.post("/auth/register", {
        name,
        phoneNumber,
        password
      })

      localStorage.setItem("token", res.data.token)
      localStorage.setItem("userId", res.data.userId)
      localStorage.setItem("role", res.data.role)

      window.location.reload()

    } catch {

      alert("Registration failed")

    }

  }

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-8 relative">

        {/* BACK BUTTON */}

        <button
          onClick={onClose}
          className="absolute left-5 top-5 text-gray-500 hover:text-black"
        >
          ←
        </button>

        {/* LOGO */}

        <div className="flex justify-center mb-5">

          <div className="bg-yellow-400 w-14 h-14 rounded-xl flex items-center justify-center font-bold text-black text-lg">
            EK
          </div>

        </div>

        {/* TITLE */}

        <h2 className="text-center text-xl font-semibold text-gray-900">
          India's last minute app
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {isRegister ? "Create your account" : "Log in or Sign up"}
        </p>

        {/* NAME FIELD */}

        {isRegister && (

          <input
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 text-black"
            placeholder="Name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
          />

        )}

        {/* PHONE INPUT */}

        <div className="flex border border-gray-300 rounded-lg overflow-hidden mb-3">

          <div className="px-3 flex items-center text-gray-600">
            +91
          </div>

          <input
            className="flex-1 p-3 outline-none text-black"
            placeholder="Enter mobile number"
            value={phoneNumber}
            maxLength={10}
            onChange={(e)=>setPhoneNumber(e.target.value)}
          />

        </div>

        {/* PASSWORD */}

        <input
          type="password"
          className="w-full border border-gray-300 rounded-lg p-3 mb-5 text-black"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        {/* BUTTON */}

        {!isRegister && (

          <button
            onClick={handleLogin}
            className="w-full bg-gray-400 text-white p-3 rounded-lg font-semibold hover:bg-gray-500 transition"
          >
            Continue
          </button>

        )}

        {isRegister && (

          <button
            onClick={handleRegister}
            className="w-full bg-green-600 text-white p-3 rounded-lg font-semibold hover:bg-green-700 transition"
          >
            Register
          </button>

        )}

        {/* TERMS */}

        <p className="text-xs text-gray-400 text-center mt-5">
          By continuing, you agree to our Terms of Service & Privacy Policy
        </p>

      </div>

    </div>

  )

}

export default LoginModal