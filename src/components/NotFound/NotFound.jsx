import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-500 to-pink-500">
      <div className="text-center text-white">
        <h1 className="text-9xl font-bold mb-4">404</h1>
        <h2 className="text-4xl font-semibold mb-4">Artwork Not Found</h2>
        <p className="text-xl mb-8">
          Oops! The masterpiece you're looking for doesn't exist.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Return to Gallery
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
