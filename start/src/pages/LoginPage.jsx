import { useState } from "react";
import { auth } from "../configs/firebase";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    console.log(email, password);
    try {
      const userLoggedIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userLoggedIn);
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to login: " + error.massage);
    }
  }

  return (
    <div className="w-full bg-white flex flex-col md:flex-row overflow-hidden">
      {/* Left Side (Image atau Banner) */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <img
          src="https://diorama.dam-broadcast.com/cdn-cgi/image/width=640,format=auto/pm_11872_1107_1107393-gp3uwu9pt6-whr.jpg"
          alt="Fashion"
          className="w-full h-44 md:h-[600px] object-cover rounded-[20px]"
        />
      </div>

      {/* Right Side (Form login and register) */}
      <div className="w-full md:w-1/2 px-6 md:px-16 py-6 flex flex-col justify-start items-center gap-6">
        {/* Header */}
        <div className="w-full flex flex-col gap-4">
          <div className="text-2xl md:text-4xl font-semibold text-gray-900">
            Sign In
          </div>
          <p className="text-base md:text-lg text-slate-700 leading-normal tracking-tight">
            Today is a new day. It's your day. You shape it. <br />
            Sign in to start managing your projects.
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          action=""
          className="w-full flex flex-col gap-4"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Email</label>
            <input
              type="email"
              value={email}
              placeholder="example@mail.com"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-10 px-3 bg-slate-100 rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-900">Password</label>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-10 px-3 bg-slate-100 rounded-lg outline-gray-300 text-sm placeholder-gray-400 placeholder:text-sm placeholder:italic"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-800 text-white text-base py-3 rounded-xl"
          >
            Sign In
          </button>
        </form>

        <div className="w-full flex items-center gap-4">
          <hr className="flex-1 border-slate-300" />
          <span className="text-sm text-slate-700">Or sign in with</span>
          <hr className="flex-1 border-slate-300" />
        </div>

        <div className="w-full flex gap-4">
          <button className="flex-1 flex"></button>
        </div>
      </div>
    </div>
  );
}
