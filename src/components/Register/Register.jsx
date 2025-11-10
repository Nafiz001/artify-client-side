import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasMinLength) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    setError("");
    setLoading(true);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      Swal.fire({
        title: "Invalid Password!",
        text: passwordError,
        icon: "error",
      });
      setLoading(false);
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile({ displayName: name, photoURL: photoURL })
          .then(() => {
            const userData = {
              name: name,
              email: email,
              photoURL: photoURL,
            };

            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            Swal.fire({
              title: "Welcome to Artisan's Echo!",
              text: "Your account has been created successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((error) => {
            setError(error.message);
          });
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Registration Failed",
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
          photoURL: result.user.photoURL,
        };

        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        Swal.fire({
          title: "Welcome to Artisan's Echo!",
          text: "Your account has been created successfully.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((error) => {
        setError(error.message);
        Swal.fire({
          title: "Registration Failed",
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-100 via-white to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-gray-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Our Community</h2>
          <p className="text-gray-600">Create your account to start your artistic journey</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6 rounded-lg">
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-white/90 text-gray-800 placeholder-gray-400 border-2 focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Email Address</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered w-full bg-white/90 text-gray-800 placeholder-gray-400 border-2 focus:border-primary"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Profile Photo URL</span>
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="Enter your photo URL"
              className="input input-bordered w-full bg-white/90 text-gray-800 placeholder-gray-400 border-2 focus:border-primary"
              required
            />
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500">
                A profile picture helps others recognize you
              </span>
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-gray-700 font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
                className="input input-bordered w-full bg-white/90 text-gray-800 placeholder-gray-400 border-2 focus:border-primary pr-12"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
              >
                {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            <label className="label">
              <span className="label-text-alt text-xs text-gray-500">
                Must contain uppercase, lowercase, and minimum 6 characters
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full text-white font-medium tracking-wide transition-all duration-300"
          >
            {loading ? <span className="loading loading-spinner"></span> : 'Create Account'}
          </button>
        </form>

        <div className="divider text-gray-500">OR</div>

        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="btn btn-outline w-full text-gray-700 border-gray-300 hover:bg-gray-50 transition-all duration-300"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary hover:text-secondary transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
