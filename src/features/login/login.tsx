import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../login/loginAPI";
import { Eye, EyeOff } from "lucide-react";
import { jwtDecode as jwt_decode, JwtPayload } from "jwt-decode";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

interface CustomJwtPayload extends JwtPayload {
  role: string;
}

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt_decode<CustomJwtPayload>(token);
      const role = decodedToken.role;

      if (role === "admin") {
        navigate("/admin");
      } else if (role === "customer") {
        navigate("/customer/dashboard");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await loginUser({ username, password }).unwrap();
      console.log("Login response:", response);

      // Store the token in local storage
      localStorage.setItem("token", response.access_token);

      // Decode the token to get the role
      const decodedToken = jwt_decode<CustomJwtPayload>(response.access_token);
      const role = decodedToken.role;

      // Store the role in local storage
      localStorage.setItem("role", role);

      // Navigate based on the role
      if (role === "admin") {
        navigate("/admin");
      } else if (role === "customer") {
        navigate("/customer/dashboard");
      } else {
        setErrorMessage("Unexpected role value.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("Invalid credentials, please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          {errorMessage && (
            <div className="text-red-500 text-center">{errorMessage}</div>
          )}
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Email"
                />
              </div>
              <div className="relative">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="Password"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
