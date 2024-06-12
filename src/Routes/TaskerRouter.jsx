import { Navigate,  } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import useTaskCreator from "../Hooks/useTaskCreator";

const TaskerRouter = ({ children }) => {
    const {user, loading} = useAuth();
    const [isTaskCreator, isTaskCreatorLoading] = useTaskCreator();

   // const location = useLocation();

    if (loading || isTaskCreatorLoading) {
        return <progress className="progress w-56"></progress>
    }

    if (user && isTaskCreator) {
        return children;
    }
    return <Navigate to="/forbidden" ></Navigate>
};

export default TaskerRouter;