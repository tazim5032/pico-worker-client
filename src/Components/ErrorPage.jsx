import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-500 to-purple-700 text-white">
            <div className="max-w-md text-center">
                <h1 className="text-4xl font-bold mb-4">Oops! Page Not Found</h1>
                <p className="text-lg mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <Link to="/" className="bg-white text-blue-500 py-3 px-6 rounded-full font-bold text-lg hover:bg-blue-400 hover:text-white transition duration-300">Go to Home</Link>
            </div>
        </div>
    );
};

export default ErrorPage;