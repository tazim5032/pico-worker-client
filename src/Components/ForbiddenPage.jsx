import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const ForbiddenPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-lg px-8 py-6 bg-white rounded-lg shadow-lg text-center">
                <h1 className="text-5xl font-bold text-gray-800 mb-4">403</h1>
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">Forbidden</h2>
                <p className="text-gray-600 mb-6">Sorry, you don't have permission to access this page.</p>
                <svg
                    className="w-20 h-20 mx-auto mb-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m5 4.5A9.5 9.5 0 105.5 3.5M12 8a4 4 0 110 8 4 4 0 010-8z"
                    />
                </svg>
                <Link
                    to="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                >
                    <FaHome className="mr-2" /> Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ForbiddenPage;
