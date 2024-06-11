import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import useAuth from '../../Hooks/useAuth';
import Swal from 'sweetalert2';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Helmet from 'react-helmet';

const Details = () => {
    const { id } = useParams();

    const { user } = useAuth();
    const navigate = useNavigate();

    const [startDate, setStartDate] = useState(new Date())
   // console.log(startDate);
    // const [task, setAssignment] = useState({});

    const [task, setTask] = useState({});

    useEffect(() => {
        getData()
    }, [id])

    const getData = async () => {
        const { data } = await axios(
            `http://localhost:5000/details/${id}`
        )
        setTask(data)
    }
    


    const handleSubmit = async e => {

        e.preventDefault();

        const form = e.target;
        const submission_details = form.details.value;

        const title = task.title;
        const quantity = task.quantity;
        const status = 'Pending'
        //const email = task.email;
        const price = task.price;
        const total = task.total;

        //const feedback = 'Pending'

        const task_id = task._id;
        // const url = form.url.value;

        const details = task.description;
        const image = task.image;
        const author_name = task.author_name;
        const author_email = task.author_email;

        const worker_name = user.displayName;
        const worker_email = user.email;
        const submission_date = startDate;

        //console.log(title, difficulty, description, marks, deadline, photo, username, email);

        const info = {
            task_id, title, details, image, quantity, price,
            total, worker_email, worker_name, submission_details,
            author_name, author_email, submission_date, status,

        };

        //console.log(info);

        fetch(`http://localhost:5000/submission`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(info) //data gula k stringfy kore server e pathaitece
        })
            .then(res => res.json())
            .then(data => {
                //console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Task Submitted Successfully!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    })

                    //navigate('/my-submission')
                    navigate('/dashboard/userSubmissions')
                }
            })

    }
    return (
        <div className=''>
            <Helmet>
                <title>Details</title>
            </Helmet>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-36">
                {/* Left Column: Image */}
                <div>
                    <img src={task.image} alt={task.title} className="w-full h-auto rounded-lg shadow-md" />
                </div>

                {/* Right Column: Details */}
                <div>
                    <h2 className="text-2xl font-bold mb-4"> <span className="text-blue-600">Title:</span> {task.title}</h2>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">Author:</span> {task.author_name}</p>
                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">Author Email:</span> {task.author_email}</p>
                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold ">
                        Task Quantity:</span> <span className="uppercase">{task.quantity}</span></p>
                    <p className="text-lg mb-4 text-justify">
                        <span className="text-blue-600 font-bold">Description:</span> {task.description}
                    </p>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                        Payment(Per Task):</span> {task.price}</p>

                    <p className="text-lg mb-4"><span className="text-blue-600 font-bold">
                        Deadline:</span> {new Date(task.deadline).toLocaleDateString()}</p>

                    {/* <Link to={`/submit-form/${task._id}`} >
                        <button className="btn x-8 py-2.5 leading-5 
                        text-white transition-colors duration-300 transform bg-gray-700 rounded-md 
                        hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Take task</button>
                    </Link> */}




                    <form onSubmit={handleSubmit}
                        className="rounded-xl bg-base-100 flex flex-col justify-center   mx-auto" >

                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="text-gray-700">Submission Details</span>
                            </label>
                            <label className="input-group">
                                <input type="text" name="details" placeholder="Task Solution Details"
                                    className="input input-bordered w-full" required />
                            </label>
                        </div>

                        <div className="md:flex mb-4">
                            <div className="form_control md:w-1/2">

                                <label className="label">
                                    <span className="text-gray-700">Submission Date</span>
                                </label>

                                <DatePicker
                                    className='border p-3 rounded-md disabled'
                                    selected={startDate}
                                //onChange={date => setStartDate(date)}
                                />
                            </div>
                        </div>

                        <input className="btn btn-block bg-black text-white w-full"
                            type="submit" value="Submit" />
                    </form>



                </div>
            </div>
        </div>

    );
};

export default Details;