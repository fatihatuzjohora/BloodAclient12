


import { useQuery } from "@tanstack/react-query";
import { useParams } from 'react-router-dom'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hook/useAxiosSecure";


const RequestDetail = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const { id } = useParams()
    console.log(id);
    
    const axiosSecure = useAxiosSecure();
    
    const { data: request = [] } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/detail/${id}`);
            return res.data;
        }
    })
  // console.log(request);
    const {_id, requestername, requesteremail, recipient, dictrict,date, time, upazila, massage, status, hospital, address, donorName, donorEmail} = request;

    const handleAdd = (e) => {
        e.preventDefault();

        const donorName = user?.displayName;
      
        const donorEmail = user?.email;
    
        const status = 'inprogress';
        
      
         //  console.log(name, price, image, type)
      
          const add = { donorName, donorEmail, status};

        // send data to the server
        fetch(`http://localhost:5000/donate/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(add)
           })
            .then(res => res.json())
            .then(data => {
              console.log(data);
                toast.success('Request successfully');
               })
               
            };
      
    
    
    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center w-[85%] mx-auto my-10 py-10 md:pl-5 bg-[#e9e9e9f3]">
        <div className="space-y-4 flex flex-col gap-4 justify-start">
        <h2 className="text-2xl font-bold primary-font">Requester Name : {requestername}</h2>
        <h2 className="text-2xl font-bold primary-font">Requester Email : {requesteremail}</h2>
        <p className="pb-2  text-xl font-medium border-[#13131326]">Dictrict :{dictrict}</p>
        <p className="pb-3  text-xl font-medium border-[#13131326]">Upazila :{upazila}</p>
        <p className="pb-2  text-xl font-medium border-[#13131326]">Hospital :{hospital}</p>
        <p className="pb-3  text-xl font-medium border-[#13131326]">Hospital Address :{address}</p>
         </div> 
     <div  className="flex flex-col gap-4">
         <h2 className="text-4xl font-bold primary-font">Recipient :{recipient}</h2>
         
         { status == 'inprogress' ? <>
          <p className="pb-2  text-xl font-medium border-[#13131326]">Donor Name: {donorName}</p>
          <p className="pb-2  text-xl font-medium border-[#13131326]">Donor Email: {donorEmail}</p>
         </> : ''
         }
         <p className="pb-2  text-xl font-medium border-[#13131326]">Date : {date}</p>
        
        <p className="pb-2  text-xl font-medium border-[#13131326]">Time : {time}</p>
         <p className="pb-3  text-xl font-medium border-[#13131326]">Status : {status}</p>
         
         <p className="my-4"><span className=" font-bold">Description :</span> {massage}</p>
         <div className="w-Full flex flex-col gap-2 pb-6 border-b-2  border-[#13131326]">
         </div>
        <div className="flex flex-row justify-between">
        <button className="btn btn-success" onClick={()=>document.getElementById('my_modal_3').showModal()}>Donate</button>
        <dialog id="my_modal_3" className="modal">
  <div className="modal-box">
  <div className="modal-action mt-0">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn text-2xl font-bold">X</button>
      </form>
    </div>
    <h1 className="text-center text-xl font-semibold text-orange-700 ">Donate</h1>
    <form method="dialog" onSubmit={handleAdd}>
      {/* if there is a button in form, it will close the modal */}
      
      <label className="block mb-2 dark:text-black" htmlFor="name">
              Donor Name
              </label>
              <input
                className="w-full p-2 mb-4 border rounded-md focus:outline-[#FF497C]"
                type="text"
                placeholder="user Name"
                id="name"
                name="name"
                defaultValue={user?.displayName}
                disabled
              />
              <label className="block mb-2 dark:text-black" htmlFor="email">
             Donor Email
              </label>
              <input
                className="w-full p-2 mb-4 border rounded-md focus:outline-[#FF497C]"
                type="email"
                placeholder="user email"
                id="email"
                name="email"
                defaultValue={user?.email}
                disabled
              />
              <input
            className="btn px-4 w-full py-2 mt-4 rounded hover:bg-[#ab3154]  bg-[#0f8637] duration-200 text-white cursor-pointer font-semibold"
            type="submit"
            value="Donate"
          />
    </form>
    
    
  </div>
</dialog>
        </div>
        
        
        
        
        
       
        </div> 
        </div>
    );
};

export default RequestDetail;
