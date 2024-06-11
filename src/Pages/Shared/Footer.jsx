import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-12">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Logo */}
                <div className="flex items-center justify-center">
                    <img src='https://i.ibb.co/t4yQbSp/logo.png' alt="Logo" className="h-12 w-16 rounded-xl" />
                </div>
                {/* Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
                    <p>123 Main Street</p>
                    <p>Anytown, USA 12345</p>
                    <p>Email: info@example.com</p>
                    <p>Phone: (123) 456-7890</p>
                </div>
                {/* Career Options */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Career Options</h3>
                    <p>We are always looking for talented individuals. Join us and let's build something great together.</p>
                    <a href="/careers" className="text-blue-400 hover:text-blue-600 mt-2 inline-block">See Open Positions</a>
                </div>
                {/* Newsletter Subscribe */}
                <div>
                    <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
                    <p>Subscribe to our newsletter to get the latest updates.</p>
                    <form className="mt-4 flex flex-col sm:flex-row">
                        <input type="email" placeholder="Enter your email" className="p-2 mb-2 rounded-md" />
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Subscribe</button>
                    </form>
                </div>
            </div>
            <div className="container mx-auto text-center mt-8">
                {/* Social Media Icons */}
                <div className="flex justify-center space-x-6 mb-4">
                    <a href="https://www.linkedin.com/in/mohammad-fakhrul-islam-tazim" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                        <FaLinkedin className="text-2xl" />
                    </a>
                    <a href="https://www.facebook.com/tazimulislam.salam" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                        <FaFacebook className="text-2xl" />
                    </a>
                    <a href="https://github.com/tazim5032" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500">
                        <FaGithub className="text-2xl" />
                    </a>
                </div>
                <p className="text-gray-400">© {new Date().getFullYear()} Your Website. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
