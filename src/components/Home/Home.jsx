import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { Fade, Slide } from "react-awesome-reveal";
import { Tooltip } from "react-tooltip";

const Home = () => {
  const [featuredArtworks, setFeaturedArtworks] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [artistsLoading, setArtistsLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
      title: "Give a Gift",
      subtitle: "Discover original art from emerging and established artists",
      cta: "Shop Original Art"
    },
    {
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80", 
      title: "The Joy of Original Art",
      subtitle: "Experience authentic creativity in your daily life",
      cta: "Explore Collections"
    },
    {
      image: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=80",
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/top-artists`)
      .then((res) => res.json())
      .then((data) => {
        setTopArtists(data);
        setArtistsLoading(false);
      })
      .catch(() => setArtistsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-base-100">
      <div className="relative h-[70vh] lg:h-[80vh] overflow-hidden bg-linear-to-r from-base-300 to-base-200">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <div className="grid lg:grid-cols-2 h-full">
              <div className="flex items-center justify-center p-8 lg:p-16 bg-linear-to-br from-primary/5 to-secondary/5">
                <div className="max-w-xl text-center lg:text-left">
                  <Fade cascade damping={0.3}>
                    <h1 className="text-4xl lg:text-6xl font-light mb-6 text-base-content leading-tight">
                      {slide.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-base-content/70 mb-8 font-light leading-relaxed">
                      {slide.subtitle}
                    </p>
                    <br />
                    <Link 
                      to="/explore" 
                      className="btn btn-primary btn-lg px-8 py-3 rounded-none border-0 bg-neutral text-white hover:bg-neutral-focus transition-all duration-300 text-sm font-medium tracking-wider uppercase"
                    >
                      {slide.cta}
                    </Link>
                  </Fade>
                </div>
              </div>
              
              <div className="relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-l from-transparent to-primary/10"></div>
              </div>
            </div>
          </div>
        ))}
        
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArtworks.slice(0, 6).map((artwork, index) => (
                <Fade key={artwork._id} delay={index * 200}>
                  <Link to={`/artwork/${artwork._id}`} className="group cursor-pointer">
                    <div className="relative overflow-hidden bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-500">
                      <img
                        src={artwork.image}
                        alt={artwork.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              className="btn btn-outline btn-primary btn-lg px-12 rounded-none transition-all duration-300 text-sm font-medium tracking-wider uppercase"
            >
              View All Artworks
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-linear-to-br from-base-200/50 to-base-300/30">
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
                  src="https://images.unsplash.com/photo-1616587226157-48e49175ee20?w=800&q=80"
                  alt="Living room with original art"
                  className="w-full rounded-sm shadow-lg"
                />
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/10 rounded-sm -z-10"></div>
              </div>
            </Slide>
          </div>
        </div>
      </section>

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
              { name: "Paintings", image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400&q=80" },
              { name: "Photography", image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&q=80" },
              { name: "Sculpture", image: "https://www.shutterstock.com/image-illustration/abstract-illustration-3d-rendering-white-260nw-2176292317.jpg" },
              { name: "Digital Art", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80" },
              { name: "Mixed Media", image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&q=80" },
              { name: "Drawings", image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80" },
            ].map((category, index) => (
              <Fade key={category.name} delay={index * 100}>
                <Link to={`/explore?category=${category.name}`} className="group block">
                  <div className="relative overflow-hidden bg-base-200 rounded-sm aspect-square hover:shadow-lg transition-all duration-300">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <h3 className="text-white font-medium text-sm lg:text-base">{category.name}</h3>
                    </div>
                  </div>
                </Link>
              </Fade>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link 
              to="/categories" 
              className="btn btn-outline btn-secondary btn-lg px-12 rounded-none transition-all duration-300 text-sm font-medium tracking-wider uppercase"
            >
              View All Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Fade>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 text-base-content">
                Top Artists of the <span className="font-medium text-primary">Week</span>
              </h2>
              <div className="w-24 h-0.5 bg-primary mx-auto mb-6"></div>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Celebrating our most active and appreciated artists this week
              </p>
            </Fade>
          </div>

          {artistsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="space-y-4">
                  <div className="skeleton h-48 w-full rounded-lg"></div>
                  <div className="skeleton h-4 w-3/4"></div>
                  <div className="skeleton h-4 w-1/2"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {topArtists.map((artist, index) => (
                <Fade key={artist._id} delay={index * 150}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 group">
                    <figure className="px-6 pt-6">
                      <div className="avatar">
                        <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                          <img 
                            src={artist.artistPhoto || "https://i.ibb.co/7J4HzsG/default-avatar.png"} 
                            alt={artist.artistName}
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </figure>
                    <div className="card-body items-center text-center">
                      <h3 className="card-title text-base-content group-hover:text-primary transition-colors">
                        {artist.artistName}
                      </h3>
                      <div className="flex gap-6 mt-2">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-primary">{artist.totalArtworks}</p>
                          <p className="text-xs text-base-content/60">Artworks</p>
                        </div>
                        <div className="divider divider-horizontal mx-0"></div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-secondary">{artist.totalLikes || 0}</p>
                          <p className="text-xs text-base-content/60">Total Likes</p>
                        </div>
                      </div>
                      <div className="card-actions mt-4">
                        <Link 
                          to={`/artist/${encodeURIComponent(artist._id)}`}
                          className="btn btn-primary btn-sm"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-base-100">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Fade>
              <h2 className="text-3xl lg:text-4xl font-light mb-4 text-base-content">
                Community <span className="font-medium text-secondary">Highlights</span>
              </h2>
              <div className="w-24 h-0.5 bg-secondary mx-auto mb-6"></div>
              <p className="text-lg text-base-content/70 max-w-2xl mx-auto leading-relaxed">
                Discover what's happening in our vibrant art community
              </p>
            </Fade>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Slide direction="left">
              <div className="card bg-gradient-to-br from-primary/10 to-primary/5 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-base-content">Weekly Challenge</h3>
                  </div>
                  <p className="text-base-content/70 mb-4">
                    Join our weekly art challenge! This week's theme: "Abstract Emotions". 
                    Submit your artwork and win amazing prizes.
                  </p>
                  <div className="card-actions justify-end">
                    <Link to="/explore" className="btn btn-primary btn-sm">
                      Participate Now
                    </Link>
                  </div>
                </div>
              </div>
            </Slide>

            <Slide direction="up">
              <div className="card bg-gradient-to-br from-secondary/10 to-secondary/5 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-secondary/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-base-content">Featured Collection</h3>
                  </div>
                  <p className="text-base-content/70 mb-4">
                    Explore our curated collection "Modern Masterpieces" featuring contemporary 
                    artworks from around the globe.
                  </p>
                  <div className="card-actions justify-end">
                    <Link to="/explore" className="btn btn-secondary btn-sm">
                      Browse Collection
                    </Link>
                  </div>
                </div>
              </div>
            </Slide>

            <Slide direction="right">
              <div className="card bg-gradient-to-br from-accent/10 to-accent/5 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="card-body">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-accent/20 rounded-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="card-title text-base-content">Artist Spotlight</h3>
                  </div>
                  <p className="text-base-content/70 mb-4">
                    Meet our artist of the week! Discover their creative journey, inspiration, 
                    and exclusive behind-the-scenes content.
                  </p>
                  <div className="card-actions justify-end">
                    <Link to="/explore" className="btn btn-accent btn-sm">
                      Read Story
                    </Link>
                  </div>
                </div>
              </div>
            </Slide>
          </div>
        </div>
      </section>

      <section className="py-16 bg-linear-to-r from-primary/10 to-secondary/10">
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

      <section className="py-20 bg-neutral text-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <Fade>
            <h2 className="text-3xl lg:text-4xl font-light mb-6">
              Stay Connected with the Art World
            </h2>
            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              Get the latest updates on new artworks, artist features, and exclusive collections.
            </p>
            <div className="flex justify-center items-stretch flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input input-bordered flex-1 rounded-none bg-white text-neutral w-full sm:w-auto min-h-[48px]"
              />
              <button className="btn btn-primary rounded-none px-8 text-sm font-medium tracking-wider uppercase border-0 w-full sm:w-auto">
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