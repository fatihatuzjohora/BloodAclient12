import { useEffect, useState } from "react";

import useRole from "../../../hook/useRole";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";

import useAxiosPublic from "../../../hook/useAxiosPublic";

 

const AllRequest = () => {
    const axiospublic = useAxiosPublic();
    const [data] = useRole();
    const role = data.role;
    const [currentPage, setCurrentPage] = useState(0);
    // eslint-disable-next-line no-unused-vars
    const [itemsPerPage, setItemsPerPage] = useState(3);
    // eslint-disable-next-line no-unused-vars
    const [item, setItem] = useState(true)
    const [sort, setSort] = useState([])
    const [remain, setRemain] = useState([])
     const navigate  = useNavigate();

    

    const { data: request = [],refetch } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
          
            const res = await axiospublic.get(`/request`);
          //  setRemain(request);
            return res.data;
            
        }
        
    })
   let items = request.length;
//console.log(remain);
const totalPages = Math.ceil( items / itemsPerPage);
const pageNumbers = [...Array(totalPages).keys()];



useEffect(() => {
  async function fetchData() {
      const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);

      const data = await response.json();
      setRemain(data);
  }
  fetchData();
}, [currentPage, itemsPerPage]);



//console.log(products);
    const handlePending = (id) => {
      const status = 'pending';
      const add = {status};
      console.log(id);
      // send data to the server
      fetch(`http://localhost:5000/request/${id}`, {
          method: 'PUT',
          headers: {
              'content-type': 'application/json'
          },
          body: JSON.stringify(add)
         })
          .then(res => res.json())
          .then(data => {
            refetch();
            console.log(data);
              toast.success('Request pending successfully');
             })
              
          };

          const handleProgress = (id) => {
            const status = 'inprogress';
            const add = {status};
            console.log(id);
            // send data to the server
            fetch(`http://localhost:5000/request/${id}`, {
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
                    toast.success('Request inprogress successfully');
                   })
                    
                };

    const handleCancel = (id) => {
      const status = 'cancel';
      const add = {status};
      console.log(id);
      // send data to the server
      fetch(`http://localhost:5000/request/${id}`, {
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
            fetch(`http://localhost:5000/request/${id}`, {
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
      


    const handleChange = e => {
    // console.log(e.target.value);
     setItem(false);
     
       if (e.target.value == 'pending') {
           const pending = request.filter(item => item.status == 'pending');
           setSort(pending);
       }
       if (e.target.value == 'done') {
        const done = request.filter(item => item.status == 'done');
        setSort(done);
    }
    if (e.target.value == 'cancel') {
      const cancel = request.filter(item => item.status == 'cancel');
      setSort(cancel);
  }
  if (e.target.value == 'inprogress') {
    const inprogress = request.filter(item => item.status == 'inprogress');
    setSort(inprogress);
}
    }

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

       fetch(`http://localhost:5000/delete/${id}`, {
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
               
                   
                   // remove the user from the UI
                   const remainingUsers = remain.filter(spot => spot._id !== id);
                  setRemain(remainingUsers);
                  setSort(remainingUsers);
               }
           })
       }
   })
   }

  

    return (
        <>
        <h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Requests</h1>
        <div className="overflow-x-auto min-h-[46vh]">
            <table className="table rounded-none bg-[#c3b8cbc1] ">
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
                        <th className="px-[5px] md:pl-3 text-stone-950 text-lg font-bold"><select onChange={handleChange} defaultValue="default" className="select select-bordered w-32">
                        <option  value="default" disabled >Filter</option>
                         <option value='pending'>pending</option>
                          <option value='inprogress'>inprogress</option>
                           <option value='done'>done</option>
                            <option value='cancel'>cancel</option>
                           </select></th>
                    </tr>
                </thead>
              {
                item ? 

<tbody>
                    { 
                     remain.map(donate => 
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
                        <td className="flex gap-2 flex-row">
                          { role == 'admin' ?
                          <Link to={`edit/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-error">Edit</button>
                        </Link>
                          : '' }
                          { role == 'volunteer' ?
                          
                          <button  onClick={()=>handlePending(donate?._id)}
                               className="btn md:mr-2 btn-success">Pending</button>
                       
                         : '' }
                         { role == 'volunteer' ?
                          
                          <button  onClick={()=>handleProgress(donate?._id)}
                               className="btn md:mr-2 btn-success">Inprogress</button>
                       
                         : '' }
                          { role == 'volunteer' ?
                          
                           <button  onClick={()=>handleDone(donate?._id)}
                                className="btn md:mr-2 btn-primary">Done</button>
                        
                          : '' }
                          { role == 'volunteer' ?
                          
                          <button  onClick={()=>handleCancel(donate?._id)}
                               className="btn md:mr-2 btn-error">Cancel</button>
                       
                         : '' }
                        { role == 'admin' ?
                        
                           <button onClick={() => handleDelete(donate._id)}
                                className="btn md:mr-2 btn-success">Delete</button>
                        
                          : '' }
                         { role == 'admin' ?
                        <Link to={`detail/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-primary">Detail</button>
                        </Link>
                          : '' }
                        {
                          donate.status == 'inprogress' && role == 'admin' ? 
                          <button onClick={()=>handleDone(donate?._id)}
                               className="btn md:mr-2 btn-info">Done</button>
                       
                       
                       : '' 
                        }
                        {
                          donate.status == 'inprogress' && role == 'admin' ? 
                          <button onClick={()=>handleCancel(donate?._id)}
                               className="btn md:mr-2 btn-accent">Cancel</button>
                       
                       
                       : '' 
                        }
                        </td>
                    </tr>
                      )
                  }
                </tbody>

                 :

                 <tbody>
                    { 
                     sort.map(donate => 
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
                        <td className="flex flex-col  gap-2 md:flex-row">
                        { role == 'admin' ?
                          <Link to={`edit/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-error">Edit</button>
                        </Link>
                          : '' }
                          { role == 'volunteer' ?
                          
                          <button  onClick={()=>handlePending(donate?._id)}
                               className="btn md:mr-2 btn-success">Pending</button>
                       
                         : '' }
                         { role == 'volunteer' ?
                          
                          <button  onClick={()=>handleProgress(donate?._id)}
                               className="btn md:mr-2 btn-success">Inprogress</button>
                       
                         : '' }
                          { role == 'volunteer' ?
                          
                           <button  onClick={()=>handleDone(donate?._id)}
                                className="btn md:mr-2 btn-primary">Done</button>
                        
                          : '' }
                          { role == 'volunteer' ?
                          
                          <button  onClick={()=>handleCancel(donate?._id)}
                               className="btn md:mr-2 btn-error">Cancel</button>
                       
                         : '' }
                        { role == 'admin' ?
                        
                           <button onClick={() => handleDelete(donate._id)}
                                className="btn md:mr-2 btn-success">Delete</button>
                        
                          : '' }
                         { role == 'admin' ?
                        <Link to={`detail/${donate._id}`}>
                           <button
                                className="btn md:mr-2 btn-primary">Detail</button>
                        </Link>
                          : '' }
                        {
                          donate.status == 'inprogress' && role == 'admin' ? 
                          <button onClick={()=>handleDone(donate?._id)}
                               className="btn md:mr-2 btn-info">Done</button>
                       
                       
                       : '' 
                        }
                        {
                          donate.status == 'inprogress' && role == 'admin' ? 
                          <button onClick={()=>handleCancel(donate?._id)}
                               className="btn md:mr-2 btn-accent">Cancel</button>
                       
                       
                       : '' 
                        }
                        </td>
                    </tr>
                      )
                  }
                </tbody> }
            </table>
              
                
        </div>

        {/* pagination */}
        <div className="pagination">
                
                {
                    pageNumbers.map(number => <button id="but"
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={() => setCurrentPage(number)}
                    >{number + 1}</button>)
                }
                 
    
            </div>
        </> );
};

export default AllRequest;