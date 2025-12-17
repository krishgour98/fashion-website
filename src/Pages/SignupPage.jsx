import { useState } from "react";

export default function App() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setForm({ name: "", email: "", password: "" });
    setErrorMsg("");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    const url = isLogin
      ? "http://localhost:5000/api/users/login"
      : "http://localhost:5000/api/users/signup";

    setLoading(true);
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        setErrorMsg(data.message || "Something went wrong.");
      } else {
        alert(data.message);
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
      }
    } catch (error) {
      setLoading(false);
      setErrorMsg("Server error. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#dbeafe] to-[#e0e7ff] flex items-center justify-center px-4">
      <div className="bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/40 transition-all duration-300">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center tracking-wide">
          {isLogin ? "Welcome Back 👋" : "Create Account"}
        </h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-md bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Your name"
                required/>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="you@example.com"
              required/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md bg-white/60 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="••••••••"
              required />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm mb-4 text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md mt-4 transition-all ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`} >
            {loading ? "Please wait..." : isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-gray-700 text-sm mt-4 text-center">
          {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
          <button
            onClick={toggleForm}
            className="text-indigo-600 underline font-medium focus:outline-none" >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}