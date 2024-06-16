

import { useQuery } from "@tanstack/react-query";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hook/useAxiosSecure";

const Edit = () => {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();
    const { id } = useParams()
   // console.log(id);
    const { data: request = [],refetch } = useQuery({
        queryKey: ['request'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/detail/${id}`);
            return res.data;
            
        }
       
    })

    setTimeout(()=>{ refetch()}, "200");
//console.log(request);
    // eslint-disable-next-line no-unused-vars
   // const {_id, requestername, requesteremail, recipient, dictrict,date, time, upazila, massage, status, donorName, donorEmail, hospital, address} = find;
     console.log(request?.recipient);

    const handleUpdate = (e) => {
        e.preventDefault();
    
      //  const name = e.target.name.value;
        const requestername = e.target.requestername.value;
        const requesteremail = e.target.requesteremail.value;
        const recipient = e.target.recipient.value;
       
        const dictrict = e.target.dictrict.value;
        const upazila = e.target.upazila.value;
        const time = e.target.time.value;
        const donername = e.target.donername.value;
        const doneremail = e.target.doneremail.value;
        const hospital = e.target.hospital.value;
        const address = e.target.address.value;
        const date = e.target.date.value;
        const massage = e.target.massage.value;

       //  console.log(name, price, image, type)
    
        const updatedInfo = { requestername, requesteremail , recipient , dictrict,upazila, donername , doneremail, time, hospital, address, date, massage  };
        
 // send data to the server
 fetch(`http://localhost:5000/update/${request?._id}`, {
    method: 'PUT',
    headers: {
        'content-type': 'application/json'
    },
    body: JSON.stringify(updatedInfo)
   })
    .then(res => res.json())
    .then(data => {
       console.log(data);
        toast.success('Updated successfully');
       })
       e.target.reset();
       navigate('/');
    };

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='flex flex-col w-full  md:w-[80%] p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
              <div className='mb-8 text-center'>
                <h1 className='my-3 text-xl  md:text-4xl font-bold'>Edit / Update</h1>
                <p className='text-sm text-gray-400'>Welcome to OneBlood</p>
              </div>
              <form onSubmit={handleUpdate} className='space-y-6'>
                <div className='space-y-4'>
                <div>
                    <label htmlFor='name' className='block mb-2 text-sm'>
                     Requester Name
                    </label>
                    <input
                      type='text'
                      name='requestername'
                      id='requestername'
                      placeholder='Enter Your Name Here'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.requestername}
                      disabled
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='block mb-2 text-sm'>
                     Requester Email 
                    </label>
                    <input
                      type='email'
                      name='requesteremail'
                      id='requesteremail'
                      required
                      placeholder='Enter Your Email Here'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.requesteremail}
                      disabled
                    />
                  </div>
    
                  <div>
                    <label htmlFor='name' className='block mb-2 text-sm'>
                     Recipient Name
                    </label>
                    <input
                      type='text'
                      name='recipient'
                      id='recipient'
                      placeholder='Enter Your Name Here'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.recipient}
                    />
                  </div>
                     
      
          <div>
                  <label>Recipient District :</label>
                  <select id='dictrict' defaultValue={request?.dictrict} className="select select-bordered w-full max-w-xs">
        <option value={request?.dictrict} >{request?.dictrict}</option>
        <option value="Comilla">Comilla</option>
      <option value="Feni">Feni</option>
      <option value="Brahmanbaria">Brahmanbaria</option>
      <option value="Rangamati">Rangamati</option>
      <option value="Noakhali">Noakhali</option>
      <option value="Chandpur">Chandpur</option>
      <option value="Lakshmipur">Lakshmipur</option>
      <option value="Chattogram">Chattogram</option>
      <option value="Coxsbazar">Coxsbazar</option>
      <option value="Khagrachhari">Khagrachhari</option>
      <option value="Bandarban">Bandarban</option>
      <option value="Sirajganj">Sirajganj</option>
      <option value="Pabna">Pabna</option>
      <option value="Bogura">Bogura</option>
      <option value="Rajshahi">Rajshahi</option>
      <option value="Natore">Natore</option>
      <option value="Joypurhat">Joypurhat</option>
      <option value="Chapainawabganj">Chapainawabganj</option>
      <option value="Naogaon">Naogaon</option>
      <option value="Jashore">Jashore</option>
      <option value="Satkhira">Satkhira</option>
      <option value="Meherpur">Meherpur</option>
      <option value="Narail">Narail</option>
      <option value="Chuadanga">Chuadanga</option>
      <option value="Kushtia">Kushtia</option>
      <option value="Magura">Magura</option>
      <option value="Khulna">Khulna</option>
      <option value="Bagerhat">Bagerhat</option>
      <option value="Jhenaidah">Jhenaidah</option>
      <option value="Jhalakathi">Jhalakathi</option>
      <option value="Patuakhali">Patuakhali</option>
      <option value="Pirojpur">Pirojpur</option>
      <option value="Barisal">Barisal</option>
      <option value="Bhola">Bhola</option>
      <option value="Barguna">Barguna</option>
      <option value="Sylhet">Sylhet</option>
      <option value="Moulvibazar">Moulvibazar</option>
      <option value="Habiganj">Habiganj</option>
      <option value="Sunamganj">Sunamganj</option>
      <option value="Narsingdi">Narsingdi</option>
      <option value="Gazipur">Gazipur</option>
      <option value="Shariatpur">Shariatpur</option>
      <option value="Narayanganj">Narayanganj</option>
      <option value="Tangail">Tangail</option>
      <option value="Kishoreganj">Kishoreganj</option>
      <option value="Manikganj">Manikganj</option>
      <option value="Dhaka">Dhaka</option>
      <option value="Munshiganj">Munshiganj</option>
      <option value="Rajbari">Rajbari</option>
      <option value="Madaripur">Madaripur</option>
      <option value="Gopalganj">Gopalganj</option>
      <option value="Faridpur">Faridpur</option>
      <option value="Panchagarh">Panchagarh</option>
      <option value="Dinajpur">Dinajpur</option>
      <option value="Lalmonirhat">Lalmonirhat</option>
      <option value="Nilphamari">Nilphamari</option>
      <option value="Gaibandha">Gaibandha</option>
      <option value="Thakurgaon">Thakurgaon</option>
      <option value="Rangpur">Rangpur</option>
      <option value="Kurigram">Kurigram</option>
      <option value="Sherpur">Sherpur</option>
      <option value="Mymensingh">Mymensingh</option>
      <option value="Jamalpur">Jamalpur</option>
      <option value="Netrokona">Netrokona</option>
      
      </select>
          </div>
      
      
          <div>
                  <label>Recipient Upazila :</label>
                  <select id='upazila' defaultValue={request?.upazila} className="select select-bordered w-full max-w-xs">
        <option value={request?.upazila}>{request?.upazila}</option>
        <option value="Debidwar">Debidwar</option>
        <option value="Barura">Barura</option>
        <option value="Brahmanpara">Brahmanpara</option>
        <option value="Chandina">Chandina</option>
        <option value="Chauddagram">Chauddagram</option>
        <option value="Daudkandi">Daudkandi</option>
        <option value="Homna">Homna</option>
        <option value="Laksam">Laksam</option>
        <option value="Muradnagar">Muradnagar</option>
        <option value="Nangalkot">Nangalkot</option>
        <option value="Comilla Sadar">Comilla Sadar</option>
        <option value="Meghna">Meghna</option>
        <option value="Monohargonj">Monohargonj</option>
        <option value="Sadarsouth">Sadarsouth</option>
        <option value="Titas">Titas</option>
        <option value="Burichang">Burichang</option>
        <option value="Lalmai">Lalmai</option>
        <option value="Chhagalnaiya">Chhagalnaiya</option>
        <option value="Feni Sadar">Feni Sadar</option>
        <option value="Sonagazi">Sonagazi</option>
        <option value="Fulgazi">Fulgazi</option>
        <option value="Parshuram">Parshuram</option>
        <option value="Daganbhuiyan">Daganbhuiyan</option>
        <option value="Brahmanbaria Sadar">Brahmanbaria Sadar</option>
        <option value="Kasba">Kasba</option>
        <option value="Nasirnagar">Nasirnagar</option>
        <option value="Sarail">Sarail</option>
        <option value="Ashuganj">Ashuganj</option>
        <option value="Akhaura">Akhaura</option>
        <option value="Nabinagar">Nabinagar</option>
        <option value="Bancharampur">Bancharampur</option>
        <option value="Bijoynagar">Bijoynagar</option>
        <option value="Rangamati Sadar">Rangamati Sadar</option>
        <option value="Kaptai">Kaptai</option>
        <option value="Kawkhali">Kawkhali</option>
        <option value="Baghaichari">Baghaichari</option>
        <option value="Barkal">Barkal</option>
        <option value="Langadu">Langadu</option>
        <option value="Rajasthali">Rajasthali</option>
        <option value="Belaichari">Belaichari</option>
        <option value="Juraichari">Juraichari</option>
        <option value="Naniarchar">Naniarchar</option>
        <option value="Noakhali Sadar">Noakhali Sadar</option>
        <option value="Companiganj">Companiganj</option>
        <option value="Begumganj">Begumganj</option>
        <option value="Hatia">Hatia</option>
        <option value="Subarnachar">Subarnachar</option>
        <option value="Kabirhat">Kabirhat</option>
        <option value="Senbug">Senbug</option>
        <option value="Chatkhil">Chatkhil</option>
        <option value="Sonaimori">Sonaimori</option>
        <option value="Haimchar">Haimchar</option>
        <option value="Kachua">Kachua</option>
        <option value="Shahrasti">Shahrasti</option>
        <option value="Chandpur Sadar">Chandpur Sadar</option>
        <option value="Matlab South">Matlab South</option>
        <option value="Hajiganj">Hajiganj</option>
        <option value="Matlab North">Matlab North</option>
        <option value="Faridgonj">Faridgonj</option>
        <option value="Lakshmipur Sadar">Lakshmipur Sadar</option>
        <option value="Kamalnagar">Kamalnagar</option>
        <option value="Raipur">Raipur</option>
        <option value="Ramgati">Ramgati</option>
        <option value="Ramganj">Ramganj</option>
        <option value="Rangunia">Rangunia</option>
        <option value="Sitakunda">Sitakunda</option>
        <option value="Mirsharai">Mirsharai</option>
        <option value="Patiya">Patiya</option>
        <option value="Sandwip">Sandwip</option>
        <option value="Banshkhali">Banshkhali</option>
        <option value="Boalkhali">Boalkhali</option>
        <option value="Anwara">Anwara</option>
        <option value="Chandanaish">Chandanaish</option>
        <option value="Satkania">Satkania</option>
        <option value="Lohagara">Lohagara</option>
        <option value="Hathazari">Hathazari</option>
        <option value="Fatikchhari">Fatikchhari</option>
        <option value="Raozan">Raozan</option>
        <option value="Karnafuli">Karnafuli</option>
        <option value="Coxsbazar Sadar">Coxsbazar Sadar</option>
        <option value="Chakaria">Chakaria</option>
        <option value="Kutubdia">Kutubdia</option>
        <option value="Ukhiya">Ukhiya</option>
        <option value="Moheshkhali">Moheshkhali</option>
        <option value="Pekua">Pekua</option>
        <option value="Ramu">Ramu</option>
        <option value="Teknaf">Teknaf</option>
        <option value="Khagrachhari Sadar">Khagrachhari Sadar</option>
        <option value="Dighinala">Dighinala</option>
        <option value="Panchari">Panchari</option>
        <option value="Laxmichhari">Laxmichhari</option>
        <option value="Mohalchari">Mohalchari</option>
        <option value="Manikchari">Manikchari</option>
        <option value="Ramgarh">Ramgarh</option>
        <option value="Matiranga">Matiranga</option>
      
      </select>
          </div>
      
          <div>
                    <label htmlFor='name' className='block mb-2 text-sm'>
                     Doner Name
                    </label>
                    <input
                      type='text'
                      name='donername'
                      id='donername'
                      placeholder='Enter doner Name Here'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.donorName}
                    />
                  </div>

                  <div>
                    <label htmlFor='name' className='block mb-2 text-sm'>
                     Doner Email
                    </label>
                    <input
                      type='text'
                      name='doneremail'
                      id='doneremail'
                      placeholder='Enter doner email Here'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.donorEmail}
                    />
                  </div>

          <div>
                    <label htmlFor='hospital' className='block mb-2 text-sm'>
                     Hospital Name
                    </label>
                    <input
                      type='text'
                      name='hospital'
                      id='hospital'
                      required
                      placeholder='Enter Hospital Name'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.hospital}
                    />
                  </div>
    
                  <div>
                    <label htmlFor='address' className='block mb-2 text-sm'>
                     Address
                    </label>
                    <input
                      type='text'
                      name='address'
                      id='address'
                      required
                      placeholder='Enter address'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.address}
                    />
                  </div>
                 
                  <div>
                    <label htmlFor='date' className='block mb-2 text-sm'>
                     Date
                    </label>
                    <input
                      type='date'
                      name='date'
                      id='date'
                      required
                      placeholder='Enter date'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      
                      defaultValue={request?.date}
                    />
                  </div>
    
                  <div>
                    <label htmlFor='time' className='block mb-2 text-sm'>
                     Time
                    </label>
                    <input
                      type='time'
                      name='time'
                      id='time'
                      required
                      placeholder='Enter time'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.time}
                    />
                  </div>
    
                  <div>
                    <label htmlFor='description' className='block mb-2 text-sm'>
                     Massage
                    </label>
                    <input
                      type='text'
                      name='massage'
                      id='massage'
                      required
                      placeholder='Enter massage'
                      className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                      data-temp-mail-org='0'
                      defaultValue={request?.massage}
                    />
                  </div>
    
    
                </div>
      
                <div>
                 <button
                
                 type='submit'
                className='bg-rose-500 hover:bg-rose-900 w-full rounded-md py-3 text-white btn'
               >Update</button>
                  
                 </div> 
              </form>
              
              
            </div>
          </div>
    );
};

export default Edit;