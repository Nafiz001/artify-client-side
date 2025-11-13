import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";

const ArtistProfile = () => {
  const { email } = useParams();
  const [artist, setArtist] = useState(null);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    if (email) {
      // Fetch artist's artworks
      fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-artworks/${email}`)
        .then((res) => res.json())
        .then((data) => {
          setArtworks(data);
          if (data.length > 0) {
            // Set artist info from first artwork
            setArtist({
              name: data[0].artistName,
              email: data[0].artistEmail,
              photo: data[0].artistPhoto,
              totalArtworks: data.length,
              totalLikes: data.reduce((sum, artwork) => sum + (artwork.likes || 0), 0),
            });
          }
          // Simulate followers count (since we don't have followers in DB)
          setFollowersCount(Math.floor(Math.random() * 500) + 50);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [email]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-base-content mb-4">Artist Not Found</h2>
          <p className="text-base-content/70 mb-6">This artist doesn't have any artworks yet.</p>
          <Link to="/explore" className="btn btn-primary">
            Explore Artworks
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Artist Header */}
        <Fade>
          <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Artist Photo */}
              <div className="avatar">
                <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-4">
                  <img
                    src={artist.photo || "https://i.ibb.co/7J4HzsG/default-avatar.png"}
                    alt={artist.name}
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Artist Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-4xl font-bold text-base-content mb-2">
                  {artist.name}
                </h1>
                <p className="text-base-content/70 mb-4">{artist.email}</p>

                {/* Stats */}
                <div className="flex flex-wrap gap-6 justify-center md:justify-start">
                  <div className="stats shadow bg-base-100">
                    <div className="stat place-items-center">
                      <div className="stat-title">Artworks</div>
                      <div className="stat-value text-primary">{artist.totalArtworks}</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Total Likes</div>
                      <div className="stat-value text-secondary">{artist.totalLikes}</div>
                    </div>
                    <div className="stat place-items-center">
                      <div className="stat-title">Followers</div>
                      <div className="stat-value text-accent">{followersCount}</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div className="mt-6 bg-base-100 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-base-content mb-3">About the Artist</h3>
                  <p className="text-base-content/70 leading-relaxed">
                    {artist.name} is a passionate artist who loves to create and share beautiful artworks. 
                    With {artist.totalArtworks} stunning pieces in their collection, they continue to inspire 
                    and captivate art enthusiasts worldwide. Their work has garnered {artist.totalLikes} likes 
                    from the community, showcasing the appreciation for their unique artistic vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Artist's Artworks */}
        <div className="mb-12">
          <Fade>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-base-content">
                Gallery Collection
              </h2>
              <div className="badge badge-primary badge-lg">
                {artworks.length} Artworks
              </div>
            </div>
          </Fade>

          {artworks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base-content/70 text-lg">
                No artworks to display yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {artworks.map((artwork, index) => (
                <Fade key={artwork._id} delay={index * 100}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <figure className="relative overflow-hidden h-64">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </figure>
                    <div className="card-body">
                      <h3 className="card-title text-base-content group-hover:text-primary transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-base-content/60 text-sm">{artwork.category}</p>
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
                          className="btn btn-primary btn-sm"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistProfile;
