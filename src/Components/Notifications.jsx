import  { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosNotifications } from 'react-icons/io';

const Notifications = ({ userEmail }) => {
    const [notifications, setNotifications] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/notifications/${userEmail}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Failed to fetch notifications', error);
            }
        };

        fetchNotifications();
    }, [userEmail]);

    const togglePopup = () => setShowPopup(!showPopup);

    return (
        <div className="relative">
            <button
                className="bg-blue-500 text-white p-2 rounded-full focus:outline-none"
                onClick={togglePopup}
            >
                <IoIosNotifications className="text-4xl mt-4" />
            </button>
            {showPopup && (
                <div
                    className="fixed top-16 right-16 bg-white border border-gray-300 p-4 shadow-lg max-w-xs max-h-96 overflow-y-auto rounded-md z-50"
                    onClick={togglePopup}
                >
                    <ul>
                        {notifications.map(notification => (
                            <li key={notification._id} className="mb-2">
                                <p className="text-sm">{notification.message}</p>
                                <p className="text-xs text-gray-500">{new Date(notification.time).toLocaleString()}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Notifications;
