import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const AddArtwork = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const artworkData = {
      image: form.image.value,
      title: form.title.value,
      category: form.category.value,
      medium: form.medium.value,
      description: form.description.value,
      dimensions: form.dimensions.value,
      price: form.price.value ? parseFloat(form.price.value) : null,
      visibility: form.visibility.value,
      artistName: user.displayName,
      artistEmail: user.email,
      artistPhoto: user.photoURL,
      likes: 0,
      createdAt: new Date().toISOString(),
    };

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artworks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(artworkData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Your artwork has been added successfully.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          form.reset();
          navigate("/my-gallery");
        }
      })
      .catch((error) => {
        setLoading(false);
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Fade>
          <div className="card bg-base-100 shadow-2xl">
            <div className="card-body">
              <h2 className="text-3xl font-bold text-center mb-6">
                Add New Artwork
              </h2>
              <p className="text-center text-gray-600 mb-8">
                Share your creative work with the world
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Image URL */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Image URL *</span>
                  </label>
                  <input
                    type="url"
                    name="image"
                    placeholder="https://example.com/artwork.jpg"
                    className="input input-bordered"
                    required
                  />
                  <label className="label">
                    <span className="label-text-alt text-gray-500">
                      Enter a direct link to your artwork image
                    </span>
                  </label>
                </div>

                {/* Title */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">Title *</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter artwork title"
                    className="input input-bordered"
                    required
                  />
                </div>

                {/* Category and Medium in row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Category *
                      </span>
                    </label>
                    <select
                      name="category"
                      className="select select-bordered"
                      required
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Medium/Tools *
                      </span>
                    </label>
                    <input
                      type="text"
                      name="medium"
                      placeholder="e.g., Oil on Canvas, Digital, Marble"
                      className="input input-bordered"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description *
                    </span>
                  </label>
                  <textarea
                    name="description"
                    placeholder="Describe your artwork, inspiration, and technique..."
                    className="textarea textarea-bordered h-32"
                    required
                  ></textarea>
                </div>

                {/* Dimensions and Price in row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Dimensions
                      </span>
                      <span className="label-text-alt text-gray-500">
                        Optional
                      </span>
                    </label>
                    <input
                      type="text"
                      name="dimensions"
                      placeholder='e.g., 24" x 36"'
                      className="input input-bordered"
                    />
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Price (USD)
                      </span>
                      <span className="label-text-alt text-gray-500">
                        Optional
                      </span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      className="input input-bordered"
                    />
                  </div>
                </div>

                {/* Visibility */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Visibility *
                    </span>
                  </label>
                  <select
                    name="visibility"
                    className="select select-bordered"
                    required
                  >
                    <option value="Public">Public - Visible to everyone</option>
                    <option value="Private">Private - Only visible to you</option>
                  </select>
                </div>

                {/* Artist Info (Read-only) */}
                <div className="bg-base-200 p-4 rounded-lg">
                  <h3 className="font-semibold mb-3">Artist Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Name</span>
                      </label>
                      <input
                        type="text"
                        value={user?.displayName || ""}
                        className="input input-bordered"
                        readOnly
                      />
                    </div>
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Your Email</span>
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="input input-bordered"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="form-control mt-8">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="loading loading-spinner"></span>
                    ) : (
                      "Add Artwork"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Fade>
      </div>
    </div>
  );
};

export default AddArtwork;
