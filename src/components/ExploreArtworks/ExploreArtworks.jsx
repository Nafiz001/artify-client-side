import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/all-artworks`)
      .then((res) => res.json())
      .then((data) => {
        setArtworks(data);
        setFilteredArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = artworks;

    // Filter by category
    if (selectedCategory !== "All") {
      filtered = filtered.filter(
        (artwork) => artwork.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (artwork) =>
          artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArtworks(filtered);
  }, [searchTerm, selectedCategory, artworks]);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search is handled by useEffect
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <Fade>
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Explore Artworks</h1>
            <p className="text-xl text-gray-600">
              Discover amazing artworks from talented artists around the world
            </p>
          </div>
        </Fade>

        {/* Search and Filter Section */}
        <div className="bg-base-200 p-6 rounded-lg shadow-lg mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search */}
            <form onSubmit={handleSearch} className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Search by title or artist
                </span>
              </label>
              <div className="input-group flex gap-2 items-center justify-center">
                <input
                  type="text"
                  placeholder="Search artworks..."
                  className="input input-bordered w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-square btn-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </form>

            {/* Category Filter */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Filter by category
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <div className="badge badge-lg badge-primary gap-2">
                Search: "{searchTerm}"
                <button
                  onClick={() => setSearchTerm("")}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            )}
            {selectedCategory !== "All" && (
              <div className="badge badge-lg badge-secondary gap-2">
                Category: {selectedCategory}
                <button
                  onClick={() => setSelectedCategory("All")}
                  className="btn btn-ghost btn-xs"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-lg font-semibold">
            Found {filteredArtworks.length} artwork
            {filteredArtworks.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Artworks Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : filteredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredArtworks.map((artwork, index) => (
              <Fade key={artwork._id} delay={index * 50}>
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <figure className="h-64 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </figure>
                  <div className="card-body p-4">
                    <h3 className="card-title text-lg">{artwork.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
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
                      <span className="text-sm flex items-center gap-1">
                        ❤️ {artwork.likes || 0}
                      </span>
                    </div>
                    {artwork.price && (
                      <div className="mt-2">
                        <p className="text-xl font-bold text-primary">
                          ${artwork.price.toFixed(2)}
                        </p>
                      </div>
                    )}
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
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-2">No artworks found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="btn btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExploreArtworks;
