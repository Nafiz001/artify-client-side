import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { HiEye, HiEyeOff } from "react-icons/hi";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, signInWithFacebook, signOutUser } = useContext(AuthContext);
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

    if (photoURL.length > 500) {
      setError("Photo URL is too long. Please use a shorter URL.");
      Swal.fire({
        title: "Invalid Photo URL!",
        text: "Photo URL is too long. Please use a shorter URL (max 500 characters).",
        icon: "error",
      });
      setLoading(false);
      return;
    }

    if (photoURL.startsWith('data:')) {
      setError("Please use a valid image URL, not a data URI.");
      Swal.fire({
        title: "Invalid Photo URL!",
        text: "Please use a direct image URL (e.g., from Imgur, Cloudinary) instead of a data URI.",
        icon: "error",
      });
      setLoading(false);
      return;
    }

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

            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userData),
            });

            signOutUser().then(() => {
              Swal.fire({
                title: "Welcome to Artisan's Echo!",
                text: "Your account has been created successfully. Please login to continue.",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
              });
              navigate("/login");
            });
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

        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users`, {
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

  const handleFacebookSignIn = () => {
    setError("");
    setLoading(true);

    signInWithFacebook()
      .then((result) => {
        const userData = {
          name: result.user.displayName,
          email: result.user.email,
          photoURL: result.user.photoURL,
        };

        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/users`, {
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
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-base-100 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-base-300">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-base-content mb-2">Join Our Community</h2>
          <p className="text-base-content/70">Create your account to start your artistic journey</p>
        </div>

        {error && (
          <div className="alert alert-error mb-6 rounded-lg">
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <div>
            <label className="label">
              <span className="label-text text-base-content font-medium">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered w-full bg-base-200 text-base-content placeholder:text-base-content/40 border-2 focus:border-primary"
              required
            />
          </div>

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
              <span className="label-text text-base-content font-medium">Profile Photo URL</span>
            </label>
            <input
              type="url"
              name="photoURL"
              placeholder="https://example.com/photo.jpg"
              className="input input-bordered w-full bg-base-200 text-base-content placeholder:text-base-content/40 border-2 focus:border-primary"
              required
              maxLength={500}
            />
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
                Use a direct image URL (e.g., from Imgur, Cloudinary). Max 500 characters.
              </span>
            </label>
          </div>

          <div>
            <label className="label">
              <span className="label-text text-base-content font-medium">Password</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a strong password"
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
            <label className="label">
              <span className="label-text-alt text-xs text-base-content/60">
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

        <div className="divider text-base-content/60">OR</div>

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
