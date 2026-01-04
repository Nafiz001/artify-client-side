import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { FiUser } from "react-icons/fi";

const Login = () => {
  const { signInUser, signInWithGoogle, signInWithFacebook } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");
    setLoading(true);

    signInUser(email, password)
      .then(() => {
        Swal.fire({
          title: "Welcome Back!",
          text: "You have successfully logged in.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = () => {
    setError("");
    setLoading(true);

    signInWithGoogle()
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        };

        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        Swal.fire({
          title: "Welcome!",
          text: "You have successfully logged in with Google.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleFacebookSignIn = () => {
    setError("");
    setLoading(true);

    signInWithFacebook()
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL
        };

        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        Swal.fire({
          title: "Welcome!",
          text: "You have successfully logged in with Facebook.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Login Failed",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDemoLogin = () => {
    // Auto-fill demo credentials
    document.querySelector('input[name="email"]').value = "demo@artify.com";
    document.querySelector('input[name="password"]').value = "Demo123";

    Swal.fire({
      title: "Demo Credentials Loaded",
      text: "Click 'Sign In' to login with demo account",
      icon: "info",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-base-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2">Welcome Back</h2>
          <p className="text-base-content/70">Sign in to your Artisan's Echo account</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6 rounded-lg">
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-base-content font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-base-200 text-base-content placeholder:text-base-content/40 border-2 focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full bg-base-200 text-base-content placeholder:text-base-content/40 border-2 focus:border-primary pr-14"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-base-content/60 hover:text-base-content transition-colors z-10"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-medium tracking-wide transition-all duration-300"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Sign In'}
          </button>
        </form>

        <div className="divider text-base-content/60">OR</div>

        {/* Demo Credentials Button */}
        <button
          onClick={handleDemoLogin}
          disabled={loading}
          className="btn btn-outline btn-info w-full mb-3 border-info hover:bg-info hover:text-white transition-all duration-300"
        >
          <FiUser size={20} />
          Use Demo Credentials
        </button>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full border-base-300 hover:bg-base-200 transition-all duration-300 mb-3"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <button
          onClick={handleFacebookSignIn}
          disabled={loading}
          className="btn btn-outline w-full text-primary border-primary hover:bg-primary hover:text-white transition-all duration-300"
        >
          <FaFacebook size={20} />
          Continue with Facebook
        </button>

        <div className="text-center mt-8">
          <p className="text-base-content/70">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary hover:text-secondary transition-colors"
            >
              Create one here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;