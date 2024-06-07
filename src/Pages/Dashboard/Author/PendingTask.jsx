import { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const PendingTask = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [task, setTask] = useState([]);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        getData();
    }, [user]);

    const getData = async () => {
        const { data } = await axiosSecure(`/status/${user.email}/Pending`);
        setTask(data);
    };

    const openModal = (task) => {
        setSelectedTask(task);
    };

    const closeModal = () => {
        setSelectedTask(null);
    };

    const handleApprove = async (task) => {
        try {
            await axiosSecure.put(`/approve-task/${task._id}`, {
                worker_email: task.worker_email,
                coin: task.total // Assuming `total` is the value to add to the worker's coins
            });
            // Refresh the task list
            getData();
        } catch (error) {
            console.error('Failed to approve task', error);
        }
    };

    const handleReject = async (task) => {
        try {
            await axiosSecure.put(`/reject-task/${task._id}`);
            // Refresh the task list
            getData();
        } catch (error) {
            console.error('Failed to reject task', error);
        }
    };
    

    return (
        <section className='container px-4 mx-auto pt-24'>
            <Helmet>
                <title>Pending task</title>
            </Helmet>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium'>Total Pending</h2>
                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full'>
                    {task.length} task
                </span>
            </div>
            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200 md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className='bg-gray-50'>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Worker Name</span>
                                            </div>
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Worker Email</span>
                                            </button>
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Task Title
                                        </th>
                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Payable Amount
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            View Submissions
                                        </th>
                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Actionable Button
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='divide-y divide-gray-200'>
                                    {task.map(item => (
                                        <tr key={item._id}>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                {item.worker_name}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                {item.worker_email}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                {item.title}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                {item.total}
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <button className='btn' onClick={() => openModal(item)}>View Submissions</button>
                                            </td>
                                            <td className='px-4 py-4 text-sm whitespace-nowrap'>
                                                <button className='btn p-2 bg-green-500 text-white' onClick={() => handleApprove(item)}>Approve</button>
                                                <button className='btn p-2 bg-red-500 text-white' onClick={() => handleReject(item)}>Reject</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            {selectedTask && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-md w-4/5 h-4/5 max-w-5xl max-h-[80%] flex flex-col justify-between">
                        <div className="overflow-y-auto">
                            <h3 className="text-lg font-bold mb-4">Submission Details</h3>
                            <p>{selectedTask.submission_details}</p>
                        </div>
                        <div className="mt-4 flex justify-end">
                            <button className="btn bg-gray-200 text-gray-800 px-4 py-2 rounded-md" onClick={closeModal}>Close</button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default PendingTask;
