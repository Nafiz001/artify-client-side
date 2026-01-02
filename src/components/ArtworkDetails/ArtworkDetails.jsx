import { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Swal from "sweetalert2";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

const ArtworkDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [artwork, setArtwork] = useState(null);
  const [artistArtworks, setArtistArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artwork/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setArtwork(data);

        if (user?.email && data.likedBy && Array.isArray(data.likedBy)) {
          setHasLiked(data.likedBy.includes(user.email));
        }

        fetch(
          `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-artworks/${data.artistEmail}`
        )
          .then((res) => res.json())
          .then((artistData) => {
            const otherWorks = artistData.filter((art) => art._id !== id);
            setArtistArtworks(otherWorks.slice(0, 3));
            setLoading(false);
          });
      })
      .catch(() => setLoading(false));
  }, [id, user]);

  const handleLike = () => {
    if (hasLiked) {
      Swal.fire({
        title: "Already Liked!",
        text: "You've already liked this artwork.",
        icon: "info",
      });
      return;
    }

    fetch(
      `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artwork/${id}/like`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userEmail: user?.email || "anonymous",
          action: "like",
        }),
      }
    )
      .then((res) => res.json())
      .then(() => {
        fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/artwork/${id}`)
          .then((res) => res.json())
          .then((updatedArtwork) => {
            setArtwork(updatedArtwork);
            setHasLiked(true);
            Swal.fire({
              title: "Liked!",
              text: "You liked this artwork.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          });
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  const handleAddToFavorites = () => {
    const favoriteData = {
      userEmail: user.email,
      artworkId: id,
      addedAt: new Date().toISOString(),
    };

    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/favorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(favoriteData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Already in favorites") {
          Swal.fire({
            title: "Already Added!",
            text: "This artwork is already in your favorites.",
            icon: "info",
          });
        } else {
          Swal.fire({
            title: "Added to Favorites!",
            text: "This artwork has been added to your favorites.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
        });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4">Artwork not found</h2>
        <Link to="/explore" className="btn btn-primary">
          Browse Artworks
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="container mx-auto px-4 py-12">
        <Fade>
          <Link to="/explore" className="btn btn-ghost mb-6">
            ← Back to Explore
          </Link>
        </Fade>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <Slide direction="left">
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-auto object-cover"
              />
            </div>
          </Slide>

          <Slide direction="right">
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold mb-2">{artwork.title}</h1>
                <p className="text-xl text-gray-600">{artwork.category}</p>
              </div>

              <div className="flex items-center gap-4 p-4 bg-base-200 rounded-lg">
                <div className="avatar">
                  <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        artwork.artistPhoto ||
                        "https://i.ibb.co/7J4HzsG/default-avatar.png"
                      }
                      alt={artwork.artistName}
                    />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-lg">{artwork.artistName}</p>
                  <p className="text-sm text-gray-600">{artwork.artistEmail}</p>
                  <p className="text-sm mt-1">
                    {artistArtworks.length + 1} artworks in gallery
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-gray-700 leading-relaxed">
                    {artwork.description}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-1">Medium</h4>
                    <p className="text-gray-600">{artwork.medium}</p>
                  </div>
                  {artwork.dimensions && (
                    <div>
                      <h4 className="font-semibold mb-1">Dimensions</h4>
                      <p className="text-gray-600">{artwork.dimensions}</p>
                    </div>
                  )}
                </div>

                {artwork.price && (
                  <div className="p-4 bg-primary text-white rounded-lg">
                    <p className="text-sm">Price</p>
                    <p className="text-3xl font-bold">${artwork.price.toFixed(2)}</p>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <div className="badge badge-lg">
                    ❤️ {artwork.likes || 0} Likes
                  </div>
                  <div className="badge badge-lg badge-outline">
                    {artwork.visibility}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={handleLike}
                  className="btn btn-primary flex-1"
                  data-tooltip-id="like-tooltip"
                  data-tooltip-content={
                    hasLiked ? "Already liked" : "Show appreciation"
                  }
                  disabled={hasLiked}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill={hasLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  {hasLiked ? "Liked" : "Like"}
                </button>
                <Tooltip id="like-tooltip" />

                <button
                  onClick={handleAddToFavorites}
                  className="btn btn-secondary flex-1"
                  data-tooltip-id="favorite-tooltip"
                  data-tooltip-content="Save to your collection"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                    />
                  </svg>
                  Add to Favorites
                </button>
                <Tooltip id="favorite-tooltip" />
              </div>
            </div>
          </Slide>
        </div>

        {artistArtworks.length > 0 && (
          <div>
            <Fade>
              <h2 className="text-3xl font-bold mb-8">
                More from {artwork.artistName}
              </h2>
            </Fade>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artistArtworks.map((art, index) => (
                <Fade key={art._id} delay={index * 100}>
                  <Link
                    to={`/artwork/${art._id}`}
                    className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <figure className="h-48 overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                      />
                    </figure>
                    <div className="card-body p-4">
                      <h3 className="card-title text-lg">{art.title}</h3>
                      <p className="text-sm text-gray-600">{art.category}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm">❤️ {art.likes || 0}</span>
                        {art.price && (
                          <span className="font-bold text-primary">
                            ${art.price.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
