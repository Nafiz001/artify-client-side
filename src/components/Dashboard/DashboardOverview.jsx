import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import {
    BarChart,
    Bar,
    LineChart,
    Line,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "recharts";
import { FiImage, FiHeart, FiEye, FiTrendingUp } from "react-icons/fi";
import { Fade } from "react-awesome-reveal";

const DashboardOverview = () => {
    const { user } = useContext(AuthContext);
    const [stats, setStats] = useState({
        totalArtworks: 0,
        totalLikes: 0,
        totalViews: 0,
        totalFavorites: 0,
    });
    const [artworks, setArtworks] = useState([]);
    const [categoryData, setCategoryData] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [loading, setLoading] = useState(true);

    const COLORS = ["#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#3b82f6", "#ef4444"];

    useEffect(() => {
        if (user?.email) {
            // Fetch user's artworks
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-artworks?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setArtworks(data);

                    // Calculate stats
                    const totalLikes = data.reduce((sum, art) => sum + (art.likes || 0), 0);
                    const totalViews = data.reduce((sum, art) => sum + (art.views || 0), 0);

                    setStats({
                        totalArtworks: data.length,
                        totalLikes: totalLikes,
                        totalViews: totalViews,
                        totalFavorites: 0, // Will be updated from favorites API
                    });

                    // Calculate category distribution
                    const categoryCount = {};
                    data.forEach((art) => {
                        categoryCount[art.category] = (categoryCount[art.category] || 0) + 1;
                    });

                    const catData = Object.entries(categoryCount).map(([name, value]) => ({
                        name,
                        value,
                    }));
                    setCategoryData(catData);

                    // Calculate monthly data (last 6 months)
                    const monthlyCount = {};
                    data.forEach((art) => {
                        if (art.createdAt) {
                            const date = new Date(art.createdAt);
                            const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
                            monthlyCount[monthYear] = (monthlyCount[monthYear] || 0) + 1;
                        }
                    });

                    const monthData = Object.entries(monthlyCount)
                        .slice(-6)
                        .map(([month, count]) => ({
                            month,
                            artworks: count,
                        }));
                    setMonthlyData(monthData);

                    setLoading(false);
                })
                .catch(() => setLoading(false));

            // Fetch favorites count
            fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/my-favorites?email=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setStats((prev) => ({ ...prev, totalFavorites: data.length }));
                })
                .catch(() => { });
        }
    }, [user]);

    const statCards = [
        {
            title: "Total Artworks",
            value: stats.totalArtworks,
            icon: FiImage,
            color: "primary",
            bgColor: "bg-primary/10",
        },
        {
            title: "Total Likes",
            value: stats.totalLikes,
            icon: FiHeart,
            color: "secondary",
            bgColor: "bg-secondary/10",
        },
        {
            title: "Total Views",
            value: stats.totalViews,
            icon: FiEye,
            color: "accent",
            bgColor: "bg-accent/10",
        },
        {
            title: "Favorites",
            value: stats.totalFavorites,
            icon: FiTrendingUp,
            color: "success",
            bgColor: "bg-success/10",
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <Fade>
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-6 md:p-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-base-content mb-2">
                        Welcome back, {user?.displayName || "Artist"}! 👋
                    </h1>
                    <p className="text-base-content/70">
                        Here's an overview of your creative journey
                    </p>
                </div>
            </Fade>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {statCards.map((stat, index) => (
                    <Fade key={stat.title} delay={index * 100}>
                        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300">
                            <div className="card-body">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-base-content/60 text-sm mb-1">{stat.title}</p>
                                        <p className="text-3xl font-bold text-base-content">{stat.value}</p>
                                    </div>
                                    <div className={`p-4 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`text-${stat.color} text-2xl`} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution */}
                <Fade>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-base-content mb-4">Artworks by Category</h2>
                            {categoryData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={categoryData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={80}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {categoryData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-base-content/50">
                                    No category data available
                                </div>
                            )}
                        </div>
                    </div>
                </Fade>

                {/* Monthly Artworks */}
                <Fade delay={200}>
                    <div className="card bg-base-100 shadow-xl">
                        <div className="card-body">
                            <h2 className="card-title text-base-content mb-4">Artworks Over Time</h2>
                            {monthlyData.length > 0 ? (
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={monthlyData}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line
                                            type="monotone"
                                            dataKey="artworks"
                                            stroke="#8b5cf6"
                                            strokeWidth={2}
                                            activeDot={{ r: 8 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            ) : (
                                <div className="flex items-center justify-center h-[300px] text-base-content/50">
                                    No timeline data available
                                </div>
                            )}
                        </div>
                    </div>
                </Fade>
            </div>

            {/* Recent Artworks Table */}
            <Fade delay={400}>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="card-title text-base-content">Recent Artworks</h2>
                            <Link to="/dashboard/my-gallery" className="btn btn-primary btn-sm">
                                View All
                            </Link>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="table table-zebra">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Likes</th>
                                        <th>Views</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {artworks.slice(0, 5).map((artwork) => (
                                        <tr key={artwork._id}>
                                            <td>
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={artwork.image} alt={artwork.title} />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="font-bold">{artwork.title}</div>
                                            </td>
                                            <td>
                                                <span className="badge badge-ghost">{artwork.category}</span>
                                            </td>
                                            <td>
                                                <span className="flex items-center gap-1">
                                                    <FiHeart className="text-error" />
                                                    {artwork.likes || 0}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="flex items-center gap-1">
                                                    <FiEye className="text-info" />
                                                    {artwork.views || 0}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={`badge ${artwork.visibility === 'Public' ? 'badge-success' : 'badge-warning'}`}>
                                                    {artwork.visibility || 'Public'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {artworks.length === 0 && (
                                <div className="text-center py-8 text-base-content/50">
                                    No artworks yet. Start creating!
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Fade>

            {/* Quick Actions */}
            <Fade delay={600}>
                <div className="card bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title text-base-content mb-4">Quick Actions</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Link to="/dashboard/add-artwork" className="btn btn-primary">
                                <FiImage className="mr-2" /> Add New Artwork
                            </Link>
                            <Link to="/dashboard/my-gallery" className="btn btn-outline btn-primary">
                                <FiImage className="mr-2" /> My Gallery
                            </Link>
                            <Link to="/dashboard/my-favorites" className="btn btn-outline btn-secondary">
                                <FiHeart className="mr-2" /> My Favorites
                            </Link>
                            <Link to="/explore" className="btn btn-outline btn-accent">
                                <FiEye className="mr-2" /> Explore Artworks
                            </Link>
                        </div>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default DashboardOverview;
