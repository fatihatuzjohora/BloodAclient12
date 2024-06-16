import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import Home from "../Components/Home/Home";
import Blog from "../Components/Blog/Blog";
import BlogDetail from "../Components/Blog/BlogDetail";
import Error from "../Components/Error/Error";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layout/DashboardLayout";
import DashboardHome from "../Components/Dashboard/Home/DashboardHome";
import Profile from "../Components/Dashboard/Profile/Profile";
import AdminRoute from "../routes/AdminRoute";
import DonorRoute from "../routes/DonorRoute";
import Volunteer from "../routes/Volunteer";
import CreateRequest from "../pages/Dashboard/Donor/CreateRequest";
import MyRequest from "../pages/Dashboard/Donor/MyRequest";
import AllRequest from "../pages/Dashboard/Volunteer/AllRequest";
import AllUser from "../pages/Dashboard/Admin/AllUser";
import DonationRequest from "../Components/Request/DonationRequest";
import RequestDetail from "../Components/Request/RequestDetail";
import Edit from "../pages/Dashboard/Donor/Edit";
import ContentManage from "../pages/Dashboard/Volunteer/ContentManage";
import AddBlog from "../pages/Dashboard/Volunteer/AddBlog";
import Funding from "../Components/Funding/Funding";
import Fund from "../Components/Funding/Fund";
import Search from "../Components/Search/Search";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error />,
    children: [

      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/requests",
        element: <DonationRequest></DonationRequest>,
      },
      
      {
        path: "/requests/:id",
        element: (
          <PrivateRoute>
            <RequestDetail></RequestDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <BlogDetail></BlogDetail>
          </PrivateRoute>
        ),
        //loader: ({params}) => fetch(`http://localhost:5000/blogs/${params.id}`)
      },
      {
        path: "/fundings",
        element: (
          <PrivateRoute>
            {" "}
            <Fund></Fund>{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/form",
        element: (
          <PrivateRoute>
            {" "}
            <Funding></Funding>
          </PrivateRoute>
        ),
      },
      {
        path: "/search",
        element: <Search></Search>,
      },
      {
        path: "edit/:id",

        element: (
          <PrivateRoute>
            <Edit></Edit>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,

        element: (
          <PrivateRoute>
            <DashboardHome></DashboardHome>
          </PrivateRoute>
        ),
      },

      {
        path: "all-blood-dontion-request",
        element: (
          <PrivateRoute>
            <Volunteer>
              <AllRequest></AllRequest>
            </Volunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AllUser></AllUser>
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "detail/:id",
        element: (
          <PrivateRoute>
            <RequestDetail></RequestDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "my-dontion-requests/detail/:id",
        element: (
          <PrivateRoute>
            <RequestDetail></RequestDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "all-blood-dontion-request/detail/:id",
        element: (
          <PrivateRoute>
            <RequestDetail></RequestDetail>
          </PrivateRoute>
        ),
      },
      {
        path: "my-dontion-requests",
        element: (
          <PrivateRoute>
            <DonorRoute>
              <MyRequest></MyRequest>
            </DonorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "all-blood-dontion-request/edit/:id",

        element: (
          <PrivateRoute>
            <DonorRoute>
              <Edit></Edit>
            </DonorRoute>
          </PrivateRoute>
        ),
      },

      {
        path: "create-dontion-request",
        element: (
          <PrivateRoute>
            <DonorRoute>
              <CreateRequest></CreateRequest>
            </DonorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <PrivateRoute>
            <Volunteer>
              <ContentManage></ContentManage>
            </Volunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: (
          <PrivateRoute>
            <Volunteer>
              <AddBlog></AddBlog>
            </Volunteer>
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
