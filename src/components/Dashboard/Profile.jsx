import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";
import { FiEdit2, FiSave, FiX, FiUser, FiMail, FiCamera } from "react-icons/fi";

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        displayName: "",
        photoURL: "",
        bio: "",
        location: "",
        website: "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                displayName: user.displayName || "",
                photoURL: user.photoURL || "",
                bio: user.bio || "",
                location: user.location || "",
                website: user.website || "",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update Firebase profile
            await updateUserProfile({
                displayName: formData.displayName,
                photoURL: formData.photoURL,
            });

            // Here you would also update additional fields in your backend database
            // await fetch(`${import.meta.env.VITE_API_URL}/update-profile`, {
            //   method: 'PUT',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email: user.email, ...formData })
            // });

            Swal.fire({
                title: "Success!",
                text: "Profile updated successfully",
                icon: "success",
                timer: 2000,
                showConfirmButton: false,
            });

            setIsEditing(false);
        } catch (error) {
            Swal.fire({
                title: "Error!",
                text: error.message,
                icon: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            displayName: user.displayName || "",
            photoURL: user.photoURL || "",
            bio: user.bio || "",
            location: user.location || "",
            website: user.website || "",
        });
        setIsEditing(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <Fade>
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-base-content mb-2">My Profile</h1>
                    <p className="text-base-content/70">Manage your personal information</p>
                </div>
            </Fade>

            <Fade delay={200}>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        {/* Profile Header */}
                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 pb-8 border-b border-base-300">
                            <div className="relative">
                                <div className="avatar">
                                    <div className="w-32 h-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img
                                            src={formData.photoURL || "https://i.ibb.co/7J4HzsG/default-avatar.png"}
                                            alt={formData.displayName}
                                            className="object-cover"
                                        />
                                    </div>
                                </div>
                                {isEditing && (
                                    <div className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary-focus">
                                        <FiCamera className="text-white" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 text-center md:text-left">
                                <h2 className="text-2xl font-bold text-base-content mb-1">
                                    {formData.displayName || "Anonymous User"}
                                </h2>
                                <p className="text-base-content/70 flex items-center justify-center md:justify-start gap-2">
                                    <FiMail /> {user?.email}
                                </p>
                                <div className="mt-4">
                                    {!isEditing ? (
                                        <button
                                            onClick={() => setIsEditing(true)}
                                            className="btn btn-primary btn-sm"
                                        >
                                            <FiEdit2 className="mr-2" /> Edit Profile
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSubmit}
                                                disabled={loading}
                                                className="btn btn-primary btn-sm"
                                            >
                                                {loading ? (
                                                    <span className="loading loading-spinner loading-sm"></span>
                                                ) : (
                                                    <>
                                                        <FiSave className="mr-2" /> Save Changes
                                                    </>
                                                )}
                                            </button>
                                            <button
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="btn btn-ghost btn-sm"
                                            >
                                                <FiX className="mr-2" /> Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Profile Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Display Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Display Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="input input-bordered w-full"
                                        placeholder="Your name"
                                    />
                                </div>

                                {/* Email (Read-only) */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Email Address</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={user?.email || ""}
                                        disabled
                                        className="input input-bordered w-full bg-base-200"
                                    />
                                </div>

                                {/* Photo URL */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Photo URL</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="photoURL"
                                        value={formData.photoURL}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="input input-bordered w-full"
                                        placeholder="https://example.com/photo.jpg"
                                    />
                                </div>

                                {/* Bio */}
                                <div className="form-control md:col-span-2">
                                    <label className="label">
                                        <span className="label-text font-semibold">Bio</span>
                                    </label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="textarea textarea-bordered h-24"
                                        placeholder="Tell us about yourself..."
                                    ></textarea>
                                </div>

                                {/* Location */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Location</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="location"
                                        value={formData.location}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="input input-bordered w-full"
                                        placeholder="City, Country"
                                    />
                                </div>

                                {/* Website */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-semibold">Website</span>
                                    </label>
                                    <input
                                        type="url"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        className="input input-bordered w-full"
                                        placeholder="https://yourwebsite.com"
                                    />
                                </div>
                            </div>
                        </form>

                        {/* Account Information */}
                        <div className="mt-8 pt-8 border-t border-base-300">
                            <h3 className="text-xl font-semibold text-base-content mb-4">
                                Account Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 bg-base-200 rounded-lg">
                                    <p className="text-sm text-base-content/60 mb-1">Account Created</p>
                                    <p className="font-semibold text-base-content">
                                        {user?.metadata?.creationTime
                                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="p-4 bg-base-200 rounded-lg">
                                    <p className="text-sm text-base-content/60 mb-1">Last Sign In</p>
                                    <p className="font-semibold text-base-content">
                                        {user?.metadata?.lastSignInTime
                                            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                                            : "N/A"}
                                    </p>
                                </div>
                                <div className="p-4 bg-base-200 rounded-lg">
                                    <p className="text-sm text-base-content/60 mb-1">Email Verified</p>
                                    <p className="font-semibold text-base-content">
                                        {user?.emailVerified ? (
                                            <span className="badge badge-success">Verified</span>
                                        ) : (
                                            <span className="badge badge-warning">Not Verified</span>
                                        )}
                                    </p>
                                </div>
                                <div className="p-4 bg-base-200 rounded-lg">
                                    <p className="text-sm text-base-content/60 mb-1">Provider</p>
                                    <p className="font-semibold text-base-content">
                                        {user?.providerData?.[0]?.providerId === "google.com"
                                            ? "Google"
                                            : "Email/Password"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default Profile;
