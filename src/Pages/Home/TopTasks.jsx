import { useEffect, useState } from "react";
import Card from "../../Components/Card";

const TopTasks = () => {
    const [items, setItems] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/all-featured-task`)
            .then(res => res.json())
            .then(data => {
                setItems(data);
            });
    }, []);
    return (
        <div>
            <h1 className='text-center mt-12 text-4xl font-semibold'>
                Featured Task</h1>
            <h1 className='text-center mt-2'>Highlighting Outstanding Tasks for Your Inspiration</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 mt-12 mx-[2%] sm:mx-[4%]">
                {
                    items.map(item => <Card
                        key={item._id}
                        item={item}
                    ></Card>)
                }
            </div>
        </div>
    );
};

export default TopTasks;