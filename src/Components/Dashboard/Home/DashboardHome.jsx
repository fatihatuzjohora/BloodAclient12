import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../hook/useAuth'
import useRole from '../../../hook/useRole';
import useAxiosPublic from '../../../hook/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import { FaUser } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import { FaCodePullRequest } from "react-icons/fa6";
import Swal from "sweetalert2";
import useAxiosSecure from '../../../hook/useAxiosSecure';
import { useState } from 'react';
import toast from 'react-hot-toast';


const DashboardHome = () => {
    
    const { user } = useAuth()
    const [data] = useRole();
    const role = data.role;
    const [remain, setRemain] = useState([]);
    const navigate  = useNavigate();
   console.log( role);
 const email = user.email;
 // console.log(email);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
    // eslint-disable-next-line no-unused-vars
    const { data: donate = [] } = useQuery({
        queryKey: ['donate'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/request/${email}`);
            return res.data;
        }
    })

    const { data: request = [],refetch } = useQuery({
      queryKey: ['request'],
      queryFn: async () => {
          const res = await axiosPublic.get(`/request`);
          setRemain(request);
          return res.data;
      }
  })

//console.log(request); 
setTimeout(()=>{ refetch()}, "300");
//console.log(remain);
    
  const { data: payments = [] } = useQuery({
      queryKey: ['payments'],
      queryFn: async () => {
          const res = await axiosPublic.get(`/all-payments`);
          return res.data;
      }
  })

  const totalPrice = payments.reduce((total, item) => total + item.price, 0)
//console.log(totalPrice);

  const handleDelete = id => {
    // console.log(id);
     // make sure user is confirmed to delete
     Swal.fire({
         title: 'Are you sure?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Yes, delete it!'
     })
     .then((result) => {
         if (result.isConfirmed) {

     fetch(`https://blood-theta.vercel.app/delete/${id}`, {
         method: 'DELETE'
     })
         .then(res => res.json())
         .then(data => {
             if (data.deletedCount > 0) {
               //  console.log('deleted successfully');
               Swal.fire(
                 'Deleted!',
                 'Your request has been deleted.',
                 'success'
             )
            // refetch();
                  // toast.success('deleted successfully');
                 // remove the user from the UI
                 const remainingUsers = remain.filter(spot => spot._id !== id);
                 setRemain(remainingUsers);
             }
         })
     }
 })
 }

 const handleCancel = (id) => {
  const status = 'cancel';
  const add = {status};
  console.log(id);
  // send data to the server
  fetch(`https://blood-theta.vercel.app/request/${id}`, {
      method: 'PUT',
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(add)
     })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        refetch(); 
        navigate('/');
          toast.success('Canceled request successfully');
         })
      };

      const handleDone = (id) => {
        const status = 'done';
        const add = {status};
        console.log(id);
        // send data to the server
        fetch(`https://blood-theta.vercel.app/request/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(add)
           })
            .then(res => res.json())
            .then(data => {
              refetch();
              navigate('/');
              console.log(data);
                toast.success('Request done successfully');
               })
                
            };




  const { data: alls = [] } = useQuery({
    queryKey: ['alls'],
    queryFn: async () => {
        const res = await axiosSecure.get(`/alls`);
        return res.data;
    }
})
//console.log(alls);
const requests = request.length;
//console.log(alluser);
const users = alls.length;
//console.log(users);
    const lastThreeDesc = remain.slice(-3).sort((a, b) => b - a); 
    return (
        <div>
            <h1 className='mb-10 text-2xl'>Welcome, <span className='text-green-500 font-semibold text-4xl'>{user?.displayName}</span> </h1>

            {role == 'donor' ?
            
            <div className="overflow-x-auto min-h-[46vh]">
            <table className="table rounded-none bg-[#c3b8cbc1]">
                {/* head */}
                <thead>
                    <tr>
                        
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Recipient Name</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Location</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Date</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Time</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">status</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Donor</th>
                        <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                      lastThreeDesc.map(donate => 
                        <tr key={donate._id}>
                        
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.recipient}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.upazila},{donate.dictrict}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.date}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.time}</td>
                       
                        <td className="px-[5px] md:px-3 font-bold text-lg">{donate.status}</td>
                        <td className="px-[5px] md:px-3 font-bold text-lg">
                        {
                          donate.status == 'inprogress' ?<td className="px-[5px] md:px-1 font-bold text-lg">{donate.requestername}</td>
                           : '' 
                        }
                        {
                          donate.status == 'inprogress' ?
                          <td className="px-[5px] md:px-1 font-bold text-lg">{donate.requesteremail}</td>: '' 
                        } </td>
                        <td className="flex flex-row  gap-2 md:flex-row">
                        <Link to={`/edit/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-error">Edit</button>
                        </Link>
                        <button onClick={() => handleDelete(donate._id)}
                                className="btn md:mr-2 btn-success">Delete</button>
                        
                        <Link to={`detail/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-primary">Detail</button>
                        </Link>

                        {
                          donate.status == 'inprogress' ? 
                          <button onClick={()=>handleDone(donate?._id)}
                               className="btn md:mr-2 btn-info">Done</button>
                       
                       
                       : '' 
                        }
                        {
                          donate.status == 'inprogress' ? 
                          <button onClick={()=>handleCancel(donate?._id)}
                               className="btn md:mr-2 btn-accent">Cancel</button>
                       
                       
                       : '' 
                        }
                        </td>
                    </tr>
                      )
                  }
                </tbody>
            </table>
            <div className='w-full flex justify-center'>
            <Link to='/dashboard/my-dontion-requests'> <button className='btn btn-success my-10'>View My All Request</button></Link>
            </div>
            
        </div>


             : ""}

       {
        role == 'admin' || role == 'volunteer'  ? 
        <div className="stats flex flex-col lg:flex-row shadow">
  
        <div className="stat bg-green-100">
          <div className="stat-figure text-primary">
          <FaUser className='text-3xl'/>
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-primary">{users}</div>
          
        </div>
        
        <div className="stat bg-red-100">
          <div className="stat-figure text-secondary">
          <MdAttachMoney className='text-5xl'/>
          </div>
          <div className="stat-title">Total Funding</div>
          <div className="stat-value text-secondary">{totalPrice}</div>
          
        </div>
        
        <div className="stat bg-pink-200">
        <div className="stat-figure text-amber-700">
          <FaCodePullRequest className='text-3xl'/>
          </div>
          <div className="stat-title">Total Donation Requests</div>
          <div className="stat-value text-amber-700">{requests}</div>
          
        </div>
        
      </div>
        : ''
       }

        </div>
    );
};

export default DashboardHome;