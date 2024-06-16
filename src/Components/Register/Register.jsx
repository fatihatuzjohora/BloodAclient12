
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from 'react-router-dom'

import useAuth from '../../hook/useAuth'

import { imageUpload } from '../../api/utils'
import { useState } from 'react'
import useAxiosPublic from '../../hook/useAxiosPublic'
import toast from 'react-hot-toast'

const Register = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(true);
 
// const [disable, setDisable] = useState(true);
const axiosPublic = useAxiosPublic();
    const navigate = useNavigate()
  const {
    createUser,
    
    updateUserProfile,
    
  } = useAuth();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (e.target.value !== password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };


  
  const handleSubmit = async e => {
   // console.log(e);
    e.preventDefault();

    if (password === confirmPassword) {
      console.log('Form submitted');
      const form = e.target
      const name = form.name.value
      const email = form.email.value
      const password = form.password.value
      const confirmPassword = form.confirmPassword.value
      const photo = form.image.files[0]
     const dictrict = form.dictrict.value
     const blood = form.blood.value
     const upazila = form.upazila.value
      const role = 'donor'
      const status = 'active'
     let value;
  
      try {
        // 1. Upload image and get image url
        const image_url = await imageUpload(photo)
      //  console.log(image_url)
       
       value = image_url; 
      // console.log(value);
        //2. User Registration
        const result = await createUser(email, password)
      //  console.log(result)
  
        // 3. Save username and photo in firebase
        await updateUserProfile(name, image_url)
        navigate('/')
        toast.success('Signup Successful')
        
        
      } catch (err) {
       // console.log(err)
        setError(false);
       navigate('/')
        toast.error(err.message)
      }
    //  console.log(dictrict,blood,upazila);
//  console.log(image);
     const info = {
      photo : value,
      name : name,
      email : email,
      blood : blood,
      dictrict : dictrict,
      upazila : upazila,
      role : role,
      status : status
     }
     const user = await axiosPublic.post('/user', info);
     console.log({info, user});

     if (error) {
         console.log(user);
     }

           //  console.log(user.data)
    } else {
      setError('Passwords do not match');
    }

    

  }
    return (
        <div className='flex justify-center items-center min-h-screen'>
      <div className='flex flex-col w-[80%] p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900'>
        <div className='mb-8 text-center'>
          <h1 className='my-3 text-4xl font-bold'>Sign Up</h1>
          <p className='text-sm text-gray-400'>Welcome to My Blood</p>
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
              />
            </div>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm'>
                Select Image:
              </label>
              <input
                required
                type='file'
                id='image'
                name='image'
                accept='image/*'
              />
            </div>
            <div>
            <label>Blood Group :</label>
            <select id='blood' defaultValue="default" className="select select-bordered w-full max-w-xs">
  <option disabled value="default">enter blood group</option>
  
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
            <select id='dictrict' defaultValue="default" className="select select-bordered w-full max-w-xs">
  <option disabled value="default">enter District</option>
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
            <select id='upazila' defaultValue="default" className="select select-bordered w-full max-w-xs">
  <option disabled value="default">enter Upazila</option>
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
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
              //  autoComplete='new-password'
                id='password'
                required
                value={password}
          onChange={handlePasswordChange}
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          </div>

          <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2'>
                 Confirm Password:
                </label>
              </div>
              <input
                type='password'
                name='confirmPassword'
               // autoComplete='new-password'
                id='confirmPassword'
                value={confirmPassword}
          onChange={handleConfirmPasswordChange}
                required
                placeholder='*******'
                className='w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-rose-500 bg-gray-200 text-gray-900'
              />
            </div>
          
            {error && <p>{error}</p>}

          <div>
            
              
            <button
           disabled={password !== confirmPassword}
           type='submit'
          className='bg-rose-500 hover:bg-rose-900 w-full rounded-md py-3 text-white btn'
         >Register</button>
            
           </div> 
        </form>
        
        <p className='px-6 mt-5 text-sm text-center text-gray-400'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='hover:underline hover:text-rose-500 text-gray-600'
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Register;