import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
// import logo from "../../assets/logo.png";
import { LuMenuSquare } from "react-icons/lu";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  // console.log(user);
  const handleLogOut = () => {
    logout()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  const navLinks = (
    <>
      <li className="mr-3 border-zinc-700 border-2 bg-green-300  rounded-md">
        <NavLink to="/requests">Donation Requests</NavLink>
      </li>
      <li className="mr-3 border-zinc-700 border-2 bg-green-300 rounded-md">
        <NavLink to="/blog">Blog</NavLink>
      </li>

      {user && (
        <>
          <li className="mr-3 border-zinc-700 border-2 bg-green-300 rounded-md">
            <NavLink to="/fundings">Fundings</NavLink>
          </li>
          {/* <li  className="mr-3 border-zinc-700 border-2 rounded-md"><NavLink to="/add">Add Tourists Spot</NavLink></li>
           <li  className="border-zinc-700 border-2 rounded-md"><NavLink to="/list">My List</NavLink></li> */}
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar mb-2 shadow-sm bg-transparent shadow-green-200 px-1 md:px-5 lg:px-10">
        <div className="navbar-start">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost text-black p-1 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-gray-200 z-50 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className=" "
          >
            <img src="https://i.ibb.co/S6kq8JM/download.png"className=" w-[150px]" alt="" />
          </Link>
        </div>
        <div
          data-aos="fade-down"
          data-aos-duration="1000"
          data-aos-delay="300"
          className="navbar-center hidden md:flex"
        >
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className=" flex items-center justify-center gap-2">
              <div className="dropdown block dropdown-end">
                <div className="w-10  rounded-full dropdown dropdown-end">
                  <label tabIndex={0} className="btn btn-ghost text-black p-1">
                    <LuMenuSquare className="w-8 h-7" />
                  </label>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1000] p-2 shadow bg-sky-100 rounded-box w-52"
                >
                  <li className="hover:bg-green-300 rounded-md">
                    <Link className="text-base font-semibold" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    {" "}
                    <button
                      onClick={handleLogOut}
                      className="btn btn-sm bg-sky-400 hover:bg-blue-500 text-white  btn-ghost"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
              <img
                className="w-10 rounded-full"
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/8xzVgxd/pngtree-user-icon-png-image-1796659.jpg"
                }
              />
            </div>
          ) : (
            <div className="flex">
              <Link to="/login">
                <button className="btn btn-sm bg-green-500 hover:bg-blue-500 text-white mr-2  btn-ghost">
                  Login
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
