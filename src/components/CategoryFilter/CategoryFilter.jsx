import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const CategoryFilter = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  const categories = [
    "All",
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
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/all-artworks`)
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getArtworksByCategory = (category) => {
    if (category === "All") {
      return artworks;
    }
    return artworks.filter((artwork) => artwork.category === category);
  };

  const filteredArtworks = getArtworksByCategory(activeTab);

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <Fade>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-base-content mb-4">
              Browse by Category
            </h1>
            <p className="text-xl text-base-content/70">
              Explore artworks organized by their creative categories
            </p>
          </div>
        </Fade>

        {/* Category Tabs */}
        <div className="mb-12">
          <Fade>
            <div className="flex flex-wrap justify-center gap-2 bg-base-200 p-4 rounded-lg shadow-lg">
              {categories.map((category) => {
                const count = getArtworksByCategory(category).length;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveTab(category)}
                    className={`btn ${
                      activeTab === category
                        ? "btn-primary"
                        : "btn-ghost"
                    } gap-2 transition-all duration-300`}
                  >
                    {category}
                    <div className="badge badge-sm">
                      {count}
                    </div>
                  </button>
                );
              })}
            </div>
          </Fade>
        </div>

        {/* Artworks Grid */}
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : filteredArtworks.length === 0 ? (
          <div className="text-center py-20">
            <Fade>
              <div className="text-6xl mb-6">🎨</div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                No Artworks Found
              </h3>
              <p className="text-base-content/70 mb-6">
                There are no artworks in the "{activeTab}" category yet.
              </p>
              <Link to="/dashboard/add-artwork" className="btn btn-primary">
                Add First Artwork
              </Link>
            </Fade>
          </div>
        ) : (
          <>
            {/* Category Info Banner */}
            <div className="alert bg-linear-to-r from-primary/20 to-secondary/20 mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div>
                <h3 className="font-bold text-base-content">
                  {activeTab === "All" ? "All Categories" : activeTab}
                </h3>
                <div className="text-sm text-base-content/70">
                  Showing {filteredArtworks.length} artwork{filteredArtworks.length !== 1 ? "s" : ""}{" "}
                  {activeTab !== "All" && `in ${activeTab} category`}
                </div>
              </div>
            </div>

            {/* Artworks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtworks.map((artwork, index) => (
                <Fade key={artwork._id} delay={index * 50} cascade>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group h-full">
                    <figure className="relative overflow-hidden h-64">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 right-4">
                        <div className="badge badge-primary badge-lg">
                          {artwork.category}
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-base-content group-hover:text-primary transition-colors line-clamp-2">
                        {artwork.title}
                      </h3>
                      <p className="text-base-content/60 text-sm flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {artwork.artistName}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-error"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span className="text-base-content/70 text-sm">
                          {artwork.likes || 0} likes
                        </span>
                      </div>
                      <div className="card-actions justify-end mt-4">
                        <Link
                          to={`/artwork/${artwork._id}`}
                          className="btn btn-primary btn-sm w-full"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryFilter;
