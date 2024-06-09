import { useEffect, useState } from "react";
import Card from "../../../../Components/Card";

const TaskList = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchTasks(currentPage);
    }, [currentPage]);

    const fetchTasks = (page) => {
        fetch(`http://localhost:5000/all-task?page=${page}&limit=${itemsPerPage}`)
            .then(res => res.json())
            .then(data => {
                setItems(data.tasks);
                setTotalPages(data.totalPages);
            });
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <h1 className='text-center mt-12 text-4xl font-semibold'>
                Featured Task
            </h1>
            <h1 className='text-center mt-2'>
                Highlighting Outstanding Tasks for Your Inspiration
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-12 mt-12 mx-[2%] sm:mx-[4%]">
                {items.map(item => (
                    <Card key={item._id} item={item}></Card>
                ))}
            </div>

            <div className="flex justify-center mt-8">
                <button 
                    onClick={() => handlePageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                    className="btn"
                >
                    Previous
                </button>
                <span className="mx-4">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                    className="btn"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default TaskList;
