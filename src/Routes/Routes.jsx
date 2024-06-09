import {
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "../Components/ErrorPage";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AdminHome from "../Pages/Dashboard/Admin/AdminHome";
import ManageTask from "../Pages/Dashboard/Admin/ManageTask";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser";
import AddTask from "../Pages/Dashboard/Author/AddTask";
import AuthorHome from "../Pages/Dashboard/Author/AuthorHome";
import MakePayment from "../Pages/Dashboard/Author/MakePayment";
import MyTaskList from "../Pages/Dashboard/Author/MyTaskList";
import PaymentHistory from "../Pages/Dashboard/Author/PaymentHistory";
import PaymentOptions from "../Pages/Dashboard/Author/PaymentOptions";
import PendingTask from "../Pages/Dashboard/Author/PendingTask";
import UpdateTask from "../Pages/Dashboard/Author/UpdateTask";
import TaskList from "../Pages/Dashboard/Cart/Worker/TaskList";
import UserSubmissions from "../Pages/Dashboard/Cart/Worker/UserSubmissions";
import UserHome from "../Pages/Dashboard/User/UserHome";
import Withdraw from "../Pages/Dashboard/User/Withdraw";
import Details from "../Pages/Home/Details";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
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
        path: 'userHome',
        element: <UserHome></UserHome>

      },
      {
        path: 'userHome',
        element: <UserHome></UserHome>

      },
      {
        path: 'taskList',
        element: <TaskList></TaskList>
      },
      {
        path: 'withdraw',
        element: <Withdraw></Withdraw>
      },

      //author
      {
        path: 'authorHome',
        element: <AuthorHome></AuthorHome>
      },
      {
        path: 'add-new-task',
        element: <AddTask></AddTask>
      },
      {
        path: 'my-task-list',
        element: <MyTaskList></MyTaskList>
      },
      {
        path: 'payment',
        element: <PaymentOptions></PaymentOptions>
      },
      {
        path: 'make-payment',
        element: <MakePayment></MakePayment>
      },
      {
        path: 'history',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'pending',
        element: <PendingTask></PendingTask>
      },
      {
        path: 'updateTask/:id',
        element: <UpdateTask></UpdateTask>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateProduct/${params.id}`)
      },


      //admin

      {
        path: 'adminHome',
        element: <AdminHome></AdminHome>
      },
      {
        path: 'manage-user',
        element: <ManageUser></ManageUser>
      },
      {
        path: 'manage-task',
        element: <ManageTask></ManageTask>
      },
    ]
  }
]);