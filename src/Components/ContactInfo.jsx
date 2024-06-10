import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const ContactInfo = () => {
    return (
        <div className='mb-96'>
            <div className="text-center pt-48 rounded-lg  max-w-4xl mx-auto animate-fadeIn">
            <h2 className="text-4xl font-semibold mb-6 text-gray-800">Contact Us</h2>
            <div className="flex flex-wrap justify-center gap-8">
                <div className="bg-white rounded-lg shadow-md p-6 w-60 transition-transform transform hover:translate-y-[-10px] hover:shadow-lg">
                    <FaPhoneAlt className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <h3 className="text-2xl font-medium mb-2 text-gray-800">Phone</h3>
                    <p className="text-gray-600">+1 234 567 890</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 w-60 transition-transform transform hover:translate-y-[-10px] hover:shadow-lg">
                    <FaEnvelope className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <h3 className="text-2xl font-medium mb-2 text-gray-800">Email</h3>
                    <p className="text-gray-600">info@example.com</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 w-60 transition-transform transform hover:translate-y-[-10px] hover:shadow-lg">
                    <FaMapMarkerAlt className="text-4xl text-blue-500 mb-4 mx-auto" />
                    <h3 className="text-2xl font-medium mb-2 text-gray-800">Address</h3>
                    <p className="text-gray-600">123 Main St, Anytown, USA</p>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ContactInfo;
