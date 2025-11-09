import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://i.ibb.co/k5pZYvc/hero1.jpg",
      title: "Discover Extraordinary Art",
      subtitle: "Explore unique artworks from talented artists worldwide",
    },
    {
      image: "https://i.ibb.co/2MYdXqZ/hero2.jpg",
      title: "Your Creative Journey Starts Here",
      subtitle: "Connect with artists and find pieces that speak to your soul",
    },
    {
      image: "https://i.ibb.co/TKq8N3m/hero3.jpg",
      title: "Original Art for Every Space",
      subtitle: "Transform your home with authentic artistic expression",
    },
  ];

  useEffect(() => {
    // Auto-slide every 5 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/latest-artworks`)
      .then((res) => res.json())
      .then((data) => {
        setFeaturedArtworks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = [
    { name: "Paintings", icon: "🎨", count: "2,500+" },
    { name: "Photography", icon: "📷", count: "1,800+" },
    { name: "Sculpture", icon: "🗿", count: "850+" },
    { name: "Digital Art", icon: "💻", count: "1,200+" },
    { name: "Mixed Media", icon: "🖌️", count: "950+" },
    { name: "Drawings", icon: "✏️", count: "1,500+" },
  ];

  const topArtists = [
    {
      name: "Emma Richardson",
      image: "https://i.ibb.co/9nLD7Zq/artist1.jpg",
      artworks: 45,
      country: "USA",
    },
    {
      name: "Marco Rossi",
      image: "https://i.ibb.co/QDH9kZS/artist2.jpg",
      artworks: 38,
      country: "Italy",
    },
    {
      name: "Yuki Tanaka",
      image: "https://i.ibb.co/QNxF9MH/artist3.jpg",
      artworks: 52,
      country: "Japan",
    },
    {
      name: "Sophie Laurent",
      image: "https://i.ibb.co/MGxzqJY/artist4.jpg",
      artworks: 41,
      country: "France",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Slider Section */}
      <div className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})`,
              }}
            >
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-white px-4 max-w-4xl">
                  <Fade cascade damping={0.1}>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                    <Link
                      to="/explore"
                      className="btn btn-secondary btn-lg text-white"
                    >
                      Explore Artworks
                    </Link>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slider Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Typewriter Section */}
      <div className="bg-base-200 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            <Typewriter
              words={[
                "Discover Unique Artworks",
                "Support Emerging Artists",
                "Transform Your Space",
                "Collect Original Art",
              ]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
          <p className="text-lg text-gray-600">
            Join thousands of art lovers in celebrating creativity
          </p>
        </div>
      </div>

      {/* Featured Artworks Section */}
      <section className="py-16 container mx-auto px-4">
        <Slide direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Artworks</h2>
            <p className="text-lg text-gray-600">
              Discover the latest additions to our collection
            </p>
          </div>
        </Slide>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="loading-spinner"></div>
          </div>
        ) : featuredArtworks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredArtworks.map((artwork, index) => (
              <Fade key={artwork._id} delay={index * 100}>
                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <figure className="h-64 overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </figure>
                  <div className="card-body">
                    <h3 className="card-title text-xl">{artwork.title}</h3>
                    <p className="text-sm text-gray-600">
                      by {artwork.artistName}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="badge badge-outline">{artwork.category}</span>
                      <span className="text-sm text-gray-500">
                        ❤️ {artwork.likes || 0}
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
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              No artworks available yet
            </p>
            <Link to="/add-artwork" className="btn btn-primary">
              Add First Artwork
            </Link>
          </div>
        )}
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <Slide direction="up">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Browse by Category</h2>
              <p className="text-lg text-gray-600">
                Find art that matches your style
              </p>
            </div>
          </Slide>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Fade key={index} delay={index * 100}>
                <Link
                  to={`/explore?category=${category.name}`}
                  className="card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  data-tooltip-id={`category-${index}`}
                  data-tooltip-content={`Explore ${category.count} ${category.name}`}
                >
                  <div className="card-body items-center text-center p-6">
                    <div className="text-5xl mb-3">{category.icon}</div>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.count}</p>
                  </div>
                </Link>
                <Tooltip id={`category-${index}`} place="top" />
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Top Artists Section */}
      <section className="py-16 container mx-auto px-4">
        <Slide direction="up">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Top Artists This Week</h2>
            <p className="text-lg text-gray-600">
              Meet the talented creators behind stunning artworks
            </p>
          </div>
        </Slide>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {topArtists.map((artist, index) => (
            <Fade key={index} delay={index * 100}>
              <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                <figure className="pt-8">
                  <div className="avatar">
                    <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={artist.image} alt={artist.name} />
                    </div>
                  </div>
                </figure>
                <div className="card-body items-center text-center">
                  <h3 className="card-title">{artist.name}</h3>
                  <p className="text-sm text-gray-600">
                    📍 {artist.country}
                  </p>
                  <div className="stat-value text-2xl text-secondary mt-2">
                    {artist.artworks}
                  </div>
                  <p className="text-sm">Artworks</p>
                  <button className="btn btn-outline btn-sm mt-4">
                    View Gallery
                  </button>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-linear-to-r from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <Fade cascade>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Art Journey?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join our community of artists and art lovers. Share your work or
              discover pieces that inspire you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-lg bg-white text-primary">
                Join Now
              </Link>
              <Link to="/explore" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary">
                Browse Gallery
              </Link>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
};

export default Home;
