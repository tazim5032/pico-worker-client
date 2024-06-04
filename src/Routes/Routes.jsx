import {
    createBrowserRouter,
  } from "react-router-dom";
import Dashboard from "../Layout/Dashboard";
import Main from "../Layout/Main";
import AddTask from "../Pages/Dashboard/Author/AddTask";
import MyTaskList from "../Pages/Dashboard/Author/MyTaskList";
import TaskList from "../Pages/Dashboard/Cart/Worker/TaskList";
import UserSubmissions from "../Pages/Dashboard/Cart/Worker/UserSubmissions";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/SignUp";
  export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
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


        //admin
      ]
    }
  ]);