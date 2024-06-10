import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const AdminWithdrawRequests = () => {
    const axiosSecure = useAxiosSecure();
    const [withdrawRequests, setWithdrawRequests] = useState([]);

    useEffect(() => {
        fetchWithdrawRequests();
    }, []);

    const fetchWithdrawRequests = async () => {
        const { data } = await axiosSecure.get('/admin/withdraw-requests');
        setWithdrawRequests(data);
    };

    const handlePaymentSuccess = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, confirm it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/admin/withdraw-request/${id}`);
                if (res.data.deletedCount > 0) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Payment Successful',
                        text: 'The withdrawal request has been processed successfully.',
                    });
                    fetchWithdrawRequests();
                }
            }
        });
    };

    return (
        <div className="mt-12 sm:ml-4 mb-96">
            <h2 className="text-3xl mb-8">Withdrawal Requests</h2>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Worker Name</th>
                            <th>Withdraw Coin</th>
                            <th>Withdraw Amount</th>
                            <th>Payment Number</th>
                            <th>Payment System</th>
                            <th>Withdraw Time</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {withdrawRequests.map(request => (
                            <tr key={request._id}>
                                <td>{request.worker_name}</td>
                                <td>{request.withdraw_coin}</td>
                                <td>${request.withdraw_amount}</td>
                                <td>{request.account_number}</td>
                                <td>{request.payment_system}</td>
                                <td>{new Date(request.withdraw_time).toLocaleString()}</td>
                                <td>
                                    <button
                                        onClick={() => handlePaymentSuccess(request._id)}
                                        className="btn btn-success btn-sm"
                                    >
                                        <FaCheckCircle className="mr-2" /> Confirm
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminWithdrawRequests;
