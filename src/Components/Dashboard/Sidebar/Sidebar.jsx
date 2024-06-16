import { Link } from 'react-router-dom'
import { GrLogout } from 'react-icons/gr'
import { FcSettings } from 'react-icons/fc'
import { AiOutlineBars } from 'react-icons/ai'
// import logo from '../../../assets/logo.png'
import { useState } from 'react'
import useAuth from '../../../hook/useAuth'
import MenuItem from '../Menu/MenuItem'
import Donor from '../Menu/Donor'
import Volunteer from '../Menu/Volunteer'
import Admin from '../Menu/Admin'
import useRole from '../../../hook/useRole'


const Sidebar = () => {
    const [isActive, setActive] = useState(false)
    const [data] = useRole()
    const { logout } = useAuth()
    const role = data.role;
    const handleToggle = () => {
        setActive(!isActive)
      }

      const handleLogOut = () => {
        logout()
            .then(() => { })
            .catch(error => console.log(error))
     }
//console.log(role);
    return (
        <>
      {/* Small Screen Navbar */}
      <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
        <div>
          <div className=''>
            <Link to='/'>
              <img
                // className='hidden md:block'
                src='https://i.ibb.co/S6kq8JM/download.png'
                alt='logo'
                className='w-[150px]'
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-200'
        >
          <AiOutlineBars className='h-5 w-5' />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && '-translate-x-full'
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className='w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center  mx-auto'>
              <Link to='/'>
                <img
                  // className='hidden md:block'
                  src='https://i.ibb.co/S6kq8JM/download.png'
                  alt='logo'
                  className='w-[150px]'
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className='flex flex-col justify-between flex-1 mt-6'>
            

            {/*  Menu Items */}
            <nav>
              
              
              {role === 'donor' && <Donor />}
              
              {role === 'volunteer' && <Volunteer/>}

              {role === 'admin' && <Admin />}
            </nav>
          </div>
        </div>

        <div>
          <hr />

          {/* Profile Menu */}
          <MenuItem
            label='Profile'
            address='/dashboard/profile'
            icon={FcSettings}
          />

          <button
            onClick={handleLogOut}
            className='flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform'
          >
            <GrLogout className='w-5 h-5' />

            <span className='mx-4 font-medium'>Logout</span>
          </button>
        </div>
      </div>
    </>
    );
};

export default Sidebar;