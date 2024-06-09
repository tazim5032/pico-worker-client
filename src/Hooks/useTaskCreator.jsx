import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useTaskCreator = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isTaskCreator, isPending: isTaskCreatorLoading } = useQuery({
        queryKey: [user?.email, 'isTaskCreator'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/creator/${user.email}`);
            //console.log(res.data);
            return res.data?.creator;
        }
    })
    return [isTaskCreator, isTaskCreatorLoading]
};

export default useTaskCreator;