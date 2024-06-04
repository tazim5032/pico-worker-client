import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useTask = () => {
    const axiosPublic = useAxiosPublic();

    const {data: task = [], isPending: loading, refetch} = useQuery({
        queryKey: ['task'], 
        queryFn: async() =>{
            const res = await axiosPublic.get('/task');
            return res.data;
        }
    })

    return [task, loading, refetch]

}

export default useTask;