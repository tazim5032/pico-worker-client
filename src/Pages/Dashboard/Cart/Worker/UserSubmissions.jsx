import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const UserSubmissions = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [task, setTask] = useState([]);

    useEffect(() => {
        getData()
    }, [user])

    const getData = async () => {
        const { data } = await axiosSecure(
            `/submission/${user?.email}`)
        setTask(data)
    }

    return (
        <section className='container px-4 mx-auto pt-24'>
            <Helmet>
                <title>My Submissions</title>
            </Helmet>
            <div className='flex items-center gap-x-3'>
                <h2 className='text-lg font-medium  '>My Submissions</h2>

                <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
                    {task.length} Submissions
                </span>
            </div>

            <div className='flex flex-col mt-6'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                    <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
                        <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
                            <table className='min-w-full divide-y divide-gray-200'>
                                <thead className=''>
                                    <tr>
                                        <th
                                            scope='col'
                                            className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <div className='flex items-center gap-x-3'>
                                                <span>Title</span>
                                            </div>
                                        </th>



                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            <button className='flex items-center gap-x-2'>
                                                <span>Quantity</span>
                                            </button>
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Payment(Per task)
                                        </th>

                                        <th
                                            scope='col'
                                            className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                                        >
                                            Total(Payment)
                                        </th>

                                        <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                            Status
                                        </th>

                                        {/* <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                                           
                                        </th> */}


                                    </tr>
                                </thead>
                                <tbody className=' divide-y divide-gray-200 '>

                                    {
                                        task.map(item =>
                                            <tr key={item._id}>
                                                <td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    {item.title}
                                                </td><td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    {item.quantity}
                                                </td><td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    {item.price}
                                                </td><td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    {item.total}
                                                </td><td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    {item.status}
                                                </td>
                                                {/* <td className='px-4 py-4 text-sm   whitespace-nowrap'>
                                                    <Link to={`/details-submission/${item._id}`} className="text-sm text-gray-600 hover:text-gray-900">
                                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                                            Preview docs/pdf
                                                        </button>
                                                    </Link>
                                                </td> */}

                                            </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserSubmissions;