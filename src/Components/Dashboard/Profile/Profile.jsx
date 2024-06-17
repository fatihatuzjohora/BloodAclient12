import { useContext, useState } from 'react';
import useRole from '../../../hook/useRole'
import { AuthContext } from '../../../providers/AuthProvider';
import toast from 'react-hot-toast';

import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../../hook/useAxiosSecure';


const Profile = () => {
    const [disable, setDisable] = useState(true);
    const [data] = useRole();
    const navigate = useNavigate();
    //console.log(data.photo);
    // eslint-disable-next-line no-unused-vars
    const { user } = useContext(AuthContext);
//console.log(user);


const axiosSecure = useAxiosSecure();
const { data: uder = [] } = useQuery({
  queryKey: ['uder'],
  queryFn: async () => {
      const res = await axiosSecure.get(`/user/${user?.email}`);
      return res.data;
  }
})

//console.log(uder._id);

    const handleEdit = () => {
        setDisable(false)
    }

const handleSubmit = async e => {
    e.preventDefault();

    const name = e.target.name.value;
    const photo = e.target.image.value
    const dictrict = e.target.dictrict.value;
        const upazila = e.target.upazila.value; 
        const email = e.target.email.value;
        const blood = e.target.blood.value;
//console.log(blood);
        const updatedInfo = {name, photo, email, blood, dictrict, upazila  };

        // send data to the server
 fetch(`https://blood-theta.vercel.app/update-user/${uder?._id}`, {
  method: 'PUT',
  headers: {
      'content-type': 'application/json'
  },
  body: JSON.stringify(updatedInfo)
 })
  .then(res => res.json())
  .then(data => {
     console.log(data);
     navigate('/')
      toast.success('Updated successfully');
     })
     e.target.reset();
    
  };




    return (
        <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Welcome to My Blood</h1>
          <button onClick={handleEdit} className='btn btn-error'>Edit</button>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Name
              </label>
              <input
                type='text'
                name='name'
                id='name'
                placeholder='Enter Your Name Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                defaultValue={data?.name
                }
                disabled={disable}
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                data-temp-mail-org='0'
                defaultValue={data?.email}
                disabled
              />
            </div>
            <div>
              <label htmlFor='image' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='text'
                id='image'
                name='image'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
                defaultValue={data?.photo}
                
                disabled={disable}
                
              />
             
            </div>

            <div>
            <label>Blood Group :</label>
            <select id='blood' disabled={disable} defaultValue={data.blood} className="select select-bordered w-full max-w-xs">
  <option value={data.blood}>{data.blood}</option>
  <option value="">enter blood group</option>
  <option value="A  +">A+</option>
  <option value="A-">A-</option>
  <option value="B  +">B+</option>
  <option value="B-">B-</option>
  <option value="AB  +">AB+</option>
  <option value="AB-">AB-</option>
  <option value="O  +">O+</option>
  <option value="O-">O-</option>
</select>
    </div>   

    <div>
            <label>District :</label>
            <select id='dictrict' disabled={disable} defaultValue={data?.dictrict} className="select select-bordered w-full max-w-xs">
            <option  value={data?.dictrict}>{data?.dictrict}</option>
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
            <label>Upazila :</label>
            <select id='upazila' disabled={disable} defaultValue={data?.upazila} className="select select-bordered w-full max-w-xs">
  <option  value={data?.upazila}>{data?.upazila}</option>
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
            </div> 
            <div>
            {
                disable ? " " : <button
           
                type='submit'
               className='bg-rose-500 hover:bg-rose-900 w-full rounded-md py-3 text-white btn'
              >Update</button>
            }
              
            
            
           </div>
        </form>  
        </div>
            </div>  
    );
};

export default Profile;