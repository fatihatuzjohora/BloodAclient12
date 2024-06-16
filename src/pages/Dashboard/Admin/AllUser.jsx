
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";



const AllUser = () => {
    const [sort, setSort] = useState([])
    const [item, setItem] = useState(true)
    const axiosSecure = useAxiosSecure();
    const { data: alluser = [],refetch } = useQuery({
        queryKey: ['alluser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user`);
            return res.data;
        }
    })
//console.log(alluser);

const handleBlock = (id) => {
    const status = 'block';
    const add = {status};
   // console.log(id);
    // send data to the server
    fetch(`http://localhost:5000/user/${id}`, {
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
            toast.success('Blocked User successfully');
           })
           
        };

        const handleActive = (id) => {
            const status = 'active';
            const add = {status};
            console.log(id);
            // send data to the server
            fetch(`http://localhost:5000/user/${id}`, {
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
                    toast.success('Unblocked User successfully');
                   })
                   
                };
      
                const handleVolunteer = (id) => {
                  const role = 'volunteer';
                  const add = {role};
                 // console.log(id);
                  // send data to the server
                  fetch(`http://localhost:5000/users/${id}`, {
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
                          toast.success('Volunteer role given successfully');
                         })
                         
                      };

                      const handleAdmin = (id) => {
                        const role = 'admin';
                        const add = {role};
                       // console.log(id);
                        // send data to the server
                        fetch(`http://localhost:5000/users/${id}`, {
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
                                toast.success('Admin role given successfully');
                               })
                               
                            };
      


                const handleChange = e => {
                    // console.log(e.target.value);
                     setItem(false);
                     
                       if (e.target.value == 'active') {
                           const active = alluser.filter(item => item.status == 'active');
                           setSort(active);
                       }
                       if (e.target.value == 'block') {
                        const block = alluser.filter(item => item.status == 'block');
                        setSort(block);
                    }
                    
                    }



return (
<>
<h1 className="text-center text-green-700 text-3xl font-semibold mb-6">All Users</h1>
<div className="overflow-x-auto min-h-[46vh]">
    <table className="table rounded-none bg-[#c3b8cbc1]">
        {/* head */}
        <thead>
            <tr>
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user avator</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user email</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user name</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user role</th>
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">user status</th>
                
                <th className="px-[5px] md:px-3 text-stone-950 text-lg font-bold">Action</th>
                <th className="px-[5px] md:pl-3 text-stone-950 text-lg font-bold"><select onChange={handleChange} defaultValue="default" className="select select-bordered w-32">
                <option value="default" disabled>Filter</option>
                 <option value='active'>active</option>
                  <option value='block'>block</option>
                   
                   </select></th>
            </tr>
      
      </thead>

      {
                item ? 


        <tbody>
            {
              alluser.map(user => 
                <tr key={user?.photo}>
                
                <td className="px-[5px] md:px-3 font-bold text-lg"><img className="w-12 h-12" src={user.photo} alt="" /></td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user.email}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user.name}</td>
                <td className="px-[5px] md:px-3 font-bold text-lg">{user.role}</td>
               
                <td className="px-[5px] md:px-3 font-bold text-lg">{user.status}</td>
                
                
                <td className="flex  gap-2 flex-row">
                  { user.status == 'active' ?
                   
                   <button onClick={()=>handleBlock(user?._id)}
                        className="btn md:mr-2 btn-error">Block</button>
                
                 : "" }
                  
                  
                  { user.status == 'block' ?
                   
                   <button onClick={()=>handleActive(user?._id)}
                        className="btn md:mr-2 btn-success">Unblock</button>
                
                 : "" }
                
               
                { user.role == 'donor' ?
                   <button onClick={()=>handleVolunteer(user?._id)}
                        className="btn md:mr-2 btn-info">Volunteer</button>
                        : "" }
                 
                 
                 { user.role == 'donor' || user.role == 'volunteer' ?
                   <button onClick={()=>handleAdmin(user?._id)}
                        className="btn md:mr-2 btn-primary">Admin</button>
                : "" }
                
                
               
               
                </td>
            </tr>
              )
          }
        </tbody>
        :
        <tbody>
        {
          sort.map(user => 
            <tr key={user?.photo}>
            
            <td className="px-[5px] md:px-3 font-bold text-lg"><img className="w-12 h-12" src={user.photo} alt="" /></td>
            <td className="px-[5px] md:px-3 font-bold text-lg">{user.email}</td>
            <td className="px-[5px] md:px-3 font-bold text-lg">{user.name}</td>
            <td className="px-[5px] md:px-3 font-bold text-lg">{user.role}</td>
           
            <td className="px-[5px] md:px-3 font-bold text-lg">{user.status}</td>
            
            
            <td className="flex  gap-2 flex-row">
              { user.status == 'active' ?
               
               <button onClick={()=>handleBlock(user?._id)}
                    className="btn md:mr-2 btn-error">Block</button>
            
             : "" }
              
              
              { user.status == 'block' ?
               
               <button onClick={()=>handleActive(user?._id)}
                    className="btn md:mr-2 btn-success">Unblock</button>
            
             : "" }
            
           
            
            { user.role == 'donor' ?
                   <button onClick={()=>handleVolunteer(user?._id)}
                        className="btn md:mr-2 btn-info">Volunteer</button>
                        : "" }
                 
                 
                 { user.role == 'donor' || user.role == 'volunteer' ?
                   <button onClick={()=>handleAdmin(user?._id)}
                        className="btn md:mr-2 btn-primary">Admin</button>
                : "" }
            
            
           
           
            </td>
        </tr>
          )
      }
    </tbody>

        }  
    </table>
</div>
</> )
};

export default AllUser;