import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const MyGallery = () => {
  const { user } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingArtwork, setEditingArtwork] = useState(null);

  const categories = [
    "Paintings",
    "Photography",
    "Sculpture",
    "Digital Art",
    "Mixed Media",
    "Drawings",
    "Collage",
    "Printmaking",
  ];

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-artworks/${
          user.email
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setArtworks(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const fetchArtworks = () => {
    fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-artworks/${
        user.email
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleDelete = async (id, title) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${title}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const token = await user.getIdToken();

        const response = await fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artwork/${id}`,
          {
            method: "DELETE",
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to delete artwork');
        }

        await response.json();
        
        Swal.fire({
          title: "Deleted!",
          text: "Your artwork has been deleted.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchArtworks();
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      image: form.image.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value ? parseFloat(form.price.value) : null,
      visibility: form.visibility.value,
    };

    try {
      const token = await user.getIdToken();

      const response = await fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artwork/${
          editingArtwork._id
        }`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update artwork');
      }

      await response.json();
      
      Swal.fire({
        title: "Updated!",
        text: "Your artwork has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      setEditingArtwork(null);
      document.getElementById("edit_modal").close();
      fetchArtworks();
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
      });
    }
  };

  const openEditModal = (artwork) => {
    setEditingArtwork(artwork);
    document.getElementById("edit_modal").showModal();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="container mx-auto">
        <Fade>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">My Gallery</h1>
            <p className="text-xl text-gray-600">
              Manage your artworks and track their performance
            </p>
            <div className="mt-6">
              <Link to="/add-artwork" className="btn btn-primary btn-lg">
                + Add New Artwork
              </Link>
            </div>
          </div>
        </Fade>

        <div className="stats stats-vertical lg:stats-horizontal shadow w-full mb-12">
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Artworks</div>
            <div className="stat-value text-primary">{artworks.length}</div>
            <div className="stat-desc">Your creative collection</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-secondary">
              {artworks.reduce((sum, art) => sum + (art.likes || 0), 0)}
            </div>
            <div className="stat-desc">Appreciation received</div>
          </div>

          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-8 h-8 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
            </div>
            <div className="stat-title">Public Artworks</div>
            <div className="stat-value text-accent">
              {artworks.filter((art) => art.visibility === "Public").length}
            </div>
            <div className="stat-desc">Visible to everyone</div>
          </div>
        </div>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork, index) => (
              <Fade key={artwork._id} delay={index * 50}>
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                  <figure className="h-64 overflow-hidden relative">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="badge badge-lg bg-white text-black">
                        {artwork.visibility}
                      </div>
                    </div>
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title">{artwork.title}</h3>
                    <p className="text-sm text-gray-600">{artwork.category}</p>
                    <p className="text-sm line-clamp-2">{artwork.description}</p>
                    
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">❤️ {artwork.likes || 0} Likes</span>
                      {artwork.price && (
                        <span className="font-bold text-primary">
                          ${artwork.price.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <div className="card-actions justify-end mt-4 gap-2">
                      <Link
                        to={`/artwork/${artwork._id}`}
                        className="btn btn-sm btn-outline btn-primary"
                      >
                        View
                      </Link>
                      <button
                        onClick={() => openEditModal(artwork)}
                        className="btn btn-sm btn-outline btn-secondary"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(artwork._id, artwork.title)}
                        className="btn btn-sm btn-outline btn-error"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-2">No artworks yet</h3>
            <p className="text-gray-600 mb-6">
              Start building your gallery by adding your first artwork
            </p>
            <Link to="/add-artwork" className="btn btn-primary">
              Add Your First Artwork
            </Link>
          </div>
        )}
      </div>

      <dialog id="edit_modal" className="modal">
        <div className="modal-box max-w-2xl">
          <h3 className="font-bold text-2xl mb-6">Edit Artwork</h3>
          {editingArtwork && (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Image URL</span>
                </label>
                <input
                  type="url"
                  name="image"
                  defaultValue={editingArtwork.image}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  name="title"
                  defaultValue={editingArtwork.title}
                  className="input input-bordered"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Category</span>
                  </label>
                  <select
                    name="category"
                    defaultValue={editingArtwork.category}
                    className="select select-bordered"
                    required
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Medium/Tools</span>
                  </label>
                  <input
                    type="text"
                    name="medium"
                    defaultValue={editingArtwork.medium}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  name="description"
                  defaultValue={editingArtwork.description}
                  className="textarea textarea-bordered h-24"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dimensions</span>
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    defaultValue={editingArtwork.dimensions}
                    className="input input-bordered"
                  />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Price</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={editingArtwork.price}
                    min="0"
                    step="0.01"
                    className="input input-bordered"
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Visibility</span>
                </label>
                <select
                  name="visibility"
                  defaultValue={editingArtwork.visibility}
                  className="select select-bordered"
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Update Artwork
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("edit_modal").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default MyGallery;
