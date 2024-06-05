import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../Components/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddTask from "../Pages/Dashboard/Author/AddTask";
import MyTaskList from "../Pages/Dashboard/Author/MyTaskList";
import UpdateTask from "../Pages/Dashboard/Author/UpdateTask";
import TaskList from "../Pages/Dashboard/Cart/Worker/TaskList";
import UserSubmissions from "../Pages/Dashboard/Cart/Worker/UserSubmissions";
import Details from "../Pages/Home/Details";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import SubmitForm from "../Pages/SubmitForm";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <SignUp></SignUp>
      },
      {
        path: 'details/:id',
        element: <Details></Details>
      },
      {
        path: 'submit-form/:id',
        element: <SubmitForm></SubmitForm>
      }
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [

      // user
      {
        path: 'userSubmissions',
        element: <UserSubmissions></UserSubmissions>

      },
      {
        path: 'taskList',
        element: <TaskList></TaskList>
      },

      //author
      {
        path: 'add-new-task',
        element: <AddTask></AddTask>
      },
      {
        path: 'my-task-list',
        element: <MyTaskList></MyTaskList>
      },
      {
        path: 'updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateProduct/${params.id}`)
      },


      //admin
    ]
  }
]);