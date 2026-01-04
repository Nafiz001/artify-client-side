import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const ExploreArtworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

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

    // Filter by price range
    filtered = filtered.filter(
      (artwork) => {
        const price = artwork.price || 0;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );

    // Apply sorting
    if (sortBy === "newest") {
      filtered = [...filtered].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "priceLow") {
      filtered = [...filtered].sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "priceHigh") {
      filtered = [...filtered].sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (sortBy === "popular") {
      filtered = [...filtered].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    }

    setFilteredArtworks(filtered);
  }, [searchTerm, selectedCategory, artworks, sortBy, priceRange]);

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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

            {/* Sort By */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">
                  Sort by
                </span>
              </label>
              <select
                className="select select-bordered w-full"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="popular">Most Popular</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mt-6">
            <label className="label">
              <span className="label-text font-semibold">
                Price Range: ${priceRange[0]} - ${priceRange[1]}
              </span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[0]}
                onChange={(e) =>
                  setPriceRange([
                    parseInt(e.target.value),
                    priceRange[1],
                  ])
                }
                className="range range-primary flex-1"
              />
              <input
                type="range"
                min="0"
                max="10000"
                step="100"
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([
                    priceRange[0],
                    parseInt(e.target.value),
                  ])
                }
                className="range range-primary flex-1"
              />
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
            {(priceRange[0] !== 0 || priceRange[1] !== 10000) && (
              <div className="badge badge-lg badge-accent gap-2">
                Price: ${priceRange[0]} - ${priceRange[1]}
                <button
                  onClick={() => setPriceRange([0, 10000])}
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
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredArtworks
                .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                .map((artwork, index) => (
                  <Fade key={artwork._id} delay={index * 50}>
                    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                      <figure className="h-64 overflow-hidden flex-shrink-0">
                        <img
                          src={artwork.image}
                          alt={artwork.title}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </figure>
                      <div className="card-body p-4 flex flex-col flex-grow">
                        <h3 className="card-title text-lg line-clamp-2 flex-shrink-0">{artwork.title}</h3>
                        <div className="flex items-center gap-2 mt-1 flex-shrink-0">
                          <div className="avatar">
                            <div className="w-8 rounded-full flex-shrink-0">
                              <img
                                src={
                                  artwork.artistPhoto ||
                                  "https://i.ibb.co/7J4HzsG/default-avatar.png"
                                }
                                alt={artwork.artistName}
                              />
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-1">
                            {artwork.artistName}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 flex-shrink-0">
                          <span className="badge badge-outline text-xs">
                            {artwork.category}
                          </span>
                          <span className="text-sm flex items-center gap-1">
                            ❤️ {artwork.likes || 0}
                          </span>
                        </div>
                        <div className="flex-grow"></div>
                        {artwork.price && (
                          <div className="mt-3 flex-shrink-0">
                            <p className="text-xl font-bold text-primary">
                              ${artwork.price.toFixed(2)}
                            </p>
                          </div>
                        )}
                        {!artwork.price && (
                          <div className="mt-3"></div>
                        )}
                        <div className="card-actions justify-end mt-2 flex-shrink-0">
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

            {/* Pagination Controls */}
            {Math.ceil(filteredArtworks.length / itemsPerPage) > 1 && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="btn btn-outline"
                >
                  ← Previous
                </button>
                
                <div className="flex gap-2 flex-wrap justify-center">
                  {Array.from(
                    { length: Math.ceil(filteredArtworks.length / itemsPerPage) },
                    (_, i) => i + 1
                  ).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`btn ${
                        currentPage === page
                          ? "btn-primary"
                          : "btn-outline"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        Math.ceil(filteredArtworks.length / itemsPerPage),
                        currentPage + 1
                      )
                    )
                  }
                  disabled={
                    currentPage ===
                    Math.ceil(filteredArtworks.length / itemsPerPage)
                  }
                  className="btn btn-outline"
                >
                  Next →
                </button>
              </div>
            )}
          </>
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
                setCurrentPage(1);
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
