import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { IoEye, IoEyeOff } from "react-icons/io5";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showpassword, setShowPassword] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const userRegister = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userRegister);
      navigate("/");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, "-", errorMessage);
    }
  }

  return (
    <div className="w-full bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Side (Image atau Banner) */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Fashion"
          className="w-full h-full object-cover rounded-[20px]"
        />
      </div>

      {/* Right Side (Form login and register) */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-6 flex flex-col justify-center items-center gap-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl md:text-4xl font-semibold text-gray-900">
            Sign Up
          </div>
          <p className="text-base md:text-lg text-slate-700 leading-normal tracking-tight">
            Today is a new day. It's your day. You shape it. <br />
            Sign in to start managing your projects.
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          action=""
          className="w-full flex flex-col gap4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Email</label>
            <input
              type="text"
              value={email}
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-slate-100 rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Password</label>
            <div className="flex items-center w-full h-10 bg-slate-100 rounded-lg">
              <input
                type="password"
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 w-full h-10 px-3 bg-slate-100 outline-none rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic pr-10"
              />
              <div
                className={`cursor-pointer transition-opacity duration-300 pr-3 ${
                  password.length > 0
                    ? "opacity-100 text-gray-700"
                    : "opacity-50 text-gray-400"
                }`}
                onClick={() => setShowPassword(!showpassword)}
              >
                {showpassword ? <IoEye size={20} /> : <IoEyeOff size={20} />}
              </div>
            </div>
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
}
