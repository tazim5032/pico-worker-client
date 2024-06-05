import axios from "axios";
import { useEffect, useState } from "react";
import Helmet from "react-helmet";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";

const SubmitForm = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();


    const [assignment, setAssignment] = useState({});

    useEffect(() => {
        getData()
    }, [id])


    const getData = async () => {
        const { data } = await axios(
            `http://localhost:5000/details/${id}`
        )
        setAssignment(data)
    }


    if (!assignment || !Object.keys(assignment).length) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="loading loading-bars loading-lg"></div>
            </div>
        );
    }

    const handleSubmit = async e => {

        e.preventDefault();

        const form = e.target;

        const title = assignment.title;
        const quantity = assignment.quantity;
        const status = 'Pending'
        const email = assignment.email;
        const price = assignment.price;
        const total = assignment.total;

        const feedback = 'Pending'

        const url = form.url.value;
        const quickNote = form.description.value;
        const worker_name = user.displayName;
        const worker_email = user.email;

        //console.log(title, difficulty, description, marks, deadline, photo, username, email);
        
        const info = {
            email, url, quickNote, worker_name, worker_email, status, 
            title, quantity,  feedback, price , total,
        };

        console.log(info);

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
                    navigate('/')
                }
            })

    }

    return (
        <div className="pt-24">
            <Helmet>
                <title>Submit Assignment</title>
            </Helmet>

            <h1 className="text-3xl font-bold text-center mt-8">Submit Assignment
            </h1>

            <div className="flex flex-col-reverse sm:flex-row-reverse mb-48">


                <form onSubmit={handleSubmit}
                    className="rounded-xl w-1/2 bg-base-100 flex flex-col justify-center  py-8 mx-auto" >
                    <h1 className="mb-6">Task Title: {assignment.title}</h1>
                    <div className="form-control">
                        <label className="label">
                            <span className="text-gray-700">Task Solution Link(PDF/Doc)</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="url" placeholder="Task Solution URL"
                                className="input input-bordered w-full" required />
                        </label>
                    </div>


                    <div className="form-control mb-4 ">
                        <label className="label">
                            <span className="text-gray-700">Note(submitted task info)</span>
                        </label>
                        <label className="input-group">
                            <input type="text" name="description" placeholder="Note"
                                className="input input-bordered w-full py-12" required />
                        </label>
                    </div>


                    <input className="btn btn-block bg-black text-white w-full"
                        type="submit" value="Submit" />
                </form>

                
            </div>
        </div>
    );
};

export default SubmitForm;