import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { Fade } from "react-awesome-reveal";

const MyFavorites = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/favorites/${
          user.email
        }`
      )
        .then((res) => res.json())
        .then((data) => {
          setFavorites(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user]);

  const fetchFavorites = () => {
    fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/favorites/${
        user.email
      }`
    )
      .then((res) => res.json())
      .then((data) => {
        setFavorites(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  const handleRemoveFavorite = (artworkId, title) => {
    Swal.fire({
      title: "Remove from favorites?",
      text: `Do you want to remove "${title}" from your favorites?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/favorites`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userEmail: user.email,
            artworkId: artworkId,
          }),
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire({
              title: "Removed!",
              text: "Artwork removed from your favorites.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            fetchFavorites();
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
        {/* Header */}
        <Fade>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">My Favorites</h1>
            <p className="text-xl text-gray-600">
              Your curated collection of inspiring artworks
            </p>
          </div>
        </Fade>

        {/* Stats */}
        <div className="stats shadow w-full mb-12">
          <div className="stat place-items-center">
            <div className="stat-title">Total Favorites</div>
            <div className="stat-value text-primary">{favorites.length}</div>
            <div className="stat-desc">Artworks you love</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Total Likes</div>
            <div className="stat-value text-secondary">
              {favorites.reduce((sum, art) => sum + (art.likes || 0), 0)}
            </div>
            <div className="stat-desc">Combined appreciation</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Categories</div>
            <div className="stat-value text-accent">
              {new Set(favorites.map((art) => art.category)).size}
            </div>
            <div className="stat-desc">Different styles</div>
          </div>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((artwork, index) => (
              <Fade key={artwork._id} delay={index * 50}>
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <figure className="h-64 overflow-hidden relative group">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2">
                      <div className="badge badge-error gap-2">
                        ❤️ Favorited
                      </div>
                    </div>
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg">{artwork.title}</h3>
                    
                    <div className="flex items-center gap-2 mt-2">
                      <div className="avatar">
                        <div className="w-8 rounded-full">
                          <img
                            src={
                              artwork.artistPhoto ||
                              "https://i.ibb.co/7J4HzsG/default-avatar.png"
                            }
                            alt={artwork.artistName}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        {artwork.artistName}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="badge badge-outline">
                        {artwork.category}
                      </span>
                      <span className="text-sm">
                        ❤️ {artwork.likes || 0}
                      </span>
                    </div>

                    {artwork.price && (
                      <div className="mt-2">
                        <p className="text-lg font-bold text-primary">
                          ${artwork.price.toFixed(2)}
                        </p>
                      </div>
                    )}

                    <div className="card-actions justify-between mt-4 gap-2">
                      <Link
                        to={`/artwork/${artwork._id}`}
                        className="btn btn-sm btn-primary flex-1"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() =>
                          handleRemoveFavorite(artwork._id, artwork.title)
                        }
                        className="btn btn-sm btn-outline btn-error"
                        title="Remove from favorites"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💝</div>
            <h3 className="text-2xl font-bold mb-2">No favorites yet</h3>
            <p className="text-gray-600 mb-6">
              Start building your collection by adding artworks you love
            </p>
            <Link to="/explore" className="btn btn-primary">
              Explore Artworks
            </Link>
          </div>
        )}

        {/* Category Breakdown */}
        {favorites.length > 0 && (
          <div className="mt-16">
            <Fade>
              <h2 className="text-3xl font-bold mb-8 text-center">
                Your Favorite Categories
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from(
                  new Set(favorites.map((art) => art.category))
                ).map((category) => {
                  const count = favorites.filter(
                    (art) => art.category === category
                  ).length;
                  return (
                    <div
                      key={category}
                      className="card bg-base-200 shadow-lg p-6 text-center"
                    >
                      <h3 className="font-bold text-lg">{category}</h3>
                      <p className="text-3xl font-bold text-primary mt-2">
                        {count}
                      </p>
                      <p className="text-sm text-gray-600">
                        {count === 1 ? "artwork" : "artworks"}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Fade>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyFavorites;
