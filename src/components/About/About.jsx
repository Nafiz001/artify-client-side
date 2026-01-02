import { Fade, Slide } from "react-awesome-reveal";
import { FiHeart, FiUsers, FiTrendingUp, FiAward } from "react-icons/fi";

const About = () => {
    const stats = [
        { icon: FiUsers, value: "10,000+", label: "Artists" },
        { icon: FiHeart, value: "50,000+", label: "Artworks" },
        { icon: FiTrendingUp, value: "1M+", label: "Monthly Views" },
        { icon: FiAward, value: "500+", label: "Awards" },
    ];

    const team = [
        {
            name: "Sarah Johnson",
            role: "Founder & CEO",
            image: "https://i.pravatar.cc/300?img=1",
            bio: "Passionate about connecting artists with art lovers worldwide.",
        },
        {
            name: "Michael Chen",
            role: "Head of Curation",
            image: "https://i.pravatar.cc/300?img=13",
            bio: "Expert in contemporary art with 15 years of experience.",
        },
        {
            name: "Emma Williams",
            role: "Community Manager",
            image: "https://i.pravatar.cc/300?img=5",
            bio: "Building vibrant communities around art and creativity.",
        },
        {
            name: "David Rodriguez",
            role: "Technical Lead",
            image: "https://i.pravatar.cc/300?img=12",
            bio: "Creating seamless experiences for artists and collectors.",
        },
    ];

    return (
        <div className="min-h-screen bg-base-100">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-primary/10 to-secondary/10 py-20">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Fade>
                        <div className="text-center">
                            <h1 className="text-4xl md:text-6xl font-bold text-base-content mb-6">
                                About <span className="text-primary">Artisan's Echo</span>
                            </h1>
                            <p className="text-xl text-base-content/70 max-w-3xl mx-auto leading-relaxed">
                                We're on a mission to democratize art by connecting talented artists
                                with passionate collectors from around the world.
                            </p>
                        </div>
                    </Fade>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-base-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <Fade key={stat.label} delay={index * 100}>
                                <div className="text-center p-6 bg-base-200 rounded-lg hover:shadow-xl transition-all duration-300">
                                    <stat.icon className="text-4xl text-primary mx-auto mb-4" />
                                    <h3 className="text-3xl font-bold text-base-content mb-2">{stat.value}</h3>
                                    <p className="text-base-content/70">{stat.label}</p>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Slide direction="left">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                                    Our Story
                                </h2>
                                <div className="space-y-4 text-base-content/70 leading-relaxed">
                                    <p>
                                        Founded in 2020, Artisan's Echo began with a simple vision: to create
                                        a platform where artists could showcase their work and connect with
                                        collectors who appreciate their unique creative vision.
                                    </p>
                                    <p>
                                        What started as a small community of passionate artists has grown into
                                        a thriving marketplace featuring thousands of talented creators from
                                        over 100 countries.
                                    </p>
                                    <p>
                                        Today, we're proud to be one of the leading platforms for discovering
                                        and collecting original artwork, helping artists build sustainable
                                        careers while bringing beautiful art into homes worldwide.
                                    </p>
                                </div>
                            </div>
                        </Slide>
                        <Slide direction="right">
                            <div className="relative">
                                <img
                                    src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80"
                                    alt="Art Gallery"
                                    className="rounded-lg shadow-2xl w-full"
                                />
                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-lg -z-10"></div>
                            </div>
                        </Slide>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20 bg-base-100">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Fade>
                        <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-12">
                            Our Mission & Values
                        </h2>
                    </Fade>
                    <div className="grid md:grid-cols-3 gap-8">
                        <Fade delay={200}>
                            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="card-body">
                                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4">
                                        <FiHeart className="text-3xl text-primary" />
                                    </div>
                                    <h3 className="card-title text-base-content">Passion for Art</h3>
                                    <p className="text-base-content/70">
                                        We believe art enriches lives and brings joy to everyday moments.
                                        Every piece tells a story worth sharing.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade delay={400}>
                            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="card-body">
                                    <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                                        <FiUsers className="text-3xl text-secondary" />
                                    </div>
                                    <h3 className="card-title text-base-content">Community First</h3>
                                    <p className="text-base-content/70">
                                        Our artists and collectors are at the heart of everything we do.
                                        We're building a supportive, inclusive community.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                        <Fade delay={600}>
                            <div className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300">
                                <div className="card-body">
                                    <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mb-4">
                                        <FiAward className="text-3xl text-accent" />
                                    </div>
                                    <h3 className="card-title text-base-content">Quality & Authenticity</h3>
                                    <p className="text-base-content/70">
                                        We curate only the finest original artworks, ensuring authenticity
                                        and quality in every piece.
                                    </p>
                                </div>
                            </div>
                        </Fade>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-20 bg-base-200">
                <div className="container mx-auto px-4 max-w-6xl">
                    <Fade>
                        <h2 className="text-3xl md:text-4xl font-bold text-base-content text-center mb-12">
                            Meet Our Team
                        </h2>
                    </Fade>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member, index) => (
                            <Fade key={member.name} delay={index * 100}>
                                <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                                    <figure className="px-6 pt-6">
                                        <div className="avatar">
                                            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                <img src={member.image} alt={member.name} />
                                            </div>
                                        </div>
                                    </figure>
                                    <div className="card-body items-center text-center">
                                        <h3 className="card-title text-base-content">{member.name}</h3>
                                        <p className="text-primary font-semibold">{member.role}</p>
                                        <p className="text-base-content/70 text-sm">{member.bio}</p>
                                    </div>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
                <div className="container mx-auto px-4 max-w-4xl text-center">
                    <Fade>
                        <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-6">
                            Join Our Community
                        </h2>
                        <p className="text-xl text-base-content/70 mb-8">
                            Whether you're an artist looking to showcase your work or a collector
                            searching for that perfect piece, we'd love to have you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a href="/register" className="btn btn-primary btn-lg">
                                Get Started
                            </a>
                            <a href="/explore" className="btn btn-outline btn-primary btn-lg">
                                Explore Artworks
                            </a>
                        </div>
                    </Fade>
                </div>
            </section>
        </div>
    );
};

export default About;
