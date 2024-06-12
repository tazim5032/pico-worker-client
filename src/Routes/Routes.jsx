import {
  createBrowserRouter,
} from "react-router-dom";
import ContactInfo from "../Components/ContactInfo";
import ErrorPage from "../Components/ErrorPage";
import ForbiddenPage from "../Components/ForbiddenPage";
import PrivateRoute from "../Components/PrivateRoute";
import Profile from "../Components/Profile";
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
import Common from "../Pages/Dashboard/Common";
import UserHome from "../Pages/Dashboard/User/UserHome";
import Withdraw from "../Pages/Dashboard/User/Withdraw";
import Details from "../Pages/Home/Details";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
import AdminRoute from "./AdminRoute";
import TaskerRouter from "./TaskerRouter";
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
        path: 'contact',
        element: <ContactInfo></ContactInfo>
      },
      {
        path: 'profile',
        element:<PrivateRoute><Profile></Profile></PrivateRoute>
      },
      {
        path: 'details/:id',
        element: <PrivateRoute><Details></Details></PrivateRoute>
      },
      {
        path: 'forbidden',
        element: <ForbiddenPage></ForbiddenPage>
      },
      
      
    ]
  },
  {
    path: 'dashboard',
    element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
    children: [

      {
        path: 'common',
        element: <Common></Common>

      },

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
        element: <TaskerRouter><AuthorHome></AuthorHome></TaskerRouter>
      },
      {
        path: 'add-new-task',
        element: <TaskerRouter><AddTask></AddTask></TaskerRouter>
      },
      {
        path: 'my-task-list',
        element: <TaskerRouter><MyTaskList></MyTaskList></TaskerRouter>
      },
      {
        path: 'payment',
        element: <TaskerRouter><PaymentOptions></PaymentOptions></TaskerRouter>
      },
      {
        path: 'make-payment',
        element: <TaskerRouter><MakePayment></MakePayment></TaskerRouter>
      },
      {
        path: 'history',
        element: <TaskerRouter><PaymentHistory></PaymentHistory></TaskerRouter>
      },
      {
        path: 'pending',
        element: <TaskerRouter><PendingTask></PendingTask></TaskerRouter>
      },
      {
        path: 'updateTask/:id',
        element: <TaskerRouter><UpdateTask></UpdateTask></TaskerRouter>,
        loader: ({ params }) => fetch(`http://localhost:5000/updateProduct/${params.id}`)
      },


      //admin

      {
        path: 'adminHome',
        element: <AdminRoute><AdminHome></AdminHome></AdminRoute>
      },
      {
        path: 'manage-user',
        element: <AdminRoute><ManageUser></ManageUser></AdminRoute>
      },
      {
        path: 'manage-task',
        element: <AdminRoute><ManageTask></ManageTask></AdminRoute>
      },
    ]
  }
]);