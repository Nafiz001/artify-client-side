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
      image: "https://i.ibb.co/7QMH9gD/hero-art1.jpg",
      title: "Make Your Space a Gift",
      subtitle: "Discover original art from emerging and established artists",
      cta: "Shop Original Art"
    },
    {
      image: "https://i.ibb.co/2MYdXqZ/hero2.jpg", 
      title: "The Joy of Living with Original Art",
      subtitle: "Experience authentic creativity in your daily life",
      cta: "Explore Collections"
    },
    {
      image: "https://i.ibb.co/TKq8N3m/hero3.jpg",
      title: "Curated Collections",
      subtitle: "Hand-picked artworks for discerning collectors",
      cta: "View Curations"
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
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

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section with Elegant Slider */}
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-gradient-to-r from-base-300 to-base-200">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="grid lg:grid-cols-2 h-full">
              {/* Text Content */}
              <div className="flex items-center justify-center p-8 lg:p-16 bg-gradient-to-br from-primary/5 to-secondary/5">
                <div className="max-w-xl text-center lg:text-left">
                  <Fade cascade damping={0.3}>
                    <h1 className="text-4xl lg:text-6xl font-light mb-6 text-base-content leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-base-content/70 mb-8 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <Link 
                      to="/explore" 
                      className="btn btn-primary btn-lg px-8 py-3 rounded-none border-0 bg-neutral text-white hover:bg-neutral-focus transition-all duration-300 text-sm font-medium tracking-wider uppercase"
                    >
                      {slide.cta}
                    </Link>
                  </Fade>
                </div>
              </div>
              
              {/* Image Content */}
              <div className="relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-primary/10"></div>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Featured Collections Section */}
      <section className="py-20 bg-base-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Fade>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 text-base-content">
                Experience the joy of Living with{" "}
                <span className="font-medium text-primary">Original Art</span>
              </h2>
              <div className="w-24 h-0.5 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Discover handpicked artworks from emerging and established artists worldwide
              </p>
            </Fade>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="skeleton h-64 w-full"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredArtworks.slice(0, 4).map((artwork, index) => (
                <Fade key={artwork._id} delay={index * 200}>
                  <Link to={`/artwork/${artwork._id}`} className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="pt-4 space-y-2">
                      <h3 className="font-medium text-base-content group-hover:text-primary transition-colors">
                        {artwork.title}
                      </h3>
                      <p className="text-sm text-base-content/60">{artwork.artistName}</p>
                      <p className="text-xs text-base-content/50 uppercase tracking-wide">{artwork.category}</p>
                    </div>
                  </Link>
                </Fade>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link 
              to="/explore" 
              className="btn btn-outline btn-lg px-12 rounded-none border-neutral text-neutral hover:bg-neutral hover:text-white transition-all duration-300 text-sm font-medium tracking-wider uppercase"
            >
              View All Artworks
            </Link>
          </div>
        </div>
      </section>

      {/* Why Buy Original Art Section */}
      <section className="py-20 bg-gradient-to-br from-base-200/50 to-base-300/30">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <Slide direction="left">
              <div>
                <h2 className="text-3xl lg:text-4xl font-light mb-6 text-base-content">
                  Why Buy Original Art?
                </h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-2 text-base-content">Authentic Investment</h3>
                      <p className="text-base-content/70 leading-relaxed">
                        Own a piece of genuine artistic expression that holds both emotional and monetary value.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-2 text-base-content">Support Artists</h3>
                      <p className="text-base-content/70 leading-relaxed">
                        Directly support emerging and established artists, helping them continue their creative journey.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-3 shrink-0"></div>
                    <div>
                      <h3 className="font-medium mb-2 text-base-content">Unique Character</h3>
                      <p className="text-base-content/70 leading-relaxed">
                        Transform your space with one-of-a-kind pieces that reflect your personal taste and style.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Slide>
            
            <Slide direction="right">
              <div className="relative">
                <img
                  src="https://i.ibb.co/9nLD7Zq/living-room-art.jpg"
                  alt="Living room with original art"
                  className="w-full rounded-sm shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-sm -z-10"></div>
              </div>
            </Slide>
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Fade>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 text-base-content">
                Shop by Category
              </h2>
              <div className="w-24 h-0.5 bg-primary mx-auto mb-6"></div>
            </Fade>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Paintings", image: "https://i.ibb.co/k5pZYvc/paintings.jpg" },
              { name: "Photography", image: "https://i.ibb.co/2MYdXqZ/photography.jpg" },
              { name: "Sculpture", image: "https://i.ibb.co/TKq8N3m/sculpture.jpg" },
              { name: "Digital Art", image: "https://i.ibb.co/QDH9kZS/digital.jpg" },
              { name: "Mixed Media", image: "https://i.ibb.co/QNxF9MH/mixed-media.jpg" },
              { name: "Drawings", image: "https://i.ibb.co/MGxzqJY/drawings.jpg" },
            ].map((category, index) => (
              <Fade key={category.name} delay={index * 100}>
                <Link to={`/explore?category=${category.name}`} className="group block">
                  <div className="relative overflow-hidden bg-base-200 rounded-sm aspect-square hover:shadow-lg transition-all duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-medium text-sm lg:text-base">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
        </div>
      </section>

      {/* Typewriter Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-light mb-8 text-primary">
            <Typewriter
              words={[
                "Discover Amazing Artworks",
                "Support Talented Artists", 
                "Find Your Perfect Piece",
                "Experience Art Like Never Before",
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </h2>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-neutral text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Fade>
            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              Stay Connected with the Art World
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Get the latest updates on new artworks, artist features, and exclusive collections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1 rounded-none bg-white text-neutral"
              />
              <button className="btn btn-primary rounded-none px-8 text-sm font-medium tracking-wider uppercase border-0">
                Subscribe
              </button>
            </div>
          </Fade>
        </div>
      </section>

      <Tooltip id="view-details" />
    </div>
  );
};

export default Home;