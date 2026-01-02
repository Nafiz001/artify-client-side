import { useContext, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";
import { 
  FiHome, 
  FiGrid, 
  FiHeart, 
  FiPlusCircle, 
  FiUser,
  FiMenu,
  FiX,
  FiLogOut,
  FiSettings
} from "react-icons/fi";

const DashboardLayout = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        signOutUser()
          .then(() => {
            Swal.fire({
              title: "Logged Out!",
              text: "You have been successfully logged out.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/");
          })
          .catch((error) => {
            Swal.fire({
              title: "Error!",
              text: error.message,
              icon: "error",
            });
          });
      }
    });
  };

  const menuItems = [
    { path: "/dashboard", icon: FiHome, label: "Dashboard Home" },
    { path: "/dashboard/add-artwork", icon: FiPlusCircle, label: "Add Artwork" },
    { path: "/dashboard/my-gallery", icon: FiGrid, label: "My Gallery" },
    { path: "/dashboard/my-favorites", icon: FiHeart, label: "My Favorites" },
    { path: "/dashboard/profile", icon: FiUser, label: "My Profile" },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Top Navbar */}
      <div className="navbar bg-base-200 shadow-lg px-4 sticky top-0 z-50">
        <div className="flex-1">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="btn btn-ghost btn-circle lg:hidden"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
          <Link to="/" className="text-xl font-bold ml-2">
            <span className="text-primary">Artisan's</span>
            <span className="text-secondary ml-1">Echo</span>
          </Link>
        </div>

        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring-2 ring-primary ring-offset-2">
                <img
                  alt={user?.displayName || "User"}
                  src={user?.photoURL || "https://i.ibb.co/7J4HzsG/default-avatar.png"}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-10 p-4 shadow-lg bg-base-100 rounded-lg w-52 border border-base-300"
            >
              <li className="menu-title">
                <span className="text-base-content font-semibold">
                  {user?.displayName || "User"}
                </span>
              </li>
              <li className="text-base-content/70 text-sm px-4 py-2">
                {user?.email}
              </li>
              <div className="divider my-1"></div>
              <li>
                <Link to="/dashboard/profile" className="flex items-center gap-2">
                  <FiUser /> Profile
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="flex items-center gap-2">
                  <FiHome /> Dashboard
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center gap-2">
                  <FiSettings /> Back to Home
                </Link>
              </li>
              <div className="divider my-1"></div>
              <li>
                <button
                  onClick={handleSignOut}
                  className="text-error hover:bg-error/10 transition-colors flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[64px] left-0 h-[calc(100vh-64px)] 
            bg-base-200 w-64 shadow-xl z-40 transition-transform duration-300
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 text-base-content px-4">
              Dashboard Menu
            </h2>
            <ul className="menu menu-vertical space-y-2">
              {menuItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-primary-content font-semibold"
                          : "text-base-content hover:bg-primary/10 hover:text-primary"
                      }`
                    }
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-8 min-h-[calc(100vh-64px)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
